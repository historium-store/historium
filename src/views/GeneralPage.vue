<template>
  <the-special-section name="novelties" title="Новинки"></the-special-section>
  <the-special-section name="recomendations" title="Рекомендації"></the-special-section>
  <product-showcase-view></product-showcase-view>
</template>
<script>
import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
import TheSpecialSection from '../components/product/TheSpecialSection.vue'
export default {
  components: { ProductShowcaseView, TheSpecialSection },
  methods: {},
  computed: {}
}
</script>
