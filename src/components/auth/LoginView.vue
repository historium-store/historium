<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Вхід до акаунту
  </h1>
  <VeeForm
    as="div"
    v-slot="{ handleSubmit }"
    class="mt-12 [&>div>input]:pl-5"
    :validation-schema="schema"
  >
    <form @submit="handleSubmit($event, loginSubmit)">
      <Field v-slot="{ field, meta, handleChange }" name="login">
        <input
          @input="handleChange"
          type="text"
          name="login"
          id="login"
          :class="inputStyle(meta)"
          placeholder="Введіть номер або email"
          v-model.trim="field.value"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="password">
        <input
          @input="handleChange"
          type="password"
          name="password"
          id="password"
          placeholder="Введіть пароль"
          :class="inputStyle(meta)"
          v-model.trim="field.value"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
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
        class="flex border-2 flex-col mx-auto items-center min-w-[180px] text-md focus:outline-none font-medium rounded-3xl px-3 py-2 mb-4 bg-background bg-opacity-60"
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
  </VeeForm>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  components: { VeeForm, Field },
  setup() {
    const schema = yup.object({
      login: yup.string().email().required().min(2).max(50),
      password: yup.string().required().min(2).max(50)
    })

    return { schema }
  },
  methods: {
    ...mapActions(useModalStore, ['hideModals', 'showModal']),
    ...mapActions(useAuthStore, { authLogin: 'login' }),
    async loginSubmit(values) {
      const success = await this.authLogin(values)
      if (success) {
        this.hideModals()
      }
    },
    inputStyle(meta) {
      return (
        'border mt-4 sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30 ' +
        (meta.validated ? (meta.valid ? 'border-cart-light' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>
