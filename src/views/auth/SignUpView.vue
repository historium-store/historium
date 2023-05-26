<script>
import { useAuthStore } from '@/stores/auth'

export default {
  setup() {
    const authStore = useAuthStore()

    return { authStore }
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async signupSubmit() {
      const success = await this.authStore.signup({
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password
      })
      if (success) {
        console.log('success')
        await this.authStore.login({ login: this.email, password: this.password })
      } else {
        alert('ERROR')
      }
    }
  }
}
</script>
<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-sans leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Реестрація
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="signupSubmit">
          <div>
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Ваше ім'я <sup>*</sup></label
            >
            <input
              type="text"
              name="firstName"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Введіть ваше ім'я"
              required=""
              v-model.trim="firstName"
            />
          </div>
          <div>
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Ваше прізвище <sup>*</sup></label
            >
            <input
              type="text"
              name="lastName"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Введіть ваше прізвище"
              required=""
              v-model.trim="lastName"
            />
          </div>
          <div>
            <label
              for="phoneNumber"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Номер телефону <sup>*</sup></label
            >
            <input
              type="phone"
              name="phoneNumber"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+38"
              required=""
              v-model.trim="phoneNumber"
            />
          </div>
          <div>
            <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Електронна пошта <sup>*</sup></label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Введіть email"
              required=""
              v-model.trim="email"
            />
          </div>
          <div>
            <div class="flex justify-between">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Пароль <sup>*</sup></label
              >
              <router-link
                to="restore"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Забули пароль?</router-link
              >
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Введіть пароль"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              v-model.trim="password"
            />
          </div>
          <div class="flex items-center mb-4">
            <input
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              name="confirm"
              id="confirm"
            />
            <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="confirm"
              >Погоджуюсь з умовами використання</label
            >
          </div>
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Реестрація
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Вже маєте акаунт?
            <router-link
              to="login"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Увійти</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
