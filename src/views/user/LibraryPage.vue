<template>
  <div v-if="false" class="h-screen">
    <special-section name="" title="" :items="[]" />
  </div>
  <div v-else class="p-3 md:w-4/5 mx-auto my-6">
    <div class="flex bg-whiteblue rounded-2xl mt-6 bg-opacity-10 h-32 items-center">
      <p class="mx-auto">Бібліотека порожня</p>
    </div>
  </div>
</template>

<script>
import SpecialSection from '../../components/layout/sections/SpecialSection.vue'
export default {
  components: {
    SpecialSection
  }
}
</script>
