import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useProductStore } from './product'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filters: undefined,
    activeFilters: {},
    isChecked: {}
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
      this.activeFilters[filterKey] = values
      await productStore.loadProducts('book')
    },
    getFiltersQuery() {
      Object.keys(this.activeFilters).forEach(
        (k) => this.activeFilters[k].length == 0 && delete this.activeFilters[k]
      )

      const query = new URLSearchParams()

      for (let [key, value] of Object.entries(this.activeFilters)) {
        query.append(key, value.join(';'))
      }

      return query
    }
  }
})
