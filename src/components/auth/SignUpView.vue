<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Реестрація
  </h1>
  <VeeForm
    as="div"
    v-slot="{ handleSubmit }"
    class="mt-12 [&>div>input]:pl-5"
    :validation-schema="schema"
  >
    <form @submit="handleSubmit($event, registerSubmit)">
      <Field v-slot="{ field, meta, handleChange }" name="firstName">
        <input
          @input="handleChange"
          type="text"
          name="firstName"
          id="firstName"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше ім'я"
          v-model.trim="field.value"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="lastName">
        <input
          @input="handleChange"
          type="text"
          name="lastName"
          id="lastName"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше прізвище"
          v-model.trim="field.value"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="phoneNumber">
        <input
          @input="handleChange"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше номер телефону"
          v-model.trim="field.value"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="email">
        <input
          @input="handleChange"
          type="text"
          name="email"
          id="email"
          :class="inputStyle(meta)"
          placeholder="Введіть вашу пошту"
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
  </VeeForm>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'

export default {
  components: { VeeForm, Field },
  setup() {
    const schema = yup.object({
      firstName: yup.string().min(2).max(50).required(),
      lastName: yup.string().min(2).max(50).required(),
      phoneNumber: yup
        .string()
        .test({
          test: (value) => validator.isMobilePhone(value, 'uk-UA'),
          message: 'Невірний формат мобільного'
        })
        .required(),
      email: yup.string().email().required(),
      password: yup.string().min(8).max(50).required()
    })

    return { schema }
  },
  methods: {
    ...mapActions(useAuthStore, ['signup', 'login']),
    ...mapActions(useModalStore, ['showModal', 'hideModals']),
    async registerSubmit(values) {
      const success = await this.signup(values)
      if (success) {
        await this.login({ login: values.email, password: values.password })
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
