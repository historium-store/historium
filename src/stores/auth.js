import { defineStore, mapActions, mapWritableState } from 'pinia'
import { useApiStore } from './api'
import { useCartStore } from './cart'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token')
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    getAuthToken() {
      if (!this.token) {
        throw Error('User is not authenticated!')
      }
      return 'Bearer ' + this.token
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user'])
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch']),
    ...mapActions(useCartStore, ['clearCart', 'updateCart', 'saveCartToLS', 'synchronizeCarts']),
    ...mapActions(useUserStore, ['getUser']),
    // Authorization
    async setToken(token) {
      localStorage.setItem('token', token)
      this.token = token
      // console.log('token: ' + token)
      await this.getUser()
    },
    async signup(payload) {
      await this.post('signup', payload)
      return true
    },
    async login(payload) {
      const response = await this.post('login', payload)
      if (response.statusText == 'OK') {
        await this.setToken(response.data.token)
        this.saveCartToLS()
        await this.synchronizeCarts()
        await this.updateCart()
        await this.getUser()
        return true
      } else return response
    },
    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      useUserStore().$reset()
      this.$reset()
      await this.clearCart()
    },

    // Password restoration

    async restorePasswordRequest(payload) {
      const response = this.post('password-restore', payload)
      console.log(response.status)
      return true
    },
    async restorePasswordConfirm(payload) {
      const response = this.post('verify-restore', payload)
      console.log(response.status)
      return response
    },
    async updatePassword(payload) {
      const { userId, password } = payload
      const response = this.patch(`user/${userId}`, { password })
      console.log(response.status)
      return true
    }
  }
})
