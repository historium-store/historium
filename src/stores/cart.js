import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useAuthStore } from './auth'
// import { CookieStorage } from 'cookie-storage'

// const cookieStorage = new CookieStorage()
const cookieStorage = localStorage

const cartTemplate = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0
}

export const useCartStore = defineStore('cart', {
  state: () => ({ cart: cartTemplate }),
  getters: {
    isAuthenticated() {
      const auth = useAuthStore()
      return auth.isAuthenticated
    }
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get', 'patch', 'delete']),
    async synchronizeCarts() {
      if (this.isAuthenticated && this.cart.totalQuantity > 0) {
        let items = []
        this.cart.items.map((item) =>
          items.push({ quantity: item.quantity, product: item.product._id })
        )
        const response = await this.patch('cart', { items })
        this.cart = response.data
      }
    },
    async updateCart() {
      console.log('updateCart')

      if (!this.isAuthenticated) {
        await this.loadCartFromLS()
        return
      }
      const response = await this.get('cart', true)
      this.cart = response.data
    },
    async loadCartFromLS() {
      console.log('loadCartFromLS')
      const localCart = JSON.parse(cookieStorage.getItem('cart')) || cartTemplate
      this.cart = { ...localCart }
    },
    saveCartToLS() {
      console.log('saveCartToLS')
      cookieStorage.setItem('cart', JSON.stringify(this.cart))
    },
    async addItem(itemId) {
      console.log('addItem')
      if (this.isAuthenticated) {
        await this.post('cart-item', { product: itemId }, null, true)
      } else {
        const index = this.cart.items.findIndex((item) => item.product._id === itemId)
        if (index != -1) {
          this.cart.items[index].quantity++
        } else {
          const response = await this.get(`product/${itemId}`, false, { preview: true })
          this.cart.items.push({
            product: response.data,
            quantity: 1,
            createdAt: Date.now()
          })
        }
        this.cart.totalQuantity++
        this.countPrice()
        this.saveCartToLS()
      }
      await this.updateCart()
      return true
    },
    async removeItem(itemId) {
      if (this.isAuthenticated) {
        await this.delete('cart-item', { product: itemId, quantity: Number.MAX_SAFE_INTEGER })
      } else {
        const index = this.cart.items.findIndex((item) => item.product._id === itemId)
        if (index != -1) {
          this.cart.totalQuantity -= this.cart.items[index].quantity
          this.cart.items.splice(index, 1)
          this.countPrice()
          this.saveCartToLS()
        }
      }
      await this.updateCart()
      return true
    },
    async decreaseItem(itemId) {
      if (this.isAuthenticated) {
        const item = this.cart.items.find((item) => item.product._id === itemId)
        if (item.quantity > 1) {
          await this.delete('cart-item', { product: itemId })
          await this.updateCart()
        }
      } else {
        const index = this.cart.items.findIndex((item) => item.product._id === itemId)
        if (index != -1 && this.cart.items[index].quantity > 1) {
          this.cart.items[index].quantity--
          this.cart.totalQuantity--
          this.countPrice()
          this.saveCartToLS()
          await this.updateCart()
        }
      }
      return true
    },
    async changeItemCount(itemId, quantity) {
      if (quantity < 100) {
        if (this.isAuthenticated) {
          await this.api.post('cart-item', { product: itemId, quantity }, null, true)
        } else {
          const index = this.cart.items.findIndex((item) => item.product._id === itemId)
          this.cart.items[index].quantity = +quantity
          this.countTotalQuantity()
          this.countPrice()
          this.saveCartToLS()
        }
        await this.updateCart()
      } else throw Error('items quantity is too big')
      return true
    },
    async clearCart() {
      // if (this.cart.items.length > 0) {
      this.cart = cartTemplate
      if (this.isAuthenticated) {
        await this.delete('cart')
      } else {
        cookieStorage.removeItem('cart')
      }
      // console.log(this.cart)
      this.saveCartToLS()
      await this.updateCart()
      // }
    },
    countPrice() {
      this.cart.totalPrice = this.cart.items.reduce(
        (count, item) => (count += item.product.price * item.quantity),
        0
      )
    },
    countTotalQuantity() {
      this.cart.totalQuantity = this.cart.items.reduce((count, item) => (count += item.quantity), 0)
    }
  }
})
