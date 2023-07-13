import axios from 'axios'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useApiStore = defineStore('api', {
  state: () => ({
    authStore: useAuthStore(),
    API: import.meta.env.VITE_API_URL
  }),
  actions: {
    getHeader(isNeedAuth) {
      let headers = {
        'Access-Control-Allow-Origin': '*'
      }
      if (isNeedAuth) {
        const token = this.authStore.getAuthToken
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
          return error.response
        })
    },
    async get(route, isNeedAuth, query) {
      const requestUrl = query
        ? `${this.API}${route}?${new URLSearchParams(query)}`
        : `${this.API}${route}`
      console.log(requestUrl)
      return await axios.get(requestUrl, this.getHeader(isNeedAuth)).catch((error) => {
        console.log(error.response.data.message)
        return error.response
      })
    },
    async patch(route, body, query) {
      query = new URLSearchParams(query)
      return await axios
        .patch(`${this.API}${route}?${query}`, body, this.getHeader(true))
        .catch((error) => {
          console.log(error.response.data.message)
          return error.response
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
          return error.response
        })
    }
  }
})
