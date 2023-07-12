<template>
  <!-- <carousel /> -->
  <special-section name="novelties" title="Новинки" :allowShowMore="true" />
  <special-section name="recomendations" title="Рекомендації" :allowShowMore="true" />
  <!-- <product-showcase-view></product-showcase-view> -->
</template>
<script>
// import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
import SpecialSection from '../components/layout/sections/SpecialSection.vue'
import Carousel from '../components/layout/sections/Carousel.vue'
export default {
  components: { SpecialSection, Carousel }
}
</script>
