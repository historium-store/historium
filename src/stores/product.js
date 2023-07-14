import { defineStore, mapActions } from 'pinia'
import { default as router } from '../router'
import { useApiStore } from './api'
import { useAuthStore } from './auth'
import { useFilterStore } from './filter'
import { useUserStore } from './user'
export const useProductStore = defineStore('product', {
  state: () => ({
    allowedTypes: ['product', 'book', 'board-game', 'e-book'],
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
    ...mapActions(useUserStore, ['pushInHistory']),
    isAllowedType(type) {
      return this.allowedTypes.includes(type)
    },
    isAvailable(product) {
      return product?.quantity > 0
    },
    async getAbstractProductById(id, isPreview = true) {
      return await this.get(`product/${id}`, false, isPreview ? { preview: true } : {})
    },
    async viewProduct(id, type = 'product') {
      if (!this.isAllowedType(type)) {
        await router.push({ name: 'NotFound' })
      }
      await router.push({ name: 'product', params: { id, type } })
    },
    async loadProducts(type = 'product') {
      console.log('>>> loadProducts')
      if (!this.isAllowedType(type)) {
        await router.push({ name: 'NotFound' })
      }
      const filterStore = useFilterStore()
      const data = await this.get(type, false, filterStore.getFiltersQuery())
      this.products = data.result
    },
    async loadProduct(key, type = 'product') {
      console.log(`>>> loadProduct ${type}/${key} `)
      if (!this.isAllowedType(type)) {
        await router.push({ name: 'NotFound' })
      }
      this.product = await this.get(`${type}/${key}`)
      await this.pushInHistory(this.product?.product?._id)
    },
    async loadNovelties() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        limit: 12
      })
      this.homeSpecialSections.novelties = data.result
    },
    async loadRecomendations() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      this.homeSpecialSections.recomendations = data.result
    },
    async loadHistory() {
      const authStore = useAuthStore()
      let userHistory
      if (authStore.isAuthenticated) {
        const data = await this.get(`user/account`, true)
        userHistory = data.history
      } else {
        userHistory = JSON.parse(localStorage.getItem('history')) || []
      }
      this.homeSpecialSections.history = []
      userHistory.forEach(async (id) => {
        this.homeSpecialSections.history.push(await this.getAbstractProductById(id))
      })
    }
  }
})
