<template>
  <!-- <div v-if="sectionProducts">{{ sectionProducts }}</div> -->
  <div v-if="isLoaded">
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
    <div
      v-if="sectionProducts"
      class="grid xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 mx-auto p-6"
    >
      <the-product-card
        v-for="product in sectionProducts"
        :key="product._id"
        :good="product"
        @click="viewProduct(product.key)"
      />
    </div>
    <div v-else>Not found</div>
  </div>
  <spinner v-else size="10" class="mx-auto mt-10" />
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useSectionStore } from '../../stores/section'
import TheProductCard from '../../components/product/TheProductCard.vue'
import { Breadcrumb, BreadcrumbItem, Spinner } from 'flowbite-vue'
import { useProductStore } from '../../stores/product'
export default {
  props: ['sectionId'],
  data() {
    return { isLoaded: false }
  },
  async mounted() {
    let sectionKey
    if (this.sectionId.length) {
      sectionKey = this.sectionId.at(-1)
    } else sectionKey = this.sectionId

    await this.loadSectionNames()
    this.currentSection = this.getSectionByKey(sectionKey)
    console.log(this.currentSection)
    await this.loadSectionProducts()
    this.isLoaded = true
  },
  components: { TheProductCard, Breadcrumb, BreadcrumbItem, Spinner },
  methods: {
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useSectionStore, [
      'loadSectionProducts',
      'loadSectionNames',
      'getSectionByKey',
      'getSectionNameByKey'
    ]),
    async goto(path) {
      // await this.$router.push({ path: '/', params: { key } })
      await this.$router.push({ path })
    }
  },
  computed: {
    ...mapWritableState(useSectionStore, ['sections', 'sectionProducts', 'currentSection'])
  }
}
</script>

<style></style>
