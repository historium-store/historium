<template>
  <div :id="name" class="my-12 border-[3px] rounded-3xl">
    <img class="absolute -mt-4 ms-24" src="../../../assets/star-1.png" alt="star" />
    <img class="absolute mt-[300px] -ms-[11px]" src="../../../assets/star-3.png" alt="star" />
    <img class="absolute mt-[20%] -ms-[8px]" src="../../../assets/star-1.png" alt="star" />
    <img class="absolute rotate-90 -mt-4 ms-[30%]" src="../../../assets/star-2.png" alt="star" />
    <img class="absolute rotate-90 -mt-4 ms-[50%]" src="../../../assets/star-2.png" alt="star" />
    <img
      class="absolute rotate-90 -mt-[13px] ms-[53%]"
      src="../../../assets/star-1.png"
      alt="star"
    />
    <img
      class="absolute mt-96 2xl:invisible me-5 z-20 right-0"
      src="../../../assets/star-1.png"
      alt="star"
    />
    <img
      class="absolute mt-28 2xl:invisible z-20 me-4 right-0"
      src="../../../assets/star-3.png"
      alt="star"
    />

    <div class="flex justify-items-center">
      <span
        v-if="title"
        class="relative -mt-4 ms-8 bg-turquoise min-w-[160px] border-[3px] rounded-3xl text-center text-[18px]"
        >{{ title }}</span
      >
      <select
        v-else
        id="library_type"
        v-model="selectedType"
        class="appearance-none relative -mt-4 ms-8 bg-turquoise min-w-[200px] border-[3px] rounded-3xl text-center text-[18px]"
        name="library_type"
        @change="changeType"
      >
        <option selected="selected" value="all">Всі</option>
        <option value="e-book">Електронна</option>
        <option value="audio">Аудіо</option>
      </select>
    </div>
    <div v-if="isLoaded">
      <div
        v-if="items"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4 mx-auto p-3 md:p-6"
      >
        <product-card
          v-for="good in selectedType === 'all' ? items : items.filter((item) => item.type)"
          :key="good.key"
          :good="good"
          @click="viewProduct(good.key, good.type.key)"
        />
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4 mx-auto p-3 md:p-6"
      >
        <product-card
          v-for="good in homeSpecialSections?.[name]?.slice(0, sliceCount)"
          :key="good.key"
          :good="good"
          @click="viewProduct(good.key, good.type.key)"
        />
      </div>
    </div>

    <div v-else class="flex my-12">
      <pulse-loader class="m-auto" />
    </div>
    <span
      v-if="!isExtended && allowShowMore"
      class="inline-flex items-center p-2 hover:cursor-pointer"
      @click="showMore"
    >
      <p class="ms-4">Показати ще</p>
      <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
    </span>

    <img
      class="absolute rotate-90 -mt-[13px] ms-[40%]"
      src="../../../assets/star-2.png"
      alt="star"
    />
    <img
      class="absolute rotate-90 -mt-[11px] ms-[20%]"
      src="../../../assets/star-1.png"
      alt="star"
    />
    <img
      class="absolute rotate-90 -mt-[18px] ms-[60%]"
      src="../../../assets/star-3.png"
      alt="star"
    />

    <img
      class="absolute rotate-90 -mt-[13px] ms-[40%]"
      src="../../../assets/star-2.png"
      alt="star"
    />
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
      isExtended: false,
      selectedType: 'all'
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
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct']),
    showMore() {
      this.isExtended = true
    }
  }
}
</script>
