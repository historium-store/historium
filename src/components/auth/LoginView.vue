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
      <span>{{ login.errorMessage }}</span>
    </div>
    <div>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Введіть пароль"
        class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
        required=""
        v-model.trim="password"
      />
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
    <!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Немає акаунту?
      <button
        @click="showModal('signup')"
        to="signup"
        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
      >
        Зареєструватися
      </button>
    </p> -->
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
      login: useField(
        () => '',
        yup.string().when('isEmail', {
          is: true,
          then: () => yup.string().email().required(),
          otherwise: () => yup.string().required().min(10)
        })
      ),
      password: useField(() => '', yup.string().required().min(8))
    }
  },
  methods: {
    ...mapActions(useModalStore, ['hideModals', 'showModal']),
    ...mapActions(useAuthStore, { authLogin: 'login' }),
    async loginSubmit() {
      const success = await this.authLogin({
        login: this.login,
        password: this.password
      })
      if (success) {
        this.hideModals()
      }
    }
  }
}
</script>
