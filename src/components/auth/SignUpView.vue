<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Реестрація
  </h1>
  <form class="space-y-4 mt-12 [&>div>input]:pl-5" @submit.prevent="signupSubmit">
    <div>
      <!-- <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ваше ім'я <sup>*</sup></label
      > -->
      <input
        type="text"
        name="firstName"
        id="text"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть ваше ім'я"
        required=""
        v-model.trim="formData.firstName"
      />
    </div>
    <div>
      <!-- <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Ваше прізвище <sup>*</sup></label
      > -->
      <input
        type="text"
        name="lastName"
        id="text"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть ваше прізвище"
        required=""
        v-model.trim="formData.lastName"
      />
    </div>
    <div>
      <!-- <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Номер телефону <sup>*</sup></label
      > -->
      <input
        type="tel"
        name="phoneNumber"
        id="text"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="+38"
        required=""
        v-model.trim="formData.phoneNumber"
      />
    </div>
    <div>
      <!-- <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Електронна пошта <sup>*</sup></label
      > -->
      <input
        type="email"
        name="email"
        id="email"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть email"
        required=""
        v-model.trim="formData.email"
      />
    </div>
    <div>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Введіть пароль"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        required=""
        v-model.trim="formData.password"
      />
      <div class="flex justify-end px-4 mt-4">
        <p
          @click="showModal('restore')"
          class="text-sm font-medium hover:underline hover:cursor-pointer"
        >
          Забули пароль?
        </p>
      </div>
    </div>

    <!-- <div class="flex items-center mb-4">
      <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-slate-950 dark:bg-opacity-30 dark:border-gray-600"
        type="checkbox"
        name="confirm"
        id="confirm"
      />
      <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="confirm"
        >Погоджуюсь з умовами використання</label
      >
    </div> -->
    <button
      type="submit"
      class="flex border-2 flex-col mx-auto items-center min-w-[200px] text-white focus:outline-none font-medium rounded-3xl text-sm px-3 py-2 bg-background bg-opacity-30"
    >
      Реестрація
    </button>
    <p class="text-sm text-center font-light text-gray-500">
      Вже маєте акаунт?
      <button @click="showModal('login')" class="font-medium text-white hover:underline">
        Увійти
      </button>
    </p>
  </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import { useModalStore } from '../../stores/modal'

export default {
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['signup', 'login']),
    ...mapActions(useModalStore, ['showModal']),

    async signupSubmit() {
      const success = await this.signup({
        ...this.formData
      })
      if (success) {
        console.log('success')
        await this.login({ login: this.formData.email, password: this.formData.password })
      } else {
        alert('ERROR')
      }
    }
  }
}
</script>
