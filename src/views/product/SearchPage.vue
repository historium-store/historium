<template>
  <product-showcase-view :products="products" :filters="true" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import ProductShowcaseView from './ProductShowcase.vue'

export default {
  components: { ProductShowcaseView },
  computed: {
    ...mapWritableState(useProductStore, ['products'])
    // ...mapWritableState(useSearchStore, ['results'])
  },
  async mounted() {
    await this.loadProducts()
  },
  methods: {
    ...mapActions(useProductStore, ['loadProducts'])
  }
}
</script>

<style></style>
