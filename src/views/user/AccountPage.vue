<template>
  <div class="w-11/12 mx-auto my-3 font-rubik">
    <p class="text-center text-xl">Налаштування</p>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div class="col-span-1 text-whiteblue m-3 xl:m-5">
        <p class="text-lg m-3">Інформація</p>
        <div class="bg-turquoise rounded-3xl p-5 space-y-5">
          <VeeForm
            v-if="changeMode.name"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schemaName"
          >
            <form
              id="name"
              class="grid grid-cols-12 space-x-2"
              @submit="handleSubmit($event, updateUser)"
            >
              <div class="col-span-12 md:col-span-7">
                <Field
                  v-slot="{ meta, handleChange, value }"
                  v-model.trim="formData.user.firstName"
                  name="firstName"
                >
                  <input
                    id="firstName"
                    :value="value"
                    type="text"
                    name="firstName"
                    :class="inputStyle(meta)"
                    placeholder="Введіть ваше ім'я"
                    @input="handleChange"
                  />
                </Field>
                <Field
                  v-slot="{ meta, handleChange, value }"
                  v-model.trim="formData.user.lastName"
                  name="lastName"
                >
                  <input
                    id="lastName"
                    :value="value"
                    type="text"
                    name="lastName"
                    :class="inputStyle(meta)"
                    placeholder="Введіть ваше прізвище"
                    @input="handleChange"
                  />
                </Field>
              </div>
              <div class="col-span-12 md:col-span-5 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-xs rounded-3xl px-3 bg-whiteblue"
                  >
                    <p class="mx-auto">Зберегти</p>
                  </button>
                  <button
                    class="w-1/2 flex border-1 items-center text-whiteblue text-xs py-1 rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('name')"
                  >
                    <p class="mx-auto">Скасувати</p>
                  </button>
                </div>
              </div>
            </form>
            <hr class="mb-3 md:my-3" />
          </VeeForm>
          <div v-else class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Ім'я</p>
              <p>{{ fullName }}</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('name')">Змінити</p>
            </div>
          </div>

          <VeeForm
            v-if="changeMode.email"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schemaEmail"
          >
            <form
              id="email"
              class="grid grid-cols-12 space-x-2"
              @submit="handleSubmit($event, updateUser)"
            >
              <div class="col-span-12 md:col-span-7">
                <Field
                  v-slot="{ meta, handleChange, value }"
                  v-model.trim="formData.user.email"
                  name="email"
                >
                  <input
                    id="email"
                    :value="value"
                    type="text"
                    name="email"
                    :class="inputStyle(meta)"
                    placeholder="Введіть вашу пошту"
                    @input="handleChange"
                  />
                </Field>
              </div>
              <div class="col-span-12 md:col-span-5 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-xs rounded-3xl px-3 bg-whiteblue"
                  >
                    <p class="mx-auto">Зберегти</p>
                  </button>
                  <button
                    class="w-1/2 flex border-1 items-center text-whiteblue text-xs py-1 rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('email')"
                  >
                    <p class="mx-auto">Скасувати</p>
                  </button>
                </div>
              </div>
            </form>
            <hr class="mb-3 md:my-3" />
          </VeeForm>
          <div v-else class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Електронна пошта</p>
              <p>{{ user.email }}</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('email')">Змінити</p>
            </div>
          </div>

          <VeeForm
            v-if="changeMode.phoneNumber"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schemaPhone"
          >
            <form
              id="phoneNumber"
              class="grid grid-cols-12 space-x-2"
              @submit="handleSubmit($event, updateUser)"
            >
              <div class="col-span-12 md:col-span-7">
                <Field
                  v-slot="{ meta, handleChange, value }"
                  v-model.trim="formData.user.phoneNumber"
                  name="phoneNumber"
                >
                  <input
                    id="phoneNumber"
                    :value="value"
                    type="text"
                    name="phoneNumber"
                    :class="inputStyle(meta)"
                    placeholder="Введіть ваш номер телефону"
                    @input="handleChange"
                  />
                </Field>
              </div>
              <div class="col-span-12 md:col-span-5 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-xs rounded-3xl px-3 bg-whiteblue"
                  >
                    <p class="mx-auto">Зберегти</p>
                  </button>
                  <button
                    class="w-1/2 flex border-1 items-center text-whiteblue text-xs py-1 rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('phoneNumber')"
                  >
                    <p class="mx-auto">Скасувати</p>
                  </button>
                </div>
              </div>
            </form>
            <hr class="mb-3 md:my-3" />
          </VeeForm>
          <div v-else class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Номер телефону</p>
              <p>{{ user.phoneNumber }}</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('phoneNumber')">
                Змінити
              </p>
            </div>
          </div>

          <VeeForm
            v-if="changeMode.password"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schemaPassword"
          >
            <form
              id="password"
              class="grid grid-cols-12 space-x-2"
              @submit="handleSubmit($event, updateUser)"
            >
              <div class="col-span-12 md:col-span-7">
                <Field
                  v-slot="{ value, meta, handleChange }"
                  v-model.trim="formData.user.password"
                  name="password"
                >
                  <input
                    id="password"
                    :value="value"
                    type="password"
                    name="password"
                    :class="inputStyle(meta)"
                    placeholder="Введіть пароль"
                    @input="handleChange"
                  />
                </Field>
              </div>
              <div class="col-span-12 md:col-span-5 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-xs rounded-3xl px-3 bg-whiteblue"
                  >
                    <p class="mx-auto">Зберегти</p>
                  </button>
                  <button
                    class="w-1/2 flex border-1 items-center text-whiteblue text-xs py-1 rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('password')"
                  >
                    <p class="mx-auto">Скасувати</p>
                  </button>
                </div>
              </div>
            </form>
            <hr class="mb-3 md:my-3" />
          </VeeForm>
          <div v-else class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Пароль</p>
              <p>********</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('password')">
                Змінити
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 text-whiteblue m-3 xl:m-5">
        <p class="text-lg m-3">Особиста знижка</p>
        <div class="bg-turquoise rounded-3xl p-5 space-y-5">
          <div class="border-[1.5px] border-white rounded-3xl">
            <p class="text-xs p-3 py-8">
              Введіть дату свого народження, та у попередні та наступні 10 днів свята ми даруємо
              знижку у 10% на будь-який товар!
            </p>
          </div>
          <VeeForm
            v-if="changeMode.birthDate"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schemaBirthDate"
          >
            <form
              id="birthDate"
              class="grid grid-cols-12 space-x-2"
              @submit="handleSubmit($event, updateUser)"
            >
              <div class="col-span-12 md:col-span-7">
                <Field
                  v-slot="{ value, meta, handleChange }"
                  v-model.trim="formData.user.birthDate"
                  name="birthDate"
                >
                  <input
                    id="birthDate"
                    :value="value"
                    type="date"
                    name="birthDate"
                    :class="inputStyle(meta)"
                    placeholder="Введіть вашу дату народження"
                    @input="handleChange"
                  />
                </Field>
              </div>
              <div class="col-span-12 md:col-span-5 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-xs rounded-3xl px-3 bg-whiteblue"
                  >
                    <p class="mx-auto">Зберегти</p>
                  </button>
                  <button
                    class="w-1/2 flex border-1 items-center text-whiteblue text-xs py-1 rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('birthDate')"
                  >
                    <p class="mx-auto">Скасувати</p>
                  </button>
                </div>
              </div>
            </form>
            <hr class="mb-3 md:my-3" />
          </VeeForm>
          <div v-else class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Дата народження</p>
              <p>
                {{ user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Не вказано' }}
              </p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('birthDate')">
                Змінити
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import validator from 'validator'
import { Field, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '../../stores/user'

export default {
  components: { VeeForm, Field },
  setup() {
    const schemaName = yup.object({
      firstName: yup.string().min(2).max(50).required(),
      lastName: yup.string().min(2).max(50).required()
    })
    const schemaEmail = yup.object({
      email: yup.string().email().required()
    })
    const schemaPhone = yup.object({
      phoneNumber: yup
        .string()
        .test({
          test: (value) => validator.isMobilePhone(value, 'uk-UA'),
          message: 'Невірний формат мобільного'
        })
        .required()
    })
    const schemaPassword = yup.object({
      password: yup.string().required().min(2).max(50)
    })
    const schemaBirthDate = yup.object({
      birthDate: yup.date().required().min('1923-01-01').max(new Date())
    })

    return { schemaName, schemaEmail, schemaPhone, schemaPassword, schemaBirthDate }
  },
  data() {
    return {
      changeMode: {
        name: false,
        email: false,
        phoneNumber: false,
        password: false
      },
      formData: {
        user: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          birthDate: ''
        }
      }
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user', 'fullName'])
  },
  async mounted() {
    if (this.user) {
      const { firstName, lastName, phoneNumber, email, birthDate } = this.user
      this.formData.user = {
        firstName,
        lastName,
        phoneNumber,
        email,
        birthDate: new Date(birthDate).toLocaleDateString()
      }
    }
  },

  methods: {
    ...mapActions(useUserStore, ['updateUserInfo']),
    async updateUser(data, info) {
      if (data.birthDate) data.birthDate = new Date(data.birthDate).getTime()
      await this.updateUserInfo(data)
      this.switchChangeMode(info.evt.target.id)
    },
    switchChangeMode(forField) {
      this.changeMode[forField] = !this.changeMode[forField]
    },
    inputStyle(meta) {
      return (
        'border mt-2 rounded-2xl block w-full p-3 bg-transparent h-10 ' +
        (meta.validated ? (meta.valid ? 'border-cart-light' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>

<style></style>
