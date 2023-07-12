<template>
  <product-showcase :products="products" :filters="true" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import ProductShowcase from '../../components/product/ProductShowcase.vue'
export default {
  props: ['type'],

  async mounted() {
    await this.loadProducts(this.type)
  },
  components: { ProductShowcase },
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  methods: {
    ...mapActions(useProductStore, ['loadProducts'])
  }
}
</script>

<style></style>
