<template>
  <div class="absolute rounded-2xl bg-whiteblue mt-1 z-[45]" :style="{ width: `${searchWidth}px` }">
    <ul v-if="hasResults">
      <li
        v-for="item in hasMoreResults ? results.slice(0, 5) : results"
        :key="item._id"
        class="py-1 hover:cursor-pointer"
        @click="viewProduct(item.key, item.type.key)"
      >
        <div class="flex m-2 items-center">
          <img class="h-20 rounded-md" :src="item.image" />
          <div class="product-details pl-4">
            <p class="text-deepgreen">
              {{ item.name }}
            </p>
            <p class="text-sm text-turquoise">
              {{ item.creators[0] }}
            </p>
            <span class="inline-flex [&>*]:text-sm text-turquoise">
              <p>{{ item.price }} грн</p>
              <span class="mx-2">•</span>
              <p>{{ item.type?.name || item.type }}</p>
            </span>
          </div>
        </div>
        <hr class="border-[1.5px] rounded-full border-lightturquoise mx-2" />
      </li>
      <div v-if="hasMoreResults" class="px-5 py-1.5">
        <Button
          class="w-full py-1.5 border hover:bg-lightturquoise bg-turquoise rounded-full"
          @click="showMoreResults"
        >
          <span class="ml-2 text-lg">Показати більше результатів</span>
        </Button>
      </div>
    </ul>
    <div v-else class="flex h-24 items-center text-deepgreen">
      <p class="mx-auto text-xl">Немає результатів</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { useProductStore } from '../../stores/product'
import { useSearchStore } from '../../stores/search'

export default {
  props: ['name'],
  data: () => {
    return {
      searchWidth: 0
    }
  },
  computed: {
    ...mapWritableState(useSearchStore, ['results', 'hasResults', 'searchInput']),
    hasMoreResults() {
      return this.results.length > 5
    }
  },
  mounted() {
    const minusWidth = this.name === 'pc' ? 78 : 47
    this.searchWidth = document.getElementById('search-block-' + this.name).clientWidth - minusWidth
    window.addEventListener('resize', () => {
      this.closeSearch()
    })
  },

  methods: {
    ...mapActions(useProductStore, { showProduct: 'viewProduct' }),
    ...mapActions(useModalStore, ['hideModals']),
    ...mapActions(useSearchStore, ['closeSearch']),
    async viewProduct(key, type) {
      this.searchInput = ''
      this.closeSearch()
      await this.showProduct(key, type)
    },
    async showMoreResults() {
      await this.$router.push({ path: '/search', query: { q: this.searchInput } })
      this.searchInput = ''
      this.closeSearch()
    }
  }
}
</script>
