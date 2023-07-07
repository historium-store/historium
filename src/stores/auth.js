import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useCartStore } from './cart'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token && !!state.user
    },
    getUserFromStorage() {
      return JSON.parse(localStorage.getItem('user'))
    },
    fullName() {
      return `${this.user?.firstName} ${this.user?.lastName}`
    }
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch']),
    ...mapActions(useCartStore, ['clearCart', 'updateCart', 'saveCartToLS', 'synchronizeCarts']),
    // User
    async getUser() {
      const response = await this.get('user/account', true)
      this.user = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    },

    // Authorization

    getAuthToken() {
      if (!this.token) {
        throw Error('User is not authenticated!')
      }
      return 'Bearer ' + this.token
    },
    async setToken(token) {
      localStorage.setItem('token', token)
      this.token = token
      console.log('token: ' + token)
      await this.getUser()
    },
    async signup(payload) {
      console.log('>>> signup')

      await this.post('signup', payload)
      return true
    },
    async login(payload) {
      const response = await this.post('login', payload)
      if (response.statusText == 'OK') {
        await this.setToken(response.data.token)
        this.saveCartToLS()
        await this.synchronizeCarts()
        return true
      } else return response
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
      this.clearCart()
    },

    // Password restoration

    async restorePasswordRequest(payload) {
      console.log('>>> restorePasswordRequest')

      const response = this.post('password-restore', payload)
      console.log(response.status)
      return true
    },
    async restorePasswordConfirm(payload) {
      console.log('>>> restorePasswordConfirm')

      const response = this.post('verify-restore', payload)
      console.log(response.status)
      return response
    },
    async updatePassword(payload) {
      console.log('>>> updatePassword')

      const { userId, password } = payload
      const response = this.patch(`user/${userId}`, { password })
      console.log(response.status)
      return true
    },
    async pushInHistory(id) {
      const response = this.post('user/history', { product: id }, null, true)
      console.log(response.status)
    }
  }
})
