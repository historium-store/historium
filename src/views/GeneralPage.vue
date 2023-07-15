<template>
  <div class="xl:w-3/4 mx-auto">
    <carousel />
    <special-section class="mx-6" name="novelties" title="Новинки" :allow-show-more="true" />
    <special-section
      class="mx-6"
      name="recomendations"
      title="Рекомендації"
      :allow-show-more="true"
    />
  </div>
</template>
<script>
import Carousel from '../components/layout/sections/Carousel.vue'
import SpecialSection from '../components/layout/sections/SpecialSection.vue'
export default {
  components: { SpecialSection, Carousel }
}
</script>
