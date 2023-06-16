<template>
  <!-- <the-filters /> -->
  <div
    class="grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mx-auto p-6"
  >
    <the-product-card
      :good="good"
      :isAvailable="isAvailable(good)"
      v-for="good in products"
      :key="good.key"
      @click="viewProduct(good.key)"
    ></the-product-card>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { mapActions } from 'pinia'
import TheProductCard from '../../components/product/TheProductCard.vue'
// import { useSectionStore } from '../../stores/section'
// import TheFilters from '../../components/filter/TheFilters.vue'
export default {
  async mounted() {
    // await this.loadSectionNames()
    await this.loadProducts()
  },
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  components: { TheProductCard },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct', 'loadProducts'])
  }
}
</script>
