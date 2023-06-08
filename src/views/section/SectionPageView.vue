<template>
  <!-- <div v-if="sectionProducts">{{ sectionProducts }}</div> -->
  <breadcrumb class="m-2" v-if="sections">
    <breadcrumb-item home>Головна</breadcrumb-item>
    <breadcrumb-item
      class="hover:cursor-pointer"
      @click="goto(sectionId.slice(0, sectionId.indexOf(part) + 1).join('/'))"
      v-for="part in sectionId"
      :key="part"
      >{{ getSectionByKey(part)?.name }}</breadcrumb-item
    >
  </breadcrumb>
  <div
    class="xl:ml-64 grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mx-auto p-6"
  >
    <the-product-card v-for="product in sectionProducts" :key="product._id" :good="product" />
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useSectionStore } from '../../stores/section'
import TheProductCard from '../../components/product/TheProductCard.vue'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
export default {
  props: ['sectionId'],
  async mounted() {
    let sectionKey
    if (this.sectionId.length) {
      sectionKey = this.sectionId.at(-1)
    } else sectionKey = this.sectionId

    await this.loadSectionNames()
    this.currentSection = this.getSectionByKey(sectionKey)
    await this.loadSectionProducts()
  },
  components: { TheProductCard, Breadcrumb, BreadcrumbItem },
  methods: {
    ...mapActions(useSectionStore, [
      'loadSectionProducts',
      'loadSectionNames',
      'getSectionByKey',
      'getSectionNameByKey'
    ]),
    async goto(path) {
      await this.$router.push(`/section/${path}`)
    }
  },
  computed: {
    ...mapWritableState(useSectionStore, ['sections', 'sectionProducts', 'currentSection'])
  }
}
</script>

<style></style>
