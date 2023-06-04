<template>
  <h1
    class="text-xl text-center font-sans leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6"
  >
    Відновлення паролю
  </h1>
  <form class="space-y-4 md:space-y-6" @submit.prevent="restoreSubmit">
    <div v-show="loginInput">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Номер телефону або електронна пошта <sup>*</sup></label
      >
      <input
        type="text"
        name="login"
        id="login"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Введіть номер або email"
        required=""
        v-model.trim="login"
      />
    </div>
    <div v-show="codeInput">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Введіть код який ми відправили вам на пошту<sup>*</sup></label
      >
      <input
        type="text"
        name="code"
        id="code"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Введіть код"
        v-model.trim="code"
      />
    </div>
    <div v-show="newPasswordInput">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Введіть новий пароль для вашого акаунту<sup>*</sup></label
      >
      <input
        type="password"
        name="password"
        id="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Введіть пароль"
        v-model.trim="newPassword"
      />
    </div>
    <button
      type="submit"
      class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      {{ buttonLabel }}
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Не пам'ятаєте логін від акаунту?
      <router-link
        to="signup"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >*</router-link
      >
    </p>
  </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import router from '../../router'

const RestoreSteps = {
  restoreRequest: 0,
  restoreConfirm: 1,
  passwordUpdate: 2
}

export default {
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  data() {
    return {
      login: '',
      code: '',
      newPassword: '',
      userId: null,
      currentStep: RestoreSteps.restoreRequest
    }
  },
  methods: {
    async restoreSubmit() {
      if (this.currentStep === RestoreSteps.restoreRequest) {
        await this.authStore.restorePasswordRequest({
          login: this.login
        })
        this.currentStep++
      } else if (this.currentStep === RestoreSteps.restoreConfirm) {
        const response = await this.authStore.restorePasswordConfirm({
          login: this.login,
          restorationToken: this.code
        })
        this.userId = response.data.id
        await this.authStore.setToken(response.data.token)
        this.currentStep++
      } else {
        const response = await this.authStore.updatePassword({
          userId: this.userId,
          password: this.newPassword
        })
        if (response) {
          console.log('password was succesfully updated')
          router.push('/login')
        }
      }
    }
  },
  computed: {
    loginInput() {
      return this.currentStep === RestoreSteps.restoreRequest
    },
    codeInput() {
      return this.currentStep === RestoreSteps.restoreConfirm
    },
    newPasswordInput() {
      return this.currentStep === RestoreSteps.passwordUpdate
    },
    buttonLabel() {
      return this.loginInput ? 'Відновити' : 'Підтвердити'
    }
  }
}
</script>
