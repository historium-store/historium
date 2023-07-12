<template>
  <!-- <div v-if="sectionProducts">{{ sectionProducts }}</div> -->
  <div v-if="isLoaded" class="mr-12">
    <breadcrumb class="m-2" v-if="sections">
      <breadcrumb-item class="hover:cursor-pointer" @click="goto('/')" home
        >Головна</breadcrumb-item
      >
      <breadcrumb-item
        class="hover:cursor-pointer"
        @click="goto('/section/' + sectionId.slice(0, sectionId.indexOf(part) + 1).join('/'))"
        v-for="part in sectionId"
        :key="part"
        >{{ getSectionByKey(part)?.name }}</breadcrumb-item
      >
    </breadcrumb>
    <div v-if="currentSections?.sections?.length > 0">
      <div
        class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 mx-auto p-6"
      >
        <section-card
          v-for="section in currentSections.sections"
          :key="section"
          :name="section.name"
          @click="goto(`/section/${sectionId.join('/')}/${section.key}`)"
        ></section-card>
      </div>
    </div>

    <ProductShowcaseView :products="sectionProducts" :filters="false" />
  </div>
  <div v-else class="flex"><pulse-loader class="mx-auto mt-6"></pulse-loader></div>
</template>

<script>
import ProductShowcaseView from './ProductShowcase.vue'
import { mapWritableState, mapActions } from 'pinia'
import { useSectionStore } from '../../stores/section'
// import TheProductCard from '../../components/product/TheProductCard.vue'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
import { useProductStore } from '../../stores/product'
import SectionCard from '../../components/section/SectionCard.vue'
export default {
  props: ['sectionId'],
  data() {
    return { isLoaded: false }
  },
  async mounted() {
    await this.loadPage()
  },
  components: { ProductShowcaseView, Breadcrumb, BreadcrumbItem, SectionCard },
  methods: {
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useSectionStore, [
      'loadSectionProducts',
      'loadSectionNames',
      'getSectionByKey',
      'getSectionNameByKey'
    ]),
    async loadPage() {
      this.isLoaded = false
      let sectionKey
      if (this.sectionId.length) {
        sectionKey = this.sectionId.at(-1)
      } else sectionKey = this.sectionId

      await this.loadSectionNames()
      this.currentSections = this.getSectionByKey(sectionKey)
      await this.loadSectionProducts()
      this.isLoaded = true
    },
    async goto(path) {
      await this.$router.push({ path })
    }
  },
  watch: {
    sectionId: async function () {
      await this.loadPage()
    }
  },
  computed: {
    ...mapWritableState(useSectionStore, ['sections', 'sectionProducts', 'currentSections']),
    ...mapWritableState(useProductStore, ['products'])
  }
}
</script>

<style></style>
