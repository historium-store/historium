import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import router from '../router'

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
    async viewProduct(id) {
      await router.push({ name: 'product', params: { id } })
    },
    async loadProducts() {
      console.log('>>> loadProducts')

      const response = await this.get('product')
      this.products = response.data.result
    },
    async loadProduct(key) {
      console.log('>>> loadProduct ' + key)

      const response = await this.get(`product/${key}`)
      this.product = response.data
      console.log(this.product)
    },
    async loadNovelties() {
      console.log('>>> loadNovelties')

      const response = await this.get(`product`, false, {
        orderBy: 'createdAt',
        limit: 12
      })
      console.log(response.data)
      this.homeSpecialSections.novelties = response.data.result
    },
    async loadRecomendations() {
      console.log('>>> loadRecomendations')

      const response = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      console.log(response.data)
      this.homeSpecialSections.recomendations = response.data.result
      this.homeSpecialSections.history = response.data.result
    }
  }
})
