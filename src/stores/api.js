import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useApiStore = defineStore('api', {
  state: () => ({
    authStore: useAuthStore(),
    // API: 'http://localhost:3000/'
    API: 'api/'
  }),
  actions: {
    getHeader(isNeedAuth) {
      let headers = {
        'Access-Control-Allow-Origin': '*'
      }
      if (isNeedAuth) {
        const token = this.authStore.getAuthToken()
        headers['Authorization'] = token
      }
      return {
        headers
      }
    },
    async post(route, body, query, isNeedAuth) {
      query = new URLSearchParams(query)
      return await axios
        .post(`${this.API}${route}?${query}`, body, this.getHeader(isNeedAuth))
        .catch((error) => {
          console.log(error.response.data.message)
        })
    },
    async get(route, isNeedAuth, query) {
      query = new URLSearchParams(query)
      return await axios
        .get(`${this.API}${route}${query}`, this.getHeader(isNeedAuth))
        .catch((error) => {
          console.log(error)
        })
    },
    async patch(route, body, query) {
      query = new URLSearchParams(query)
      return await axios
        .patch(`${this.API}${route}?${query}`, body, this.getHeader())
        .catch((error) => {
          console.log(error.response.data.message)
        })
    },
    async delete(route, body, query) {
      query = new URLSearchParams(query)
      return await axios.delete(`api/${route}?${query}`, body, this.getHeader()).catch((error) => {
        console.log(error.response.data.message)
      })
    }
  }
})
