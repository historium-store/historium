<template>
  <div v-if="products" class="min-h-screen m-2 flex">
    <aside
      v-if="filters"
      class="w-0 xl:w-64 transition-transform invisible xl:visible xl:transform-none xl:mr-4 rounded-2xl bg-lightturquoise bg-opacity-50 xl:border-[3px]"
    >
      <filters />
    </aside>
    <div class="w-full rounded-2xl border-[3px]">
      <img class="absolute -mt-4 ms-24" src="../../assets/star-1.png" alt="star" />
      <img class="absolute mt-[300px] -ms-[11px]" src="../../assets/star-3.png" alt="star" />
      <img class="absolute mt-[20%] -ms-[8px]" src="../../assets/star-1.png" alt="star" />
      <img class="absolute rotate-90 -mt-4 ms-[30%]" src="../../assets/star-2.png" alt="star" />
      <img class="absolute mt-96 me-1 z-20 right-0" src="../../assets/star-1.png" alt="star" />
      <img class="absolute mt-28 z-20 right-0" src="../../assets/star-3.png" alt="star" />
      <img
        class="absolute mt-[600px] me-[1px] z-20 right-0"
        src="../../assets/star-2.png"
        alt="star"
      />
      <div class="m-2 mb-0 rounded-t-2xl">
        <div class="flex justify-items-center">
          <span
            class="relative tracking-wide -mt-6 ms-6 bg-turquoise min-w-[120px] border-[3px] rounded-3xl text-center text-[18px]"
          >
            {{ goodsQuantityLabel }}
          </span>
          <span
            v-if="filters"
            class="relative tracking-wider flex -mt-6 ms-6 bg-turquoise min-w-[120px] border-[3px] rounded-3xl text-[18px] hover:cursor-pointer"
            @click="openSidebar('filters')"
          >
            <div class="mx-auto space-x-2 flex items-center">
              <font-awesome-icon size="sm" :icon="['fas', 'filter']" style="color: #ffffff" />
              <p>Фільтри</p>
            </div>
          </span>
        </div>
      </div>
      <div class="h-full">
        <div
          class="m-2 mt-0 rounded-2xl grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 p-6"
        >
          <product-card v-for="good in products" :key="good.key" :good="good" />
        </div>
      </div>
      <img
        class="absolute rotate-90 -mt-[32px] ms-[40%]"
        src="../../assets/star-2.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 -mt-[28px] ms-[20%]"
        src="../../assets/star-1.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 -mt-[36px] right-0 me-16"
        src="../../assets/star-3.png"
        alt="star"
      />
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
      return 'w-fit p-3 py-1.5 font-rubik text-base bg-turquoise rounded-full hover:cursor-pointer'
    }
  },
  methods: {
    ...mapActions(useProductStore, ['isAvailable', 'viewProduct']),
    ...mapActions(useSidebarStore, ['openSidebar'])
  }
}
</script>
