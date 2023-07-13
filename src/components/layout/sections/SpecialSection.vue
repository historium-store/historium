<template>
  <div v-if="isLoaded" :id="name" class="my-12 border-[3px] rounded-3xl">
    <div class="flex justify-items-center">
      <span
        class="relative -mt-4 ms-8 bg-turquoise min-w-[160px] border-[3px] rounded-3xl text-center text-[18px]"
        >{{ title }}</span
      >
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4 mx-auto p-3 md:p-6"
    >
      <product-card
        v-for="good in items ? items : homeSpecialSections?.[name]?.slice(0, sliceCount)"
        :key="good.key"
        :good="good"
        @click="viewProduct(good.key, good.type.key)"
      />
    </div>
    <span
      v-if="!isExtended && allowShowMore"
      class="inline-flex items-center p-2 hover:cursor-pointer"
      @click="showMore"
    >
      <p class="ms-4">Показати ще</p>
      <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
    </span>
  </div>
  <div v-else class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-40">
    <div class="h-screen w-full flex">
      <pulse-loader class="m-auto" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../../stores/product'
import ProductCard from '../../product/ProductCard.vue'

const breakpoints = {
  2: 768,
  4: 1024,
  5: 1536
}

export default {
  components: { ProductCard },
  props: ['name', 'title', 'allowShowMore', 'items'],
  data() {
    return {
      isLoaded: false,
      windowWidth: window.innerWidth,
      isExtended: false
    }
  },
  computed: {
    ...mapWritableState(useProductStore, ['homeSpecialSections']),
    sliceCount() {
      if (this.isExtended) return this.homeSpecialSections[this?.name]?.length
      for (let [i, v] of Object.entries(breakpoints)) {
        if (this.windowWidth < v) {
          return i
        }
      }
      return 6
    }
  },
  async mounted() {
    this.isLoaded = false
    const productStore = useProductStore()
    if (!this.items) {
      switch (this.name) {
        case 'novelties':
          await productStore.loadNovelties()
          break
        case 'recomendations':
          await productStore.loadRecomendations()
          break
        case 'history':
          await productStore.loadHistory()
          break
      }
    }
    this.isLoaded = true
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    return { productStore }
  },

  methods: {
    showMore() {
      this.isExtended = true
    },
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  }
}
</script>
