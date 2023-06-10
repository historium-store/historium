import { defineStore } from 'pinia'
import { useApiStore } from './api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
    api: useApiStore()
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token && !!state.user
    },
    getUserFromStorage() {
      return JSON.parse(localStorage.getItem('user'))
    }
  },
  actions: {
    // User
    async getUser() {
      const response = await this.api.get('user/account', true)
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

      await this.api.post('signup', payload)
      return true
    },
    async login(payload) {
      const response = await this.api.post('login', payload)
      await this.setToken(response.data.token)
      return true
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
    },

    // Password restoration

    async restorePasswordRequest(payload) {
      console.log('>>> restorePasswordRequest')

      const response = this.api.post('password-restore', payload)
      console.log(response.status)
      return true
    },
    async restorePasswordConfirm(payload) {
      console.log('>>> restorePasswordConfirm')

      const response = this.api.post('verify-restore', payload)
      console.log(response.status)
      return response
    },
    async updatePassword(payload) {
      console.log('>>> updatePassword')

      const { userId, password } = payload
      const response = this.api.patch(`user/${userId}`, { password })
      console.log(response.status)
      return true
    }
  }
})
