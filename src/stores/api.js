import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router'
import { useAlertStore } from './alert'
import { useAuthStore } from './auth'

export const useApiStore = defineStore('api', {
  state: () => ({
    authStore: useAuthStore(),
    API_URL: import.meta.env.VITE_API_URL
  }),
  actions: {
    async responseMiddleware(response) {
      const alertStore = useAlertStore()
      if (['OK', 'No Content', 'Created'].includes(response.statusText))
        return response.data || true
      else if (
        ['Bad Request'].includes(response.statusText) ||
        ['login', 'signup', 'restore', 'order'].includes(
          response?.request?.responseURL?.split('/').at(-1)
        )
      ) {
        alertStore.showAlert(response.data.message, 'bg-red-500')
      } else if (['Not Found', 'Internal Server Error'].includes(response.statusText)) {
        await router.push({ name: 'NotFound' })
      }
      return false
    },
    getHeaders(isNeedAuth) {
      let headers = {
        'Access-Control-Allow-Origin': '*'
      }
      if (isNeedAuth) {
        headers['Authorization'] = this.authStore.getAuthToken
      }
      if (import.meta.env.VITE_NODE_ENV === 'production') {
        headers['API-Key'] = import.meta.env.VITE_API_KEY
      }
      return {
        headers
      }
    },
    async post(route, body, query, isNeedAuth) {
      const response = await axios
        .post(
          query
            ? `${this.API_URL}${route}?${new URLSearchParams(query)}`
            : `${this.API_URL}${route}`,
          body,
          this.getHeaders(isNeedAuth)
        )
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    },
    async get(route, isNeedAuth, query) {
      const response = await axios
        .get(
          query
            ? `${this.API_URL}${route}?${new URLSearchParams(query)}`
            : `${this.API_URL}${route}`,
          this.getHeaders(isNeedAuth)
        )
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    },
    async patch(route, body, query) {
      query = new URLSearchParams(query)
      const response = await axios
        .patch(`${this.API_URL}${route}?${query}`, body, this.getHeaders(true))
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    },
    async delete(route, body, query) {
      const response = await axios
        .delete(
          query
            ? `${this.API_URL}${route}?${new URLSearchParams(query)}`
            : `${this.API_URL}${route}`,
          { ...this.getHeaders(true), data: body }
        )
        .catch((error) => {
          return this.responseMiddleware(error.response)
        })
      return this.responseMiddleware(response)
    }
  }
})

