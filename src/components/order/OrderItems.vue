<template>
  <ul class="font-medium overflow-y-auto flex flex-col">
    <li v-for="item in order ? order?.items : []" :key="item.product._id" class="py-3">
      <!-- {{ item }} -->
      <div class="flex m-2">
        <img
          class="h-24 rounded-md hover:cursor-pointer border-2"
          :src="item.product?.image"
          @click="viewProduct(item.product.key, item.product.type.key)"
        />
        <div class="product-details pl-4 flex flex-col">
          <p
            @click="viewProduct(item.product.key, item.product.type.key)"
            class="hover:cursor-pointer text-lg font-body"
          >
            {{ item.product?.name }}
          </p>
          <div class="flex space-x-2 mt-2">
            <div
              v-for="creator in item.product?.creators"
              :key="creator"
              class="rounded-lg border-1 bg-cart-dark w-fit px-2"
            >
              <p class="text-xs">{{ creator }}</p>
            </div>
          </div>

          <span class="inline-flex items-center mt-auto">
            <p class="">{{ item.product?.price }} ₴</p>
            <span class="mx-2 text-xl">•</span>
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
      <hr class="mx-2 mt-6 border-[1.5px] rounded-full opacity-40" />
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'pinia'
import { useProductStore } from '../../stores/product'
export default {
  props: ['order'],
  methods: {
    ...mapActions(useProductStore, ['viewProduct'])
  }
}
</script>

<style></style>
