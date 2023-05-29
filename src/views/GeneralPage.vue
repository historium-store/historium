<template>
  <div class="">
    <h1
      class="text-xl my-4 text-center font-sans leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
    >
      General Page
    </h1>
  </div>
  <the-carousel></the-carousel>
  <product-showcase-view></product-showcase-view>
  <div v-for="i in 10" :key="i">
    <div class="bg-primary-1000 my-2">
      <p class="h-40 pt-4 pl-4">{{ i }}</p>
    </div>
  </div>
</template>
<script>
import TheCarousel from '../components/layout/TheCarousel.vue'
import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
import { useProductStore } from '../stores/product'

export default {
  components: { TheCarousel, ProductShowcaseView },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  methods: {},
  computed: {}
}
</script>
