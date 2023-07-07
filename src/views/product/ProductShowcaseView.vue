<!-- <template>
  <the-filters />
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
export default {
  async mounted() {
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
</script> -->

<template>
  <div class="">
    <the-filters />
    <div
      v-if="products"
      class="xl:ml-64 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mx-auto p-6"
    >
      <the-product-card
        :good="good"
        :isAvailable="isAvailable(good)"
        v-for="good in products"
        :key="good.key"
        @click="viewProduct(good.key, good.type.key)"
      ></the-product-card>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../../stores/product'
import { mapActions } from 'pinia'
import TheProductCard from '../../components/product/TheProductCard.vue'
import TheFilters from '../../components/filter/TheFilters.vue'
export default {
  props: ['products'],
  components: { TheProductCard, TheFilters },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  }
}
</script>
