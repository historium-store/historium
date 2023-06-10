<template>
  <div class="block">
    <div class="flex justify-items-center">
      <span class="bg-teal-700 mt-4 min-w-[160px] rounded-e-lg text-[20px] ps-8 p-2">{{
        title
      }}</span>
    </div>
    <div
      class="mt-4 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto p-6"
    >
      <the-product-card
        :good="good"
        :isAvailable="isAvailable(good)"
        v-for="good in homeSpecialSections?.[name]"
        :key="good.key"
        @click="viewProduct(good.key)"
      ></the-product-card>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../../stores/product'
import TheProductCard from './TheProductCard.vue'
import { mapActions, mapWritableState } from 'pinia'
export default {
  props: ['name', 'title'],
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
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  }
}
</script>

<style></style>
