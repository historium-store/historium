<template>
  <div class="w-11/12 mx-auto my-3 font-rubik">
    <p class="text-center text-xl">Налаштування</p>
    <div class="grid grid-cols-1 lg:grid-cols-2">
      <div v-if="false" class="col-span-1 m-3 xl:m-5">
        <p class="text-lg m-3">Інформація</p>
        <VeeForm v-slot="{ handleSubmit }" as="div" :validation-schema="schema">
          <form @submit="handleSubmit($event, orderSubmit)">
            <div class="bg-turquoise rounded-3xl p-5 space-y-5">
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
              <button
                type="submit"
                class="flex w-full border-2 flex-col mx-auto items-center min-w-[200px] text-white focus:outline-none focus:ring-slate-950 font-medium rounded-3xl px-3 py-2.5 bg-background bg-opacity-30"
              >
                submit
              </button>
            </div>
          </form>
        </VeeForm>
      </div>
      <div class="col-span-1 text-whiteblue m-3 xl:m-5">
        <p class="text-lg m-3">Інформація</p>
        <div class="bg-turquoise rounded-3xl p-5 space-y-5">
          <VeeForm
            v-if="changeMode.name"
            v-slot="{ handleSubmit }"
            as="div"
            :validation-schema="schema"
            class=""
          >
            <form class="grid grid-cols-5 space-x-2" @submit="handleSubmit($event, updateUser)">
              <div class="col-span-5 md:col-span-3">
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
              <div class="col-span-5 md:col-span-2 flex">
                <div class="flex my-3 md:my-0 md:mt-auto space-x-2 md:mx-auto md:w-full bg-black">
                  <button
                    type="submit"
                    class="w-1/2 flex border-1 items-center text-turquoise text-sm rounded-3xl px-3 bg-whiteblue"
                  >
                    Зберегти
                  </button>
                  <button
                    class="w-1/2 flex border-1 mx-auto items-center text-whiteblue text-sm rounded-3xl px-3 border-[1.5px] border-whiteblue"
                    @click="switchChangeMode('name')"
                  >
                    Скасувати
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

          <div class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Електронна пошта</p>
              <p>{{ user.email }}</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode('email')">Змінити</p>
            </div>
          </div>
          <div class="w-full flex justify-between items-center">
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
          <div class="w-full flex justify-between items-center">
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
          <div class="w-full flex justify-between items-center">
            <div>
              <p class="text-xs opacity-70">Дата народження</p>
              <p>{{ user.birthdayDate || 'Не вказано' }}</p>
            </div>
            <div>
              <p class="text-xs hover:cursor-pointer" @click="switchChangeMode">Змінити</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { mapWritableState } from 'pinia'
import { useUserStore } from '../../stores/user'

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
      email: yup.string().email().required()
    })

    return { schema }
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
          birthdayDate: ''
        }
      }
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user', 'fullName'])
  },
  async mounted() {
    if (this.user) {
      const { firstName, lastName, phoneNumber, email, birthdayDate } = this.user
      this.formData.user = {
        firstName,
        lastName,
        phoneNumber,
        email,
        birthdayDate
      }
    }
  },

  methods: {
    async updateUser() {
      console.log('herr')
    },
    switchChangeMode(forField) {
      this.changeMode[forField] = !this.changeMode[forField]
      //   switch (forField) {
      //     case 'name':
      //       break
      //     case 'email':
      //       break
      //     case 'phoneNumber':
      //       break
      //     case 'password':
      //       break
      //   }
    },
    inputStyle(meta) {
      return (
        'border mt-2 rounded-2xl block w-full p-3 bg-transparent h-12 ' +
        (meta.validated ? (meta.valid ? 'border-cart-light' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>

<style></style>
