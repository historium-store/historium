<template>
  <div class="w-4/5 mx-auto my-6 font-rubik">
    <p class="text-center text-xl">Оформлення замовлення</p>
    <div v-if="cart.items.length" class="grid grid-cols-1 lg:grid-cols-2">
      <div class="col-span-1 max-lg:order-last">
        <VeeForm
          v-slot="{ handleSubmit }"
          as="div"
          class="mt-12 [&>div>input]:pl-5"
          :validation-schema="schema"
        >
          <form @submit="handleSubmit($event, orderSubmit)">
            <div class="grid grid-cols-1 md:grid-cols-2 my-5 md:gap-3">
              <p class="col-span-1 md:col-span-2 text-xl">Контактні дані</p>
              <Field
                v-slot="{ meta, handleChange, value }"
                v-model.trim="formData.contactInfo.firstName"
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
                <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
              </Field>
              <Field
                v-slot="{ meta, handleChange, value }"
                v-model.trim="formData.contactInfo.lastName"
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
                <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
              </Field>
              <Field
                v-slot="{ meta, handleChange, value }"
                v-model.trim="formData.contactInfo.phoneNumber"
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
                <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
              </Field>
              <Field
                v-slot="{ meta, handleChange, value }"
                v-model.trim="formData.contactInfo.email"
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
                <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
              </Field>
              <Field
                v-model.trim="formData.deliveryInfo.country"
                as="select"
                type="text"
                name="country"
                class="border mt-2 rounded-2xl block w-full p-3 bg-background bg-opacity-30 h-12"
              >
                <option disabled value="">Оберіть країну доставки</option>
                <option
                  v-for="country in countries"
                  :key="country.name"
                  :on-change="pickCountry(country)"
                  selected
                  :value="country.name"
                >
                  {{ country.name }}
                </option>
                <!-- <span class="text-xs ps-3 text-red-500">{{ errors.firstName }}</span> -->
              </Field>
              <Field
                v-model.trim="formData.deliveryInfo.city"
                as="select"
                type="text"
                name="city"
                class="border mt-2 rounded-2xl block w-full p-3 bg-background bg-opacity-30 h-12"
              >
                <option disabled value="">Оберіть місто доставки</option>
                <option v-for="city in cities" :key="city" selected :value="city">
                  {{ city }}
                </option>
                <!-- <span class="text-xs ps-3 text-red-500">{{ errors.lastName }}</span> -->
              </Field>
              <div class="rounded-2xl inline-flex w-full p-3 space-x-2">
                <input
                  class="relative float-left mr-[5px] mt-[0.15rem] h-[18px] w-[18px] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-whiteblue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-turquoise hover:bg-lightturquoise checked:bg-turquoise checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-whiteblue checked:focus:after:bg-transparent"
                  name="callback"
                  type="checkbox"
                />
                <label for="callback">Передзвоніть мені </label>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 my-5">
              <p class="col-span-2 text-xl">Доставка</p>
              <delivery-type v-for="d_type in delivery.types" :key="d_type._id" :type="d_type" />
            </div>
            <div class="grid grid-cols-1 my-5">
              <p class="col-span-2 text-xl">Спосіб оплати</p>
              <div v-if="delivery?.pickedType?.paymentTypes" class="space-y-3 mt-3">
                <div
                  v-for="paymentType in delivery?.pickedType?.paymentTypes"
                  :key="paymentType"
                  class="border sm:text-lg rounded-2xl inline-flex items-center space-x-3 w-full p-3 bg-background bg-opacity-30 hover:cursor-pointer"
                  @click="pickPaymentType(paymentType)"
                >
                  <input
                    :checked="paymentType === delivery?.pickedPaymentType"
                    class="relative float-left mr-[5px] mt-[0.15rem] h-[18px] w-[18px] appearance-none rounded-full border-[0.125rem] border-solid border-whiteblue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] checked:border-turquoise hover:bg-lightturquoise checked:bg-turquoise checked:before:opacity-[0.16] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-whiteblue checked:focus:after:bg-transparent"
                    type="radio"
                    name="paymentType"
                    :value="paymentType"
                  />
                  <p>{{ paymentType }}</p>
                </div>
              </div>
            </div>
            <div class="my-5">
              <p class="text-xl mb-5">Коментар до замовлення</p>
              <textarea
                id="comment"
                v-model="formData.description"
                class="rounded-xl p-3 w-full bg-background_light opacity-60 text-lg"
                name="comment"
              />
            </div>
            <div class="my-5 space-y-5">
              <div class="flex text-xl justify-between">
                <p class="">До сплати</p>
                <span class="inline-flex space-x-1">
                  <p>{{ cart.totalPrice + delivery?.pickedType?.price }}</p>
                  <p>₴</p>
                </span>
              </div>
              <div class="flex justify-between">
                <span class="inline-flex space-x-1">
                  <p class="pr-1">{{ totalQuantityLabel }}</p>
                </span>
                <span class="inline-flex space-x-1">
                  <p>{{ cart.totalPrice }}</p>
                  <p>₴</p>
                </span>
              </div>
              <div class="flex justify-between">
                <p class="">Доставка</p>
                <span class="inline-flex space-x-1">
                  <p>{{ delivery?.pickedType?.price }}</p>
                  <p>₴</p>
                </span>
              </div>
              <hr />
              <div class="flex justify-between">
                <p class="">Дата відправки</p>
                <p>Відправка сьогодні</p>
              </div>
              <div class="text-xs">
                <p>Відправляючи замовлення, я підтверджую, що прочитав і згоден(а) з</p>
                <RouterLink to="conditions-of-use" class="text-blue-900">
                  Умовами використання
                </RouterLink>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex w-full border-2 flex-col mx-auto items-center min-w-[200px] text-white focus:outline-none focus:ring-slate-950 font-medium rounded-3xl px-3 py-2.5 bg-background bg-opacity-30"
                >
                  {{ buttonLabel }}
                </button>
              </div>
            </div>
          </form>
        </VeeForm>
      </div>
      <div class="col-span-1">
        <div class="mt-12 md:mx-6">
          <div class="flex justify-between">
            <p class="pr-1">{{ totalQuantityLabel }} у кошику</p>
            <font-awesome-icon
              size="lg"
              class="max-sm:text-2xl"
              :icon="['fas', 'pen']"
              style="color: #ffffff"
            />
          </div>
          <div>
            <order-items :order="cart" />
            <div>
              <span class="inline-flex space-x-1 text-lg">
                <p>Разом:</p>
                <p>{{ cart.totalPrice }}</p>
                <p>₴</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-center mt-6">Кошик порожній</h1>
    </div>

    <div v-if="isLoading" class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-40">
      <div class="h-screen w-full flex">
        <pulse-loader class="m-auto" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import validator from 'validator'
import { Field, Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import DeliveryType from '../../components/order/DeliveryType.vue'
import OrderItems from '../../components/order/OrderItems.vue'
import { useAlertStore } from '../../stores/alert'
import { useApiStore } from '../../stores/api'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useOrderStore } from '../../stores/order'
import { useUserStore } from '../../stores/user'
export default {
  components: { VeeForm, Field, OrderItems, DeliveryType },
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
      isLoading: false,
      formData: {
        contactInfo: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: ''
        },
        receiverInfo: {
          firstName: 'Прізва',
          lastName: "Ім'янова",
          phoneNumber: '+380445139822'
        },
        callback: true,
        deliveryInfo: {
          country: '',
          city: '',
          type: ''
        },
        description: ''
      }
    }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart']),
    ...mapWritableState(useUserStore, { authUser: 'user' }),
    ...mapWritableState(useOrderStore, ['countries', 'cities', 'delivery']),
    ...mapWritableState(useAuthStore, ['isAuthenticated']),
    buttonLabel() {
      // return `Оплатити ${this.cart.totalPrice + this.delivery?.pickedType?.price} ₴`
      return `Підтвердити замовлення`
    },
    totalQuantityLabel() {
      const totalQuantityLabel =
        this.cart.totalQuantity % 10 === 1 && this.cart.totalQuantity !== 11
          ? 'товар'
          : this.cart.totalQuantity < 10 &&
            1 < this.cart.totalQuantity % 10 &&
            this.cart.totalQuantity % 10 < 5
          ? 'товари'
          : 'товарів'

      return `${this.cart.totalQuantity} ${totalQuantityLabel}`
    }
  },
  updated() {
    this.getUserData()
  },
  async mounted() {
    this.getUserData()
    await this.getCountries()
    await this.getDeliveryTypes()
  },

  methods: {
    ...mapActions(useCartStore, ['clearCart']),
    ...mapActions(useApiStore, ['post']),
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useOrderStore, [
      'getCountries',
      'getDeliveryTypes',
      'pickCountry',
      'pickPaymentType',
      'createOrder'
    ]),
    inputStyle(meta) {
      return (
        'border mt-2 rounded-2xl block w-full p-3 bg-background bg-opacity-30 h-12 ' +
        (meta.validated ? (meta.valid ? 'border-cart-light' : 'border-red-600') : 'border-white')
      )
    },
    getUserData() {
      if (this.authUser) {
        const { firstName, lastName, phoneNumber, email } = this.authUser
        this.formData.contactInfo = {
          firstName,
          lastName,
          phoneNumber,
          email
        }
      }
    },
    async orderSubmit() {
      this.formData.deliveryInfo.type = this.delivery.pickedType.name
      const payload = {
        contactInfo: this.formData.contactInfo,
        callback: true,
        deliveryInfo: { ...this.formData.deliveryInfo, address: this.delivery.address },
        paymentType: this.delivery.pickedPaymentType,
        items: !this.isAuthenticated ? this.cart.items : undefined,
        description: this.formData.description
      }

      this.isLoading = true
      const order = await this.createOrder(payload)
      if (order) {
        await this.clearCart()
        this.showAlert('Заказ успішний')
        this.isLoading = false
        await this.$router.push({ name: 'submit-order', params: { orderNumber: order.number } })
      }
      this.isLoading = false
    }
  }
}
</script>

<style></style>
