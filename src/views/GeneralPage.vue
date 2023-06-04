<template>
  <Suspense>
    <product-showcase-view></product-showcase-view>
  </Suspense>
</template>
<script>
import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
export default {
  components: { ProductShowcaseView },
  methods: {},
  computed: {}
}
</script>
