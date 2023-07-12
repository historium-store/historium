<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Вхід до акаунту
  </h1>
  <VeeForm
    v-slot="{ handleSubmit }"
    as="div"
    class="mt-12 [&>div>input]:pl-5"
    :validation-schema="schema"
  >
    <form @submit="handleSubmit($event, loginSubmit)">
      <Field v-slot="{ field, meta, handleChange }" name="login">
        <input
          id="login"
          v-model.trim="field.value"
          type="text"
          name="login"
          :class="inputStyle(meta)"
          placeholder="Введіть номер або email"
          @input="handleChange"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="password">
        <input
          id="password"
          v-model.trim="field.value"
          type="password"
          name="password"
          placeholder="Введіть пароль"
          :class="inputStyle(meta)"
          @input="handleChange"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <div class="flex justify-end px-4 mt-1">
        <p
          class="text-sm font-medium hover:underline hover:cursor-pointer"
          @click="showModal('restore')"
        >
          Забули пароль?
        </p>
      </div>
      <button
        type="submit"
        class="flex border-2 flex-col mx-auto items-center min-w-[180px] text-md focus:outline-none font-medium rounded-3xl px-3 py-2 mb-4 bg-background bg-opacity-60"
      >
        Увійти
      </button>
      <p class="text-sm text-center font-light text-gray-500">
        Немає акаунту?
        <button class="font-medium hover:underline text-white" @click="showModal('signup')">
          Зареєструватися
        </button>
      </p>
    </form>
  </VeeForm>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions, mapWritableState } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAlertStore } from '../../stores/alert'
import { useUserStore } from '../../stores/user'
export default {
  components: { VeeForm, Field },
  setup() {
    const schema = yup.object({
      login: yup.string().email().required().min(2).max(50),
      password: yup.string().required().min(2).max(50)
    })

    return { schema }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useModalStore, ['hideModals', 'showModal']),
    ...mapActions(useAuthStore, { authLogin: 'login' }),
    ...mapActions(useAlertStore, ['showAlert']),
    async loginSubmit(values) {
      const response = await this.authLogin(values)
      if (response === true) {
        this.hideModals()
        this.showAlert(`Вітаю, ${this.user.firstName}!`)
      } else {
        this.showAlert(response.data.message, 'bg-red-500')
      }
    },
    inputStyle(meta) {
      return (
        'border mt-4 sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30 ' +
        (meta.validated ? (meta.valid ? 'border-turquoise' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>
