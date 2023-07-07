<template>
  <div>
    <ul v-if="hasResults">
      <li v-for="item in results" :key="item._id" class="py-1">
        <div class="flex m-2 items-center">
          <img
            class="h-20 rounded-md hover:cursor-pointer"
            :src="item.image"
            @click="viewProduct(item.product.key, item.product.type.key)"
          />
          <div class="product-details pl-4">
            <p @click="viewProduct(item.product.key, item.product.type.key)" class="hover:cursor-pointer">
              {{ item.name }}
            </p>
            <p class="text-sm">{{ item.authors[0] }}</p>
            <span class="inline-flex [&>*]:text-sm">
              <p>{{ item.price }} грн</p>
              <span class="mx-2">•</span>
              <p>{{ item.type?.name || item.type }}</p>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else><p class="text-center text-xl">Немає результатів</p></div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useSearchStore } from '../../stores/search'
import { useProductStore } from '../../stores/product'
import { useModalStore } from '../../stores/modal'
export default {
  computed: {
    ...mapWritableState(useSearchStore, ['results', 'hasResults'])
  },
  methods: {
    ...mapActions(useProductStore, { showProduct: 'viewProduct' }),
    ...mapActions(useModalStore, ['hideModals']),
    async viewProduct(key) {
      this.hideModals()
      await this.showProduct(key)
    }
  }
}
</script>
