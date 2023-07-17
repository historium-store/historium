<template>
  <p class="text-center text-2xl my-6">Список очікування</p>
  <div v-if="waitlistItems.length">
    <special-section class="mx-6" name="waitlist" title="В очікуванні" :items="waitlistItems" />
  </div>
  <div v-else class="p-3 md:w-4/5 mx-auto my-6">
    <div class="flex bg-whiteblue rounded-2xl mt-6 bg-opacity-10 h-32 items-center">
      <p class="mx-auto">Очікуванних немає</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import SpecialSection from '../../components/sections/SpecialSection.vue'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
export default {
  components: {
    SpecialSection
  },
  data: () => {
    return {
      waitlistItems: []
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user'])
  },
  async mounted() {
    for (const id of this.user.waitlist) {
      this.waitlistItems.push(await this.getAbstractProductById(id))
    }
  },
  methods: {
    ...mapActions(useProductStore, ['getAbstractProductById'])
  }
}
</script>

<style></style>
