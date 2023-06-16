<template>
  <div class="block mt-6 m-2 md:m-6 border-[3px] rounded-3xl">
    <div class="flex justify-items-center">
      <span
        class="relative -mt-4 ms-8 bg-teal-600 min-w-[160px] border-[3px] rounded-3xl text-center text-[18px]"
        >{{ title }}</span
      >
    </div>
    <div
      class="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4 mx-auto p-3 md:p-6"
    >
      <the-product-card
        :good="good"
        :isAvailable="isAvailable(good)"
        v-for="good in homeSpecialSections?.[name]?.slice(0, sliceCount)"
        :key="good.key"
        @click="viewProduct(good.key)"
      ></the-product-card>
    </div>
    <span
      v-if="!isExtended"
      class="inline-flex items-center p-2 hover:cursor-pointer"
      @click="showMore"
    >
      <p class="ms-4">Показати ще</p>
      <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
    </span>
  </div>
</template>

<script>
import { useProductStore } from '../../stores/product'
import TheProductCard from './TheProductCard.vue'
import { mapActions, mapWritableState } from 'pinia'
export default {
  props: ['name', 'title'],
  data() {
    return {
      sliceCount: 4,
      isExtended: false
    }
  },
  async mounted() {
    const productStore = useProductStore()
    switch (this.name) {
      case 'novelties':
        await productStore.loadNovelties()
        break
      case 'recomendations':
        await productStore.loadRecomendations()
        break
    }
    return { productStore }
  },
  components: { TheProductCard },
  computed: {
    ...mapWritableState(useProductStore, ['homeSpecialSections'])
  },
  methods: {
    showMore() {
      this.sliceCount = this.homeSpecialSections[this?.name]?.length
      this.isExtended = true
    },
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  }
}
</script>
