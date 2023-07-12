<template>
  <div v-if="products" class="min-h-screen m-2">
    <the-filters v-if="filters" />
    <div :class="(filters ? 'xl:ml-64' : '') + ' rounded-t-2xl bg-background_light'">
      <p class="p-3 font-rubik text-lg">{{ goodsQuantityLabel }}</p>
      <!-- <hr class="border-[1.5px] mx-3 rounded-full" /> -->
    </div>
    <div
      :class="
        (filters ? 'xl:ml-64' : '') +
        ' grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 mx-auto p-6 rounded-b-2xl bg-background_light'
      "
    >
      <the-product-card
        :good="good"
        :isAvailable="isAvailable(good)"
        v-for="good in products"
        :key="good.key"
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
  props: ['products', 'filters'],
  components: { TheProductCard, TheFilters },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct'])
  },
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
  }
}
</script>
