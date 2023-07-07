import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import router from '../router'
import { useFilterStore } from './filter'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: undefined,
    product: undefined,
    homeSpecialSections: {
      novelties: undefined,
      recomendations: undefined,
      history: undefined
    }
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    isAvailable(product) {
      return product?.quantity > 0
    },
    async viewProduct(id, type = 'product') {
      await router.push({ name: 'product', params: { id, type } })
    },
    async loadProducts() {
      console.log('>>> loadProducts')
      const filterStore = useFilterStore()
      const response = await this.get('product', false, filterStore.getFiltersQuery())
      console.log(response)
      this.products = response.data.result
    },
    async loadProductOld(key) {
      console.log('>>> loadProduct ' + key)

      const response = await this.get(`product/${key}`)
      this.product = response.data
      console.log(this.product)
    },
    async loadProduct(key, type = 'product') {
      console.log(`>>> loadProduct ${type}/${key} `)

      const response = await this.get(`${type}/${key}`)
      this.product = response.data
      console.log(this.product)
    },
    async loadNovelties() {
      console.log('>>> loadNovelties')

      const response = await this.get(`product`, false, {
        orderBy: 'createdAt',
        limit: 12
      })
      this.homeSpecialSections.novelties = response.data.result
    },
    async loadRecomendations() {
      console.log('>>> loadRecomendations')

      const response = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      this.homeSpecialSections.recomendations = response.data.result
      this.homeSpecialSections.history = response.data.result
    }
  }
})
