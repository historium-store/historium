import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useCartStore } from './cart'
import { useAlertStore } from './alert'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    authStore: useAuthStore()
  }),
  getters: {
    getUserFromStorage() {
      return JSON.parse(localStorage.getItem('user'))
    },
    fullName() {
      return `${this.user?.firstName} ${this.user?.lastName}`
    }
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch', 'delete']),
    ...mapActions(useCartStore, ['clearCart', 'updateCart', 'saveCartToLS', 'synchronizeCarts']),
    async getUser() {
      const response = await this.get('user/account', true)
      this.user = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    },

    async pushInHistory(id) {
      console.log('pushInHistory')
      if (this.authStore.isAuthenticated) {
        await this.post('user/history', { product: id }, null, true)
      } else {
        const history = JSON.parse(localStorage.getItem('history')) || []
        const index = history.indexOf(id)
        if (index > -1) {
          history.splice(index, 1)
        }
        history.unshift(id)
        localStorage.setItem('history', JSON.stringify(history))
      }
    },
    async pushInWishlist(id) {
      console.log('pushInWishlist')
      if (this.authStore.isAuthenticated) {
        await this.post('user/wishlist', { product: id }, null, true)
        await this.getUser()
      } else {
        const alertStore = useAlertStore()
        alertStore.showAlert('Увійдіть щоб додавати товари до бажаних', 'bg-cart-light')
      }
    },
    async removeFromWishlist(id) {
      console.log('removeFromWishlist')
      if (this.authStore.isAuthenticated) {
        await this.delete('user/wishlist', { product: id }, null, true)
        await this.getUser()
      }
    }
  }
})
