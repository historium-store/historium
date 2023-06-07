<template>
  <!-- <div v-if="cart">{{ cart }}</div> -->
  <!-- <div v-if="localCart">{{ localCart }}</div> -->

  <ul>
    <li v-for="item in cart ? cart?.items : localCart?.items" :key="item._id">
      <div class="m-2 [&>*]:text-[18px] [&>*]:px-2 p-2 inline-flex">
        <img class="h-20" :src="item.product.image" />
        <div>
          <p>{{ item.product?.name }}</p>
          <p class="text-sm">{{ item.product?.authors[0] }}</p>
          <span class="inline-flex [&>*]:text-sm">
            <p>{{ item.product?.price }} грн</p>
            <span class="mx-2">•</span>
            <p>{{ item.product?.type.name }}</p>
          </span>
        </div>
        <div class="inline-flex items-center border rounded-lg m-5">
          <p @click="minus(item.product._id)" class="px-3 hover:cursor-pointer">-</p>
          <p class="px-3">{{ item.quantity }}</p>
          <p @click="plus(item.product._id)" class="px-3 hover:cursor-pointer">+</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import { mapActions, mapWritableState } from 'pinia'
export default {
  async mounted() {
    const userStore = useAuthStore()
    await this.updateCart()
    return { userStore }
  },
  watch: {
    cart(newCart) {
      console.log(newCart)
    }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart', 'localCart'])
  },
  methods: {
    ...mapActions(useCartStore, [
      'addItemToCart',
      'removeItemFromCart',
      'updateCart',
      'updateLocalCart'
    ]),
    async plus(id) {
      await this.addItemToCart(id)
    },
    async minus(id) {
      await this.removeItemFromCart(id)
    }
  }
}
</script>

<style></style>
