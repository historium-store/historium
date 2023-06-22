<template>
  <div class="w-4/5 mx-auto my-6">
    <p class="text-center text-xl">Оформлення замовлення</p>
    <div class="">
      <div class="flex justify-between">
        <span class="inline-flex"
          ><p class="pr-1">{{ cart.totalQuantity }}</p>
          <p v-if="cart.totalQuantity % 10 === 1">товар</p>
          <p
            v-else-if="
              cart.totalQuantity < 10 && 1 < cart.totalQuantity % 10 && cart.totalQuantity % 10 < 5
            "
          >
            товари
          </p>
          <p v-else>товарів</p>
          <p class="pl-1">у кошику</p></span
        >
        <font-awesome-icon
          size="lg"
          class="max-sm:text-2xl"
          :icon="['fas', 'pen']"
          style="color: #ffffff"
        />
      </div>
      <div>
        <ul v-if="cart.items">
          <li v-for="item in cart.items" :key="item.product._id" class="py-1">
            <div class="flex m-2 items-center">
              <img
                class="h-20 rounded-md hover:cursor-pointer"
                :src="item.product?.image"
                @click="viewProduct(item.product.key)"
              />
              <div class="product-details pl-4">
                <p @click="viewProduct(item.product.key)" class="hover:cursor-pointer">
                  {{ item.product?.name }}
                </p>
                <p class="text-sm">{{ item.product?.authors[0] }}</p>
                <span class="inline-flex [&>*]:text-sm">
                  <p>{{ item.product?.price }} ₴</p>
                  <span class="mx-2">•</span>
                  <p>{{ item.product?.type?.name || item.product?.type }}</p>
                </span>
              </div>
              <div class="ml-auto mb-auto">
                <span class="inline-flex space-x-2">
                  <p>{{ item.quantity }}</p>
                  <p>шт.</p>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <span class="inline-flex space-x-1 text-lg">
            <p>Разом:</p>
            <p>{{ cart.totalPrice }}</p>
            <p>₴</p>
          </span>
        </div>
      </div>
      <form>
        <div class="grid grid-cols-2 gap-4 my-5">
          <p class="col-span-2 text-xl">Контактні дані</p>

          <div>
            <input
              type="text"
              name="firstName"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть ваше ім'я"
              v-model.trim="formData.firstName"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.firstName }}</span> -->
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть ваше прізвище"
              v-model.trim="formData.lastName"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.lastName }}</span> -->
          </div>
          <div>
            <input
              name="phoneNumber"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть номер телефону"
              v-model.trim="formData.phoneNumber"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.phoneNumber }}</span> -->
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть email"
              v-model.trim="formData.email"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.email }}</span> -->
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 my-5">
          <p class="col-span-2 text-xl">Доставка</p>

          <div>
            <select
              type="text"
              name="country"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              v-model.trim="formData.delivery.country"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.firstName }}</span> -->
          </div>
          <div>
            <select
              type="text"
              name="city"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть місто"
              v-model.trim="formData.delivery.city"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.lastName }}</span> -->
          </div>
          <div>
            <input
              name="phoneNumber"
              id="text"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              v-model.trim="formData.phoneNumber"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.phoneNumber }}</span> -->
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              class="border sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30"
              placeholder="Введіть email"
              v-model.trim="formData.email"
            />
            <!-- <span class="text-xs ps-3 text-red-500">{{ errors.email }}</span> -->
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 my-5">
          <p class="col-span-2 text-xl">Спосіб оплати</p>
        </div>
        <div class="my-5">
          <p class="text-xl mb-5">Коментар до замовлення</p>
          <textarea
            class="rounded-xl w-full bg-background_light"
            name="comment"
            id="comment"
          ></textarea>
        </div>
        <div class="my-5 space-y-5">
          <div class="flex text-xl justify-between">
            <p class="">До сплати</p>
            <span class="inline-flex space-x-1">
              <p>{{ cart.totalPrice + deliveryPrice }}</p>
              <p>₴</p>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="inline-flex space-x-1">
              <p class="pr-1">{{ cart.totalQuantity }}</p>
              <p v-if="cart.totalQuantity % 10 === 1">товар</p>
              <p
                v-else-if="
                  cart.totalQuantity < 10 &&
                  1 < cart.totalQuantity % 10 &&
                  cart.totalQuantity % 10 < 5
                "
              >
                товари
              </p>
              <p v-else>товарів</p>
            </span>
            <span class="inline-flex space-x-1">
              <p>{{ cart.totalPrice }}</p>
              <p>₴</p>
            </span>
          </div>
          <div class="flex justify-between">
            <p class="">Доставка</p>
            <span class="inline-flex space-x-1">
              <p>{{ deliveryPrice }}</p>
              <p>₴</p>
            </span>
          </div>
          <hr />
          <div class="flex justify-between">
            <p class="">Дата відправки</p>
            <p>Відправка сьогодні</p>
          </div>
          <div class="inline-flex space-x-1">
            <p class="text-xs">Відправляючи замовлення, я підтверджую, що прочитав і згоден(а) з</p>
            <RouterLink to="conditions-of-use" class="text-xs text-blue-900"
              >Умовами використання</RouterLink
            >
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
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useCartStore } from '../../stores/cart'
export default {
  data() {
    return {
      deliveryPrice: 50,
      formData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        otherReciever: false,
        callMe: false,
        delivery: {
          country: '',
          city: '',
          deliveryType: ''
        }
      }
    }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart']),
    buttonLabel() {
      return `Оплатити ${this.cart.totalPrice + this.deliveryPrice} ₴`
    }
  }
}
</script>

<style></style>
