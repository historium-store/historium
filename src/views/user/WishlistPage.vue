<template>
  <div v-if="wishlistItems" class="h-screen">
    <special-section name="wishlist" title="Бажані" :items="wishlistItems" />
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
