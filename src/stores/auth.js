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
    async signup(payload) {
      console.log('>>> signup')

      const response = (await axios.post('api/signup', { ...payload })).data
      console.log(response)
      return response.status == 'OK'
    },
    async login(payload) {
      console.log('>>> login')

      const response = await axios.post('api/login', { ...payload }).catch((error) => {
        console.log(error.response.data.data.error)
      })

      localStorage.setItem('token', response.data.data.token)

      this.token = response.data.data.token

      console.log(this.token)

      await this.getUserData()
      router.push('/')
    },
    async getUserData() {
      console.log('>>> getUserData')

      const response = await axios
        .get('api/user/account', { headers: { Authorization: 'Bearer ' + this.token } })
        .catch((error) => {
          console.log(error.response.data.data.error)
        })

      this.user = response.data.data
      localStorage.setItem('user', JSON.stringify(this.user))
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
