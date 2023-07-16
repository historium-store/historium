import { defineStore, mapActions } from 'pinia'
import router from '../router'
import { useApiStore } from './api'
import { useSidebarStore } from './sidebar'
export const useSectionStore = defineStore('section', {
  state: () => ({
    sectionsTree: [],
    currentSection: {
      sections: []
    },
    sectionProducts: [],
    params: [],
    sectionKey: ''
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadSectionNames() {
      this.sectionsTree = (await this.get(`section/tree`))[0]
      this.currentSection = this.sectionsTree
    },
    async loadSectionProducts() {
      const data = await this.get(`section/${this.sectionKey}/products`, false)
      this.sectionProducts = data.result
      this.currentSection = this.getSectionByKey(this.sectionKey)
    },
    async back() {
      if (this.params.length) {
        let pick = this.getSectionByKey(this.params.at(-1))
        this.currentSection = pick
      } else {
        this.currentSection = this.sectionsTree
      }
    },
    async showAll() {
      await router.push({ name: 'section', params: { sectionId: this.params } })
      this.params = []
      const sidebarStore = useSidebarStore()
      sidebarStore.closeSidebars()
    },
    async pickSection(key) {
      const pick = this.getSectionByKey(key)

      this.params.push(key)
      this.sectionKey = pick.key
      if (pick?.sections?.length) {
        this.currentSection = pick
      } else {
        await router.push({ name: 'section', params: { sectionId: this.params } })
        this.params = []
        useSidebarStore().closeSidebars()
      }
    },
    getSectionByKey(key, sections = [this.sectionsTree]) {
      let res = sections.find((s) => s.key === key)
      if (res) return res
      else {
        for (let section of sections) {
          if (section?.sections?.length) {
            res = this.getSectionByKey(key, section.sections)
            if (res) return res
          }
        }
      }
    }
  }
})
