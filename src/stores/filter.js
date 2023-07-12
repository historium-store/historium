import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useProductStore } from './product'
import { ref, watch } from 'vue'

// export const useFilterStore = defineStore('filter', () => {
//   const filters = ref(undefined)
//   const activeFilters = ref({})
//   const isChecked = ref({})

//   watch(isChecked, () => console.log('tttttttttttt'))

//   const apiStore = useApiStore()

//   async function loadFilters() {
//     const response = await apiStore.get('book/filters')
//     this.filters = response.data
//     console.log(response.data)
//   }
//   async function changeFilters(filterKey, values) {
//     const productStore = useProductStore()
//     this.activeFilters[filterKey] = values
//     await productStore.loadProducts('book')
//   }

//   function getFiltersQuery() {
//     Object.keys(this.activeFilters).forEach(
//       (k) => this.activeFilters[k].length == 0 && delete this.activeFilters[k]
//     )

//     const query = new URLSearchParams()

//     for (let [key, value] of Object.entries(this.activeFilters)) {
//       query.append(key, value.join(';'))
//     }

//     return query
//   }

//   return { filters, activeFilters, isChecked, loadFilters, changeFilters, getFiltersQuery }
// })

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
