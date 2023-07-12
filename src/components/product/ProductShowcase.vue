<template>
  <div v-if="products" class="min-h-screen m-2 flex">
    <aside
      class="w-0 xl:w-64 transition-transform invisible xl:visible xl:transform-none mr-2 rounded-2xl bg-background_light"
    >
      <filters v-if="filters" />
    </aside>
    <div class="w-full rounded-2xl bg-background_light">
      <div class="m-2 mb-0 rounded-t-2xl bg-background_light">
        <p class="p-3 font-rubik text-lg">
          {{ goodsQuantityLabel }}
        </p>
        <div class="p-3 pt-0 inline-flex space-x-2">
          <div :class="filterLabelStyle" @click="openSidebar('filters')">
            <p>Усі фільтри</p>
          </div>
          <!-- <div :class="filterLabelStyle">
            <p>Тип книги</p>
          </div>
          <div :class="filterLabelStyle">
            <p>Видавництво</p>
          </div>
          <div :class="filterLabelStyle">
            <p>Мова</p>
          </div>
          <div :class="filterLabelStyle">
            <p>Автори</p>
          </div>
          <div :class="filterLabelStyle">
            <p>Ціна</p>
          </div> -->
        </div>
      </div>
      <div
        class="m-2 mt-0 min-h-[500px] rounded-2xl grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 p-6"
      >
        <product-card
          v-for="good in products"
          :key="good.key"
          :good="good"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import Filters from '../../components/filter/Filters.vue'
import ProductCard from '../../components/product/ProductCard.vue'
import { useProductStore } from '../../stores/product'
import { useSidebarStore } from '../../stores/sidebar'
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
    },
    filterLabelStyle() {
      return 'w-fit p-3 py-1.5 font-rubik text-md bg-turquoise rounded-full hover:cursor-pointer'
    }
  },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct']),
    ...mapActions(useSidebarStore, ['openSidebar'])
  }
}
</script>
