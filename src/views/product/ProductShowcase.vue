<template>
  <div v-if="products" class="min-h-screen m-2">
    <filters v-if="filters" />
    <div :class="(filters ? 'xl:ml-64' : '') + ' rounded-t-2xl bg-background_light'">
      <p class="p-3 font-rubik text-lg">{{ goodsQuantityLabel }}</p>
    </div>
    <div
      :class="
        (filters ? 'xl:ml-64' : '') +
        ' grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 mx-auto p-6 rounded-b-2xl bg-background_light'
      "
    >
      <product-card v-for="good in products" :key="good.key" :good="good"></product-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import Filters from '../../components/filter/Filters.vue'
import ProductCard from '../../components/product/ProductCard.vue'
import { useProductStore } from '../../stores/product'
export default {
  components: { ProductCard, Filters },
  props: ['products', 'filters'],
  computed: {
    goodsQuantityLabel() {
      const goodsQuantityLabel =
        this.products.length % 10 === 1 && this.products.length !== 11
          ? 'товар'
          : this.products.length < 10 &&
            1 < this.products.length % 10 &&
            this.products.length % 10 < 5
          ? 'товари'
          : 'товарів'

      return `${this.products.length} ${goodsQuantityLabel}`
    }
  },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  }
}
</script>
