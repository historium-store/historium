<template>
  <product-showcase-view :products="books"></product-showcase-view>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcaseView from '../product/ProductShowcaseView.vue'
import { useSearchStore } from '../../stores/search'
import { useBookStore } from '../../stores/book'

export default {
  async mounted() {
    await this.loadBooks()
  },
  components: { ProductShowcaseView },
  computed: {
    // ...mapWritableState(useSearchStore, ['results'])
    ...mapWritableState(useBookStore, ['books'])
  },
  methods: {
    ...mapActions(useBookStore, ['loadBooks'])
  }
}
</script>

<style></style>
