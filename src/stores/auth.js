import { defineStore, mapActions, mapState } from 'pinia'
import router from '../router'
import { useAlertStore } from './alert'
import { useApiStore } from './api'
import { useCartStore } from './cart'
import { useModalStore } from './modal'
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
    ...mapState(useUserStore, ['user'])
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch']),
    ...mapActions(useCartStore, ['clearCart', 'updateCart', 'saveCartToLS', 'synchronizeCarts']),
    ...mapActions(useUserStore, ['getUser']),
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useModalStore, ['hideModals']),
    // Authorization
    async setToken(token) {
      localStorage.setItem('token', token)
      this.token = token
      await this.getUser()
    },
    async signup(payload) {
      const data = await this.post('signup', payload)
      if (data) {
        this.login({ login: payload.email, password: payload.password })
        this.hideModals()
      }
    },
    async login(payload) {
      const data = await this.post('login', payload)
      if (data) {
        await this.setToken(data.token)

        this.saveCartToLS()
        await this.synchronizeCarts()
        await this.updateCart()

        this.hideModals()
        this.showAlert(`Вітаю, ${(await this.getUser()).firstName}!`)
      }
    },
    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      useUserStore().$reset()
      this.$reset()
      await this.clearCart()
      await router.push('/')
    },

    // Password restoration

    async restorePasswordRequest(payload) {
      const response = await this.post('password-restore', payload)
      console.log(response.status)
      return true
    },
    async restorePasswordConfirm(payload) {
      const response = await this.post('verify-restore', payload)
      console.log(response.status)
      return response
    },
    async updatePassword(payload) {
      const { userId, password } = payload
      await this.patch(`user/${userId}`, { password })
      return true
    }
  }
})
