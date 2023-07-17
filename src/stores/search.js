import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useModalStore } from './modal'
const overflow = document.createElement('div')

overflow.className = 'bg-gray-900 bg-opacity-70 dark:bg-opacity-80 fixed inset-0 '

export const useSearchStore = defineStore('seacrh', {
  state: () => ({ searchInput: '', results: undefined }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    ...mapActions(useModalStore, ['showModal']),
    async search(q = this.searchInput) {
      if (q.length > 2) {
        const data = await this.get('search', null, { q })
        this.results = data.result
      }
    },
    openSearch() {
      if (!document.body.classList.contains('overflow-hidden')) {
        document.body.classList.add('overflow-hidden')
        overflow.onclick = this.closeSearch
        document.body.appendChild(overflow)
      }
    },
    closeSearch() {
      if (document.body.classList.contains('overflow-hidden')) {
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
      this.searchInput = ''
    }
  },
  getters: {
    hasResults() {
      return this.results?.length > 0
    }
  }
})
