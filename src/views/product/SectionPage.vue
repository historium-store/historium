<template>
  <div v-if="isLoaded">
    <div v-if="currentSection?.sections?.length">
      <div
        class="grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-6 gap-5 mx-auto p-3"
      >
        <section-card
          v-for="section in currentSection.sections"
          :key="section"
          :name="section.name"
          @click="goto(`/section/${sectionId.join('/')}/${section.key}`)"
        />
      </div>
    </div>
    <breadcrumb v-if="sectionsTree" class="m-6">
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
    <product-showcase :products="sectionProducts" :filters="false" />
  </div>
  <div v-else class="flex">
    <pulse-loader class="mx-auto mt-6" />
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
import { mapActions, mapWritableState } from 'pinia'
import ProductShowcase from '../../components/product/ProductShowcase.vue'
import SectionCard from '../../components/sections/SectionCard.vue'
import { useProductStore } from '../../stores/product'
import { useSectionStore } from '../../stores/section'
export default {
  components: { ProductShowcase, Breadcrumb, BreadcrumbItem, SectionCard },
  props: ['sectionId'],
  data() {
    return { isLoaded: false }
  },
  computed: {
    ...mapWritableState(useSectionStore, [
      'sectionsTree',
      'sectionProducts',
      'currentSection',
      'sectionKey'
    ])
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
      'back'
    ]),
    async loadPage() {
      this.isLoaded = false
      if (this.sectionId.length) {
        this.sectionKey = this.sectionId.at(-1)
      } else this.sectionKey = this.sectionId
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
