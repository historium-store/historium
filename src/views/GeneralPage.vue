<template>
  <!-- <the-carousel /> -->
  <the-special-section name="novelties" title="Новинки"></the-special-section>
  <the-special-section name="recomendations" title="Рекомендації"></the-special-section>
  <product-showcase-view></product-showcase-view>
</template>
<script>
import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
import TheSpecialSection from '../components/product/TheSpecialSection.vue'
// import TheCarousel from '../components/layout/TheCarousel.vue'
export default {
  components: { ProductShowcaseView, TheSpecialSection }
}
</script>
