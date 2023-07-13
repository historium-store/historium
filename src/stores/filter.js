import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useProductStore } from './product'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    filters: undefined,
    activeFilters: {},
    isChecked: {
      price: [0, 0]
    }
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadFilters() {
      const response = await this.get('book/filters')
      this.filters = response.data
      this.isChecked.price[0] = this.filters.price.min
      this.isChecked.price[1] = this.filters.price.max
    },
    async changeFilters(filterKey, values) {
      const productStore = useProductStore()
      console.log(filterKey)
      this.activeFilters[filterKey] = values
      await productStore.loadProducts('book')
    },
    getFiltersQuery() {
      Object.keys(this.activeFilters).forEach(
        (k) => this.activeFilters[k].length == 0 && delete this.activeFilters[k]
      )
      console.log('aa', this.activeFilters)

      const query = new URLSearchParams()

      console.log(this.activeFilters)
      for (let [key, value] of Object.entries(this.activeFilters)) {
        console.log(key, value)
        if (key === 'price') query.append(key, value)
        else query.append(key, value.join(';'))
      }

      return query
    }
  }
})
