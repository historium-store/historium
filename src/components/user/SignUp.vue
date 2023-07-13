<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Реестрація
  </h1>
  <VeeForm
    v-slot="{ handleSubmit }"
    as="div"
    class="mt-12 [&>div>input]:pl-5"
    :validation-schema="schema"
  >
    <form @submit="handleSubmit($event, registerSubmit)">
      <Field v-slot="{ field, meta, handleChange }" name="firstName">
        <input
          id="firstName"
          v-model.trim="field.value"
          type="text"
          name="firstName"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше ім'я"
          @input="handleChange"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="lastName">
        <input
          id="lastName"
          v-model.trim="field.value"
          type="text"
          name="lastName"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше прізвище"
          @input="handleChange"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="phoneNumber">
        <input
          id="phoneNumber"
          v-model.trim="field.value"
          type="text"
          name="phoneNumber"
          :class="inputStyle(meta)"
          placeholder="Введіть ваше номер телефону"
          @input="handleChange"
        />
        <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
      </Field>
      <Field v-slot="{ field, meta, handleChange }" name="email">
        <input
          id="email"
          v-model.trim="field.value"
          type="text"
          name="email"
          :class="inputStyle(meta)"
          placeholder="Введіть вашу пошту"
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
        class="flex border-2 flex-col mx-auto items-center min-w-[200px] text-white focus:outline-none font-medium rounded-3xl text-sm px-3 py-2 bg-background bg-opacity-30"
      >
        Реестрація
      </button>
      <p class="text-sm text-center font-light text-gray-500 mt-3">
        Вже маєте акаунт?
        <button class="font-medium text-white hover:underline" @click="showModal('login')">
          Увійти
        </button>
      </p>
    </form>
  </VeeForm>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { mapActions } from 'pinia'
import validator from 'validator'
import { Field, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import { useModalStore } from '../../stores/modal'

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
    ...mapActions(useAuthStore, { registerSubmit: 'signup' }),
    ...mapActions(useModalStore, ['showModal', 'hideModals']),
    inputStyle(meta) {
      return (
        'border mt-4 sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30 ' +
        (meta.validated ? (meta.valid ? 'border-turquoise' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>
