import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useAuthStore } from './auth'

export const useOrderStore = defineStore('order', {
  state() {
    return {
      orders: [],
      statuses: [],
      countries: [],
      cities: [],
      pickedCountry: undefined,
      delivery: {
        types: undefined,
        pickedType: undefined,
        pickedPaymentType: undefined,
        address: undefined
      }
    }
  },
  watch: {
    pickedCountry: async function () {
      this.cities = this.pickedCountry.cities
    }
  },
  actions: {
    ...mapActions(useApiStore, ['post', 'get']),
    async load() {
      await this.getOrders()
      await this.getCountries()
      await this.getDeliveryTypes()
    },
    async createOrder(orderPayload) {
      const authStore = useAuthStore()
      const data = await this.post('order', orderPayload, null, authStore.isAuthenticated)
      if (data) {
        this.orders.push(data)
        return data
      }
    },
    async getOrders() {
      this.orders = await this.get('user/orders', true)
    },
    async getOrderStatuses() {
      this.statuses = await this.get('order/statuses')
    },
    async getCountries() {
      const data = await this.get('country')
      this.countries = data
      this.cities = this.countries?.[0].cities
    },
    async getDeliveryTypes() {
      const data = await this.get('delivery-type')
      this.delivery.types = data
      this.delivery.pickedType = data[0]
    },
    pickCountry(country) {
      this.pickedCountry = country
    },
    pickDeliveryType(deliveryType) {
      this.delivery.pickedType = deliveryType
    },
    pickPaymentType(paymentType) {
      this.delivery.pickedPaymentType = paymentType
    }
  }
})
