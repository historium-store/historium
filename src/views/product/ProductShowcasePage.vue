<template>
  <product-showcase class="mt-6" :products="products" :filters="true" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcase from '../../components/product/ProductShowcase.vue'
import { useProductStore } from '../../stores/product'
export default {
  components: { ProductShowcase },
  props: ['type'],
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  async mounted() {
    await this.loadProducts(this.type)
  },
  methods: {
    ...mapActions(useProductStore, ['loadProducts'])
  }
}
</script>

<style></style>
