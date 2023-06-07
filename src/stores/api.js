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
      return await axios
        .post(
          query ? `${this.API}${route}?${new URLSearchParams(query)}` : `${this.API}${route}`,
          body,
          this.getHeader(isNeedAuth)
        )
        .catch((error) => {
          console.log(error.response.data.message)
        })
    },
    async get(route, isNeedAuth, query) {
      return await axios
        .get(
          query ? `${this.API}${route}?${new URLSearchParams(query)}` : `${this.API}${route}`,
          this.getHeader(isNeedAuth)
        )
        .catch((error) => {
          console.log(error)
        })
    },
    async patch(route, body, query) {
      query = new URLSearchParams(query)
      return await axios
        .patch(`${this.API}${route}?${query}`, body, this.getHeader(true))
        .catch((error) => {
          console.log(error.response.data.message)
        })
    },
    async delete(route, body, query) {
      return await axios
        .delete(
          query ? `${this.API}${route}?${new URLSearchParams(query)}` : `${this.API}${route}`,
          { ...this.getHeader(true), data: body }
        )
        .catch((error) => {
          console.log(error.response.data.message)
        })
    }
  }
})
