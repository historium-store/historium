<template>
  <div
    class="absolute rounded-2xl bg-background_light mt-1 z-40"
    :style="{ width: `${searchWidth}px` }"
  >
    <ul v-if="hasResults">
      <li
        v-for="item in results.length > 5 ? results.slice(0, 5) : results"
        :key="item._id"
        class="py-1"
      >
        <div class="flex m-2 items-center">
          <img
            class="h-20 rounded-md hover:cursor-pointer"
            :src="item.image"
            @click="viewProduct(item.key, item.type.key)"
          />
          <div class="product-details pl-4">
            <p @click="viewProduct(item.key, item.type.key)" class="hover:cursor-pointer">
              {{ item.name }}
            </p>
            <p class="text-sm">{{ item.creators[0] }}</p>
            <span class="inline-flex [&>*]:text-sm">
              <p>{{ item.price }} грн</p>
              <span class="mx-2">•</span>
              <p>{{ item.type?.name || item.type }}</p>
            </span>
          </div>
        </div>
      </li>
    </ul>
    <div class="flex h-24 items-center" v-else>
      <p class="mx-auto text-xl">Немає результатів</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useSearchStore } from '../../stores/search'
import { useProductStore } from '../../stores/product'
import { useModalStore } from '../../stores/modal'

export default {
  props: ['name'],
  data: () => {
    return {
      searchWidth: 0
    }
  },
  mounted() {
    this.searchWidth = document.getElementById('search-block-' + this.name).clientWidth - 90
    window.addEventListener('resize', () => {
      this.searchWidth = document.getElementById('search-block-' + this.name).clientWidth - 90
    })
  },
  computed: {
    ...mapWritableState(useSearchStore, ['results', 'hasResults', 'searchInput'])
  },
  methods: {
    ...mapActions(useProductStore, { showProduct: 'viewProduct' }),
    ...mapActions(useModalStore, ['hideModals']),
    ...mapActions(useSearchStore, ['closeSearch']),
    async viewProduct(key, type) {
      // this.hideModals()
      this.searchInput = ''
      this.closeSearch()
      await this.showProduct(key, type)
    }
  }
}
</script>
