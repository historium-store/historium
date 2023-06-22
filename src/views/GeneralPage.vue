<template>
  <the-carousel />
  <the-special-section name="novelties" title="Новинки" :allowShowMore="true"></the-special-section>
  <the-special-section
    name="recomendations"
    title="Рекомендації"
    :allowShowMore="true"
  ></the-special-section>
  <product-showcase-view></product-showcase-view>
</template>
<script>
import ProductShowcaseView from '../views/product/ProductShowcaseView.vue'
import TheSpecialSection from '../components/product/TheSpecialSection.vue'
import TheCarousel from '../components/layout/TheCarousel.vue'
export default {
  components: { ProductShowcaseView, TheSpecialSection, TheCarousel }
}
</script>
