<template>
  <div class="w-4/5 mx-auto my-6">
    <p class="text-center text-xl">Оформлення замовлення</p>
    <div class="">
      <div class="flex justify-between">
        <span class="inline-flex"
          ><p class="pr-1">{{ cart.totalQuantity }}</p>
          <p v-if="cart.totalQuantity % 10 === 1">товар</p>
          <p v-else-if="1 < cart.totalQuantity % 10 && cart.totalQuantity % 10 < 5">товари</p>
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
                  <p>{{ item.product?.price }} грн</p>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useCartStore } from '../../stores/cart'
export default {
  computed: {
    ...mapWritableState(useCartStore, ['cart'])
  }
}
</script>

<style></style>
