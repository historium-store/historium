<template>
  <div v-if="library.length" class="h-screen">
    <special-section class="mx-6" name="library" :items="library" />
  </div>
  <div v-else class="p-3 md:w-4/5 mx-auto my-6">
    <div class="flex bg-whiteblue rounded-2xl mt-6 bg-opacity-10 h-32 items-center">
      <p class="mx-auto">Бібліотека порожня</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import SpecialSection from '../../components/sections/SpecialSection.vue'
import { useUserStore } from '../../stores/user'
export default {
  components: {
    SpecialSection
  },
  data: () => {
    return {
      library: []
    }
  },
  async mounted() {
    this.library = await this.getLibrary()
  },

  methods: {
    ...mapActions(useUserStore, ['getLibrary'])
  }
}
</script>
