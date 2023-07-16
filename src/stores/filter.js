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
      this.filters = await this.get('book/filters')

      for (let key of Object.keys(this.filters)) {
        Object.defineProperty(this.isChecked, key, { value: [], writable: true })
      }
      this.isChecked.price[0] = this.filters.price.min
      this.isChecked.price[1] = this.filters.price.max
    },
    async changeFilters(filterKey, values) {
      this.activeFilters[filterKey] = values
      await this.loadProductsResult()
    },
    async loadProductsResult(type = 'book') {
      await useProductStore().loadProducts(type)
    },
    getFiltersQuery() {
      Object.keys(this.activeFilters).forEach(
        (k) => this.activeFilters[k].length == 0 && delete this.activeFilters[k]
      )
      const query = new URLSearchParams()
      for (let [key, value] of Object.entries(this.activeFilters)) {
        if (key === 'price') query.append(key, value)
        else query.append(key, value.join(';'))
      }

      return query
    },
    async clearFilters(type = 'book') {
      await this.loadFilters()
      this.activeFilters = {}
      await this.loadProductsResult(type)
    }
  }
})
