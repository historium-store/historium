import { defineStore, mapActions } from 'pinia'
import { useAlertStore } from './alert'
import { useApiStore } from './api'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'
import { useProductStore } from './product'

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
    },
    wishlistItemsQuantity() {
      return this.user?.wishlist.length || 0
    },
    isAdmin() {
      return this.user?.role === 'admin'
    }
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch', 'delete']),
    ...mapActions(useCartStore, ['clearCart', 'updateCart', 'saveCartToLS', 'synchronizeCarts']),
    async updateUserInfo(payload) {
      this.user = await this.patch(`user/${this.user._id}`, payload)
      localStorage.setItem('user', JSON.stringify(this.user))
      const alertStore = useAlertStore()
      alertStore.showAlert('Дані успішно оновлені')
    },
    async pushInWishlist(id) {
      console.log('pushInWishlist')
      if (this.authStore.isAuthenticated) {
        await this.post('user/wishlist', { product: id }, null, true)
        await this.getUser()
      } else {
        const alertStore = useAlertStore()
        alertStore.showAlert('Увійдіть щоб додавати товари до бажаних')
      }
    },
    async pushInWaitlist(id) {
      console.log('pushInWaitlist')
      if (this.authStore.isAuthenticated) {
        await this.post('user/waitlist', { product: id }, null, true)
        await this.getUser()
      } else {
        const alertStore = useAlertStore()
        alertStore.showAlert('Увійдіть щоб додавати товари до очыкуванних')
      }
    },
    async removeFromWishlist(id) {
      console.log('removeFromWishlist')
      if (this.authStore.isAuthenticated) {
        await this.delete('user/wishlist', { product: id }, null, true)
        await this.getUser()
      }
    },
    async removeFromWaitlist(id) {
      console.log('removeFromWaitlist')
      if (this.authStore.isAuthenticated) {
        await this.delete('user/waitlist', { product: id }, null, true)
        await this.getUser()
      }
    },
    async getUser() {
      this.user = await this.get('user/account', true)
      localStorage.setItem('user', JSON.stringify(this.user))
      return this.user
    }
  }
})
