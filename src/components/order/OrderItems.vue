<template>
  <ul class="font-medium flex flex-col w-full">
    <li v-for="item in order ? order?.items : []" :key="item.product._id" class="py-3">
      <div class="flex my-2 m-1 md:m-2">
        <img
          class="h-24 rounded-md hover:cursor-pointer border-2"
          :src="item.product?.image"
          @click="viewProduct(item.product.key, item.product.type.key)"
        />
        <div class="product-details pl-4 flex flex-col">
          <p
            class="hover:cursor-pointer text:sm md:text-lg font-body"
            @click="viewProduct(item.product.key, item.product.type.key)"
          >
            {{ item.product?.name }}
          </p>
          <div class="flex space-x-2 mt-2">
            <div
              v-for="creator in item.product?.creators"
              :key="creator"
              class="rounded-lg border-1 bg-deepgreen px-2"
            >
              <p class="text-xs font-thin">
                {{ creator }}
              </p>
            </div>
          </div>

          <span class="inline-flex items-center mt-auto text-xs md:text-base">
            <p class="">{{ item.product?.price }} ₴</p>
            <span class="mx-2 text-xl">•</span>
            <p>{{ item.product?.type?.name || item.product?.type }}</p>
          </span>
        </div>
        <div class="ml-auto mb-auto text-xs md:text-base mr-2">
          <span class="inline-flex space-x-2">
            <p>{{ item.quantity }}</p>
            <p>шт.</p>
          </span>
        </div>
      </div>
      <hr class="md:mx-2 mt-6 border-[1.5px] rounded-full opacity-40" />
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
