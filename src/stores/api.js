import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router'
import { useAlertStore } from './alert'
import { useAuthStore } from './auth'

export const useApiStore = defineStore('api', {
  state: () => ({
    authStore: useAuthStore(),
    API: import.meta.env.VITE_API_URL
  }),
  actions: {
    async responseMiddleware(response) {
      const alertStore = useAlertStore()
      console.log(response)
      if (['OK', 'No Content', 'Created'].includes(response.statusText)) return response.data
      else if (
        ['Bad Request'].includes(response.statusText) ||
        ['login', 'signup', 'restore'].includes(response?.request?.responseURL?.split('/').at(-1))
      ) {
        alertStore.showAlert(response.data.message, 'bg-red-500')
        return false
      } else if (['Not Found', 'Internal Server Error'].includes(response.statusText)) {
        await router.push({ name: 'NotFound' })
        return false
      }
    },
    getHeader(isNeedAuth) {
      let headers = {
        'Access-Control-Allow-Origin': '*'
      }
      if (isNeedAuth) {
        headers['Authorization'] = this.authStore.getAuthToken
      }
      return {
        headers
      }
    },
    async post(route, body, query, isNeedAuth) {
      const response = await axios
        .post(
          query ? `${this.API}${route}?${new URLSearchParams(query)}` : `${this.API}${route}`,
          body,
          this.getHeader(isNeedAuth)
        )
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    },
    async get(route, isNeedAuth, query) {
      const requestUrl = query
        ? `${this.API}${route}?${new URLSearchParams(query)}`
        : `${this.API}${route}`
      console.log(requestUrl)

      const response = await axios.get(requestUrl, this.getHeader(isNeedAuth)).catch((error) => {
        return this.responseMiddleware(error.response)
      })
      return this.responseMiddleware(response)
    },
    async patch(route, body, query) {
      query = new URLSearchParams(query)
      const response = await axios
        .patch(`${this.API}${route}?${query}`, body, this.getHeader(true))
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    },
    async delete(route, body, query) {
      const response = await axios
        .delete(
          query ? `${this.API}${route}?${new URLSearchParams(query)}` : `${this.API}${route}`,
          { ...this.getHeader(true), data: body }
        )
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    }
  }
})
