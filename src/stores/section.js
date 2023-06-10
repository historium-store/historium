import { defineStore } from 'pinia'
import { useApiStore } from './api'
export const useSectionStore = defineStore('section', {
  state: () => ({
    api: useApiStore(),
    sections: undefined,
    currentSection: undefined,
    sectionProducts: undefined
  }),
  actions: {
    async loadSectionNames() {
      console.log('>>> loadSectionNames')

      const response = await this.api.get(`section`)
      this.sections = response.data
    },
    async loadSectionProducts(section) {
      if (!this.currentSection && section) {
        this.currentSection = section
      }
      console.log('>>> loadSectionProducts')
      const response = await this.api.get(`section/${this.currentSection.key}`, false, {
        withProducts: true
      })
      this.sectionProducts = response.data.products
    },
    getSectionByKey(key) {
      return this.sections?.find((s) => s.key === key)
    }
  }
})
