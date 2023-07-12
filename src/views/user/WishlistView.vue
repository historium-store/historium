<template>
  <div v-if="wishlistItems" class="h-screen">
    <the-special-section
      name="wishlist"
      title="Бажані"
      :items="wishlistItems"
    ></the-special-section>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
import TheSpecialSection from '../../components/product/TheSpecialSection.vue'
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
    TheSpecialSection
  }
}
</script>

<style></style>
