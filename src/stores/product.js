import { defineStore } from 'pinia'
import axios from 'axios'
// import router from '../router'
import { useAuthStore } from '@/stores/auth.js'
export const useProductStore = defineStore('product', {
  state: () => ({
    products: null
  }),
  actions: {
    async loadProducts() {
      console.log('>>> loadProducts')
      const authStore = useAuthStore()

      const response = (
        await axios.get('api/book', { headers: { Authorization: 'Bearer ' + authStore.token } })
      ).data

      console.log(response)
      this.products = response.data
    }
  }
})
