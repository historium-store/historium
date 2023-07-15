<template>
  <product-showcase class="my-6" :products="products" :filters="true" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcase from '../../components/product/ProductShowcase.vue'
import { useFilterStore } from '../../stores/filter'
import { useProductStore } from '../../stores/product'
export default {
  components: { ProductShowcase },
  props: ['type'],
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  watch: {
    type: async function () {
      await this.loadProducts(this.type)
      await this.clearFilters(this.type)
    }
  },
  async mounted() {
    await this.loadProducts(this.type)
    await this.clearFilters(this.type)
  },
  methods: {
    ...mapActions(useProductStore, ['loadProducts']),
    ...mapActions(useFilterStore, ['clearFilters'])
  }
}
</script>

<style></style>
