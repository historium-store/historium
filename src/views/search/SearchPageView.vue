<template>
  <product-showcase-view :products="products" :filters="true"></product-showcase-view>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcaseView from '../product/ProductShowcaseView.vue'
import { useSearchStore } from '../../stores/search'
import { useProductStore } from '../../stores/product'

export default {
  async mounted() {
    await this.loadProducts()
  },
  components: { ProductShowcaseView },
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  methods: {
    ...mapActions(useProductStore, ['loadProducts'])
  }
}
</script>

<style></style>
