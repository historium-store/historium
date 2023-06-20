<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Вхід до акаунту
  </h1>
  <form class="space-y-6 mt-12 [&>div>input]:pl-5" @submit.prevent="loginSubmit">
    <div>
      <input
        @change="login.handleChange"
        type="text"
        name="login"
        id="login"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        placeholder="Введіть номер або email"
        v-model.trim="login.value"
      />
      <span class="text-xs ps-3 text-red-500">{{ login.errorMessage }}</span>
    </div>
    <div>
      <input
        @change="password.handleChange"
        type="password"
        name="password"
        id="password"
        placeholder="Введіть пароль"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        required=""
        v-model.trim="password.value"
      />
      <span class="text-xs ps-3 text-red-500">{{ password.errorMessage }}</span>
    </div>
    <div class="flex justify-end px-4">
      <p
        @click="showModal('restore')"
        class="text-sm font-medium hover:underline hover:cursor-pointer"
      >
        Забули пароль?
      </p>
    </div>
    <button
      type="submit"
      class="flex border-2 flex-col mx-auto items-center min-w-[180px] text-md focus:outline-none font-medium rounded-3xl px-3 py-2 bg-background bg-opacity-60"
    >
      Увійти
    </button>
    <p class="text-sm text-center font-light text-gray-500">
      Немає акаунту?
      <button @click="showModal('signup')" class="font-medium hover:underline text-white">
        Зареєструватися
      </button>
    </p>
  </form>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { useField } from 'vee-validate'
import * as yup from 'yup'

export default {
  data() {
    return {
      login: useField(() => '', yup.string().required().email()),
      password: useField(() => '', yup.string().required().min(8))
    }
  },
  methods: {
    ...mapActions(useModalStore, ['hideModals', 'showModal']),
    ...mapActions(useAuthStore, { authLogin: 'login' }),
    async loginSubmit() {
      console.log(this.login.value)
      console.log(this.password.value)
      const success = await this.authLogin({
        login: this.login.value,
        password: this.password.value
      })
      if (success) {
        this.hideModals()
      }
    }
  }
}
</script>
