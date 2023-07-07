<template>
  <!-- <ul class="font-medium h-[40vh] md:h-[50vh] overflow-y-auto flex flex-col [&>*:last-child]:mb-4"> -->
  <ul class="font-medium overflow-y-auto flex flex-col [&>*:last-child]:mb-4">
    <li v-for="item in cart ? cart?.items : []" :key="item.product._id" class="py-3">
      <div class="flex m-2">
        <img
          class="h-24 rounded-md hover:cursor-pointer border-2"
          :src="item.product?.image"
          @click="viewProduct(item.product.key, item.product.type.key)"
        />
        <div class="product-details pl-4 flex flex-col">
          <p
            @click="viewProduct(item.product.key, item.product.type.key)"
            class="text-cart-dark hover:cursor-pointer"
          >
            {{ item.product?.name }}
          </p>
          <p class="text-xs">{{ item.product?.authors?.[0] }}</p>
          <span class="inline-flex items-center mt-auto">
            <p class="text-xl">{{ item.product?.price }} ₴</p>
            <span class="mx-2 text-xl">•</span>
            <p>{{ item.product?.type?.name || item.product?.type }}</p>
          </span>
        </div>
        <div class="ml-auto flex flex-col justify-between">
          <font-awesome-icon
            @click="removeAll(item.product._id)"
            size="xl"
            class="max-sm:text-xl ms-auto hover:cursor-pointer"
            :icon="['fas', 'trash-can']"
            style="color: #0e6060"
          />
          <div
            class="product-actions select-none inline-flex items-center border-2 border-cart-light rounded-full"
          >
            <div
              class="bg-cart-dark rounded-full w-6 h-6 m-1 text-2xl hover:cursor-pointer"
              @click="remove(item.product._id)"
            >
              <p class="text-center text-white -mt-0.5">-</p>
            </div>
            <input
              @blur="change(item.product._id, item.quantity)"
              @keydown="quantityChangeEnter($event, item.product._id)"
              class="bg-transparent w-8 text-xl text-center rounded-md"
              v-model.number="item.quantity"
            />
            <div
              class="bg-cart-dark rounded-full w-6 h-6 m-1 text-2xl hover:cursor-pointer"
              @click="add(item.product._id)"
            >
              <p class="text-center text-white -mt-0.5">+</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="mx-2 mt-6 border-[1.5px] rounded-full border-cart-light opacity-40" />
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'pinia'
import { useCartStore } from '../../stores/cart'
import { useProductStore } from '../../stores/product'
export default {
  props: ['cart'],
  methods: {
    ...mapActions(useCartStore, ['addItem', 'removeItem', 'decreaseItem', 'changeItemCount']),
    ...mapActions(useProductStore, ['viewProduct']),
    async add(id) {
      await this.addItem(id)
    },
    async remove(id) {
      await this.decreaseItem(id)
    },
    async removeAll(id) {
      await this.removeItem(id)
    },
    async change(id, count) {
      await this.changeItemCount(id, count)
    },
    async quantityChangeEnter(e, id) {
      if (e.key === 'Enter') {
        await this.change(id, e.target.value)
      }
    }
  }
}
</script>

<style></style>
