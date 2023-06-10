<template>
  <h1
    class="text-xl text-center font-sans leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6"
  >
    Увійдіть в свій акаунт
  </h1>
  <form class="space-y-4 md:space-y-6" @submit.prevent="loginSubmit">
    <div>
      <label for="text" class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Номер телефону або електронна пошта <sup>*</sup></label
      >
      <input
        type="text"
        name="login"
        id="login"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-slate-950 dark:bg-opacity-30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
        placeholder="Введіть номер або email"
        required=""
        v-model.trim="login"
      />
    </div>
    <div>
      <div class="flex justify-between">
        <label for="password" class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Пароль <sup>*</sup></label
        >
        <p
          @click="switchModal('restore')"
          to="restore"
          class="text-sm font-medium text-primary-600 hover:underline hover:cursor-pointer dark:text-primary-500"
        >
          Забули пароль?
        </p>
      </div>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Введіть пароль"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-slate-950 dark:bg-opacity-30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
        required=""
        v-model.trim="password"
      />
    </div>
    <!-- <div class="flex justify-between">
          
          </div> -->
    <button
      type="submit"
      class="flex flex-col mx-auto items-center min-w-[100px] text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-slate-950 font-medium rounded-2xl text-sm px-5 py-2.5 dark:bg-slate-950 dark:bg-opacity-30 dark:hover:bg-slate-700 dark:focus:bg-primary-700"
    >
      Увійти
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Немає акаунту?
      <button
        @click="switchModal('signup')"
        to="signup"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        Зареєструватися
      </button>
    </p>
  </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
export default {
  props: ['isShowModal', 'closeModal', 'switchModal'],
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async loginSubmit() {
      const success = await this.authStore.login({
        login: this.login,
        password: this.password
      })
      if (success) this.closeModal()
    }
  }
}
</script>
