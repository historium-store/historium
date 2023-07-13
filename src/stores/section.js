import { defineStore, mapActions } from 'pinia'
import router from '../router'
import { useApiStore } from './api'
import { useSidebarStore } from './sidebar'
export const useSectionStore = defineStore('section', {
  state: () => ({
    sections: [],
    currentSections: [],
    sectionProducts: [],
    params: []
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadSectionNames() {
      
      this.sections = await this.get(`section`)
      this.currentSections = this.sections
    },
    async loadSectionProducts() {
      console.log('>>> loadSectionProducts')
      // if (!this.currentSections) await this.loadSectionNames()
      console.log('get', this.currentSections.key)
      const data = await this.get(`section/${this.currentSections.key}/products`, false)
      this.sectionProducts = data.result
    },
    async back() {
      this.params.splice(-1, 1)
      if (this.params.length) {
        let pick = this.getSectionByKey(this.sections, this.params[0])
        for (let key of this.params.slice(1)) {
          pick = pick.sections.find((section) => section.key === key)
        }
        this.currentSections = pick.sections
      } else this.currentSections = this.sections
    },
    async showAll() {
      await router.push({ name: 'section', params: { sectionId: this.params } })
      this.params = []
      const sidebarStore = useSidebarStore()
      sidebarStore.closeSidebars()
    },
    async pickSection(key) {
      const pick = this.getSectionByKey(this.sections, key)
      this.params.push(key)
      if (pick?.sections?.length) {
        this.currentSections = pick.sections
      } else {
        await router.push({ name: 'section', params: { sectionId: this.params } })
        this.params = []
        const sidebarStore = useSidebarStore()
        sidebarStore.closeSidebars()
      }

      // await this.loadSectionProducts()
    },
    getSectionByKey(sections, key) {
      const res = sections.find((s) => s.key === key)
      if (res) {
        return res
      } else {
        return this.getSectionByKey(sections.sections, key)
      }
    }
  }
})
