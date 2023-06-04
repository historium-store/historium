<template>
  <div
    class="xl:ml-64 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto p-6"
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
import router from '../../router'
import TheProductCard from '../../components/product/TheProductCard.vue'
export default {
  setup() {
    const productStore = useProductStore()
    return { productStore }
    // console.log(productStore.sections)
  },
  async mounted() {
    await this.productStore.loadSections()
    await this.productStore.loadProducts()
  },
  computed: {
    ...mapWritableState(useProductStore, ['products'])
  },
  components: { TheProductCard },
  methods: {
    isAvailable(good) {
      return good.quantity > 0
    },
    async viewProduct(key) {
      await router.push(`/${key}`)
    }
  }
}
</script>
