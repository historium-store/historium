<template>
  <!-- <div v-if="sectionProducts">{{ sectionProducts }}</div> -->
  <div v-if="isLoaded" class="">
    <breadcrumb v-if="sections" class="m-2">
      <breadcrumb-item class="hover:cursor-pointer" home @click="goto('/')">
        Головна
      </breadcrumb-item>
      <breadcrumb-item
        v-for="part in sectionId"
        :key="part"
        class="hover:cursor-pointer"
        @click="goto('/section/' + sectionId.slice(0, sectionId.indexOf(part) + 1).join('/'))"
      >
        {{ getSectionByKey(part)?.name }}
      </breadcrumb-item>
    </breadcrumb>
    <div v-if="currentSections?.sections?.length">
      <div
        class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-6 gap-5 mx-auto p-6"
      >
        <section-card
          v-for="section in currentSections.sections"
          :key="section"
          :name="section.name"
          @click="goto(`/section/${sectionId.join('/')}/${section.key}`)"
        />
      </div>
    </div>
    <ProductShowcase :products="sectionProducts" :filters="false" />
  </div>
  <div v-else class="flex">
    <pulse-loader class="mx-auto mt-6" />
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcase from '../../components/product/ProductShowcase.vue'
import SectionCard from '../../components/section/SectionCard.vue'
import { useProductStore } from '../../stores/product'
import { useSectionStore } from '../../stores/section'
export default {
  components: { ProductShowcase, Breadcrumb, BreadcrumbItem, SectionCard },
  props: ['sectionId'],
  data() {
    return { isLoaded: false }
  },
  computed: {
    ...mapWritableState(useSectionStore, ['sections', 'sectionProducts', 'currentSections']),
    ...mapWritableState(useProductStore, ['products'])
  },
  watch: {
    sectionId: async function () {
      await this.loadPage()
    }
  },
  async mounted() {
    await this.loadPage()
  },
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

      // await this.loadSectionNames()
      this.currentSections = this.getSectionByKey(this.sections, sectionKey)
      await this.loadSectionProducts()
      this.isLoaded = true
    },
    async goto(path) {
      await this.$router.push({ path })
    }
  }
}
</script>

<style></style>
