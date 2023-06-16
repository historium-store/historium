import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useModalStore } from './modal'

export const useSearchStore = defineStore('seacrh', {
  state: () => ({ searchInput: '', results: undefined }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    ...mapActions(useModalStore, ['showModal']),
    async search() {
      const response = await this.get('search', null, { q: this.searchInput })
      this.showModal('search')
      this.results = response.data.result
      this.searchInput = ''
    }
  },
  getters: {
    hasResults() {
      return this.results?.length > 0
    }
  }
})
