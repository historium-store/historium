<template>
  <div v-if="wishlistItems" class="h-screen">
    <special-section
      name="wishlist"
      title="Бажані"
      :items="wishlistItems"
    />
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
import SpecialSection from '../../components/layout/sections/SpecialSection.vue'
export default {
  data: () => {
    return {
      wishlistItems: []
    }
  },
  async mounted() {
    for (const id of this.user.wishlist) {
      this.wishlistItems.push(await this.getAbstractProductById(id))
    }
  },
  methods: {
    ...mapActions(useProductStore, ['getAbstractProductById'])
  },
  computed: {
    ...mapWritableState(useUserStore, ['user'])
  },
  components: {
    SpecialSection
  }
}
</script>

<style></style>
