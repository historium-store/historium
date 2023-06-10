import { defineStore } from 'pinia'
import { useApiStore } from './api'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({ api: useApiStore(), cart: undefined, localCart: { items: [] } }),
  getters: {
    isAuthenticated() {
      const auth = useAuthStore()
      return auth.isAuthenticated
    }
  },
  actions: {
    async updateCart() {
      const response = await this.api.get('user/cart', true)
      this.cart = response.data
    },
    async loadLocalCart() {
      this.localCart = JSON.parse(localStorage.getItem('cart'))
      let items = []
      this.localCart.items.forEach(async (item) => {
        if (!item?.product) {
          const response = await this.api.get(`product/${item.itemId}`)
          items.push(response.data)
        } else items.push(item)
      })
      this.localCart.items = items
    },
    updateLocalCart() {
      localStorage.setItem('cart', JSON.stringify(this.localCart))
    },
    async addItem(itemId) {
      // const x = this.cart?.items?.find((item) => item.product._id === itemId)
      // console.log(x)
      // x.quantity++
      // console.log(x)

      if (this.isAuthenticated) {
        await this.api.post('user/cart-item', { product: itemId }, null, true)
        this.updateCart()
      } else {
        const index = this.localCart.items.findIndex((item) => item.itemId === itemId)
        if (index != -1) {
          this.localCart.items[index].quantity++
        } else this.localCart.items.push({ quantity: 1, itemId })

        this.updateLocalCart()
      }
      return true
    },
    async removeItem(itemId) {
      if (this.isAuthenticated) {
        await this.api.delete('user/cart-item', { product: itemId })
        this.updateCart()
      } else {
        const index = this.localCart.items.findIndex((item) => item.itemId === itemId)
        if (index != -1) {
          if (this.localCart.items[index].quantity === 1) {
            delete this.localCart.items[index]
          } else this.localCart.items[index].quantity--
        } else this.localCart.items.push({ quantity: 1, itemId })

        this.updateLocalCart()
      }
      return true
    },
    async changeItemCount(itemId, count) {
      if (count < 100) {
        if (this.isAuthenticated) {
          await this.api.post('user/cart-item', { product: itemId, quantity: count }, null, true)
          this.updateCart()
        } else {
          const index = this.localCart.items.findIndex((item) => item.itemId === itemId)
          if (index != -1) {
            this.localCart.items[index].quantity++
          } else this.localCart.items.push({ quantity: 1, itemId })

          this.updateLocalCart()
        }
      } else throw Error('items count is too big')
      return true
    },
    async clearCart() {
      if (this.isAuthenticated) {
        await this.api.delete('user/cart')
        this.updateCart()
      }
    }
  }
})
