import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import router from '../router'
export const useSectionStore = defineStore('section', {
  state: () => ({
    sections: undefined,
    currentSections: undefined,
    sectionProducts: undefined,
    // rootPath: '/section',
    params: []
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async recursiveGetAllProducts(sections) {
      for (let i of sections) {
        if (i.products) {
          this.sectionProducts = this.sectionProducts.concat(i.products)
        }
        if (i.sections) {
          this.recursiveGetAllProducts(i.sections)
        }
        console.log(this.sectionProducts)
      }
      // this.sectionProducts = [...new Set(this.sectionProducts)]
    },
    async loadSectionNames() {
      console.log('>>> loadSectionNames')

      const response = await this.get(`section`)
      this.sections = response.data
      this.currentSections = this.sections
    },
    async loadSectionProducts() {
      console.log('>>> loadSectionProducts')
      // if (!this.currentSection && section) {
      //   this.currentSection = section
      // }
      const response = await this.get(`section/${this.currentSection.key}/products`, false)
      console.log(response)
      this.sectionProducts = response.data.result
    },
    async back() {
      this.params.splice(-1, 1)
      if (this.params.length > 0) {
        let pick = this.getSectionByKey(this.params[0])
        for (let key of this.params.slice(1)) {
          // console.log(this.params)
          console.log(pick)
          console.log(key)
          pick = pick.sections.find((section) => section.key === key)
        }
        this.currentSections = pick.sections
      } else this.currentSections = this.sections
    },
    async showAll() {
      await router.push({ name: 'section', params: { sectionId: this.params } })
      this.params = []
    },
    async pickSection(key) {
      console.log(key)
      const pick = this.getSectionByKey(key)
      this.params.push(key)
      if (pick?.sections?.length) {
        this.currentSections = pick.sections
      } else {
        await router.push({ name: 'section', params: { sectionId: this.params } })
        this.params = []
      }
    },
    getSectionByKey(key) {
      return this.sections?.find((s) => s.key === key)
    }
  }
})