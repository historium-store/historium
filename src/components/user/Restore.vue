<template>
  <h1 class="text-xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Відновлення паролю
  </h1>
  <form
    class="space-y-3 last:space-y-7 mt-12 md:space-y-4 md:last:space-y-10 [&>div>input]:pl-5"
    @submit.prevent="restoreSubmit"
  >
    <div v-show="loginInput">
      <input
        id="login"
        v-model.trim="login"
        type="text"
        name="login"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть номер або email"
        required=""
      />
      <!-- <label for="text" class="block mt-2 pl-2 text-sm font-medium text-gray-900 dark:text-white"
        >Номер телефону або електронна пошта <sup>*</sup></label
      > -->
    </div>
    <div v-show="codeInput">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Введіть код який ми відправили вам на пошту<sup>*</sup></label
      >
      <input
        id="code"
        v-model.trim="code"
        type="text"
        name="code"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть код"
      />
    </div>
    <div v-show="newPasswordInput">
      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Введіть новий пароль для вашого акаунту<sup>*</sup></label
      >
      <input
        id="password"
        v-model.trim="newPassword"
        type="password"
        name="password"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть пароль"
      />
    </div>
    <button
      type="submit"
      class="flex border-2 flex-col mx-auto items-center min-w-[200px] text-white focus:outline-none focus:ring-slate-950 font-medium rounded-3xl text-sm px-3 py-2.5 bg-background bg-opacity-30"
    >
      {{ buttonLabel }}
    </button>
    <p class="text-sm font-light text-gray-500">
      Не пам'ятаєте логін від акаунту?
      <span class="font-medium hover:underline">*</span>
    </p>
  </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import { useModalStore } from '../../stores/modal'

const RestoreSteps = {
  restoreRequest: 0,
  restoreConfirm: 1,
  passwordUpdate: 2
}

export default {
  data() {
    return {
      login: '',
      code: '',
      newPassword: '',
      userId: null,
      currentStep: RestoreSteps.restoreRequest
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
  },
  methods: {
    ...mapActions(useAuthStore, [
      'restorePasswordRequest',
      'restorePasswordConfirm',
      'updatePassword',
      'setToken'
    ]),
    ...mapActions(useModalStore, ['showModal']),
    async restoreSubmit() {
      if (this.currentStep === RestoreSteps.restoreRequest) {
        await this.restorePasswordRequest({
          login: this.login
        })
        this.showModal('login')

        this.currentStep++
      } else if (this.currentStep === RestoreSteps.restoreConfirm) {
        const data = await this.restorePasswordConfirm({
          login: this.login,
          restorationToken: this.code
        })

        this.userId = data._id
        await this.setToken(data.token)
        this.currentStep++
      } else {
        await this.updatePassword({
          userId: this.userId,
          password: this.newPassword
        })
        this.showModal('login')
      }
    }
  }
}
</script>
