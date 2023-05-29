import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user'))
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token
    }
  },
  actions: {
    async setToken(token) {
      console.log('setToken')
      localStorage.setItem('token', token)
      await this.getUserData()
    },
    async signup(payload) {
      console.log('>>> signup')

      const response = await axios.post('api/signup', { ...payload })
      console.log(response)
      return true
    },
    async login(payload) {
      console.log('>>> login')

      const response = await axios.post('api/login', { ...payload }).catch((error) => {
        alert(error.response.data.message)
        return
      })

      await this.setToken(response.data.token)
      router.push('/')
    },
    async getUserData() {
      console.log('>>> getUserData')

      const response = await axios
        .get('api/user/account', { headers: { Authorization: 'Bearer ' + this.token } })
        .catch((error) => {
          console.log(error.response.data.message)
        })

      this.user = response.data
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    async restorePasswordRequest(payload) {
      console.log('>>> restorePasswordRequest')

      const response = await axios.post('api/password-restore', { ...payload })
      console.log(response.status)
      return true
    },
    async restorePasswordConfirm(payload) {
      console.log('>>> restorePasswordConfirm')

      const response = await axios.post('api/verify-restore', { ...payload })
      console.log(response.status)
      return response
    },
    async updatePassword(payload) {
      const response = await axios.patch(
        `api/user/${payload.userId}`,
        {
          password: payload.password
        },
        { headers: { Authorization: 'Bearer ' + this.token } }
      )
      console.log(response.status)
      return true
    },
    logout() {
      console.log('>>> logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.token = null
      this.user = null
      router.push('/')
    }
  }
})
