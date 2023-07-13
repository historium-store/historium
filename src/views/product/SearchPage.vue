<template>
  <product-showcase-view class="my-6" :products="results" :filters="true" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcaseView from '../../components/product/ProductShowcase.vue'
import { useSearchStore } from '../../stores/search'

export default {
  components: { ProductShowcaseView },
  computed: {
    // ...mapWritableState(useProductStore, ['products'])
    ...mapWritableState(useSearchStore, ['results', 'searchInput'])
  },
  async mounted() {
    // await this.loadProducts()
    const search = new URLSearchParams(window.location.search).get('q')
    await this.search(search)
  },
  methods: {
    // ...mapActions(useProductStore, ['loadProducts'])
    ...mapActions(useSearchStore, ['search'])
  }
}
</script>

<style></style>
