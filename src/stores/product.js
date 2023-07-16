import { defineStore, mapActions } from 'pinia'
import { default as router } from '../router'
import { useApiStore } from './api'
import { useAuthStore } from './auth'
import { useFilterStore } from './filter'
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
    ...mapActions(useApiStore, ['get', 'post', 'patch']),
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
      if (!this.isAllowedType(type)) {
        await router.push({ name: 'NotFound' })
      }
      const filterStore = useFilterStore()
      const data = await this.get(type, false, filterStore.getFiltersQuery())
      this.products = data.result
    },
    async loadProduct(key, type = 'product') {
      if (!this.isAllowedType(type)) {
        await router.push({ name: 'NotFound' })
      }
      this.product = await this.get(`${type}/${key}`)
      await this.pushInHistory(this.product?.product?._id)
    },
    async loadNovelties() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      this.homeSpecialSections.novelties = data.result
    },
    async loadRecomendations() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'asc',
        limit: 12
      })
      this.homeSpecialSections.recomendations = data.result
    },
    async loadHistory() {
      const authStore = useAuthStore()
      let userHistory
      if (authStore.isAuthenticated) {
        userHistory = await this.get(`user/history`, true)
      } else {
        userHistory = JSON.parse(localStorage.getItem('history')) || []
      }
      this.homeSpecialSections.history = userHistory
    },
    async pushInHistory(id) {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        await this.post('user/history', { product: id }, null, true)
      } else {
        const history = JSON.parse(localStorage.getItem('history')) || []
        const index = history.findIndex((item) => item._id === id)
        if (index > -1) {
          history.splice(index, 1)
        }
        history.unshift(await this.getAbstractProductById(id))
        localStorage.setItem('history', JSON.stringify(history))
      }
    },
    async synchronizeHistory() {
      let userHistory = JSON.parse(localStorage.getItem('history')) || []
      if (useAuthStore().isAuthenticated && userHistory.length) {
        this.cart = await this.patch(
          'user/history',
          userHistory.map((item) => item._id)
        )
      }
    }
  }
})
