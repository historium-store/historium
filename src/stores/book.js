import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useFilterStore } from './filter'

export const useBookStore = defineStore('book', {
  state: () => ({
    books: undefined,
    book: undefined
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadBooks() {
      console.log('>>> loadBooks')
      const filterStore = useFilterStore()
      const response = await this.get('book', false, filterStore.getFiltersQuery())
      this.products = response.data.result
    },
    async loadBook(key) {
      console.log('>>> loadBook ' + key)

      const response = await this.get(`book/${key}`)
      this.book = response.data
    }
  }
})
