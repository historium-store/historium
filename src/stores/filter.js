import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useProductStore } from './product'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filters: undefined,
    activeFilters: {}
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadFilters() {
      const response = await this.get('book/filters')
      this.filters = response.data
      console.log(response.data)
    },
    async changeFilters(filterKey, values) {
      const productStore = useProductStore()
      this.activeFilters[filterKey.slice(0, -1)] = values
      await productStore.loadProducts()
    },
    getFiltersQuery() {
      // this.activeFilters = Object.entries(this.activeFilters)
      //   .filter((filter) => filter[1].length > 0)
      //   .map((filter) => filter)
      Object.keys(this.activeFilters).forEach(
        (k) => this.activeFilters[k].length == 0 && delete this.activeFilters[k]
      )
      const query = new URLSearchParams(this.activeFilters)
      console.log(query)
      return query
    }
  }
})
