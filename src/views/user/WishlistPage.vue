<template>
  <p class="text-center text-2xl my-6">Бажані товари</p>

  <div v-if="wishlistItems.length" class="h-screen">
    <special-section name="wishlist" title="Бажані" :items="wishlistItems" />
  </div>
  <div v-else class="p-3 md:w-4/5 mx-auto my-6">
    <div class="flex bg-whiteblue rounded-2xl mt-6 bg-opacity-10 h-32 items-center">
      <p class="mx-auto">Бажаних немає</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import SpecialSection from '../../components/layout/sections/SpecialSection.vue'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
export default {
  components: {
    SpecialSection
  },
  data: () => {
    return {
      wishlistItems: []
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user'])
  },
  async mounted() {
    for (const id of this.user.wishlist) {
      this.wishlistItems.push(await this.getAbstractProductById(id))
    }
  },
  methods: {
    ...mapActions(useProductStore, ['getAbstractProductById'])
  }
}
</script>

<style></style>
