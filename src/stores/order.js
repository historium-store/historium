import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'

export const useOrderStore = defineStore('order', {
  state() {
    return {
      orders: [],
      countries: [],
      pickedCountry: undefined,
      cities: [],
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
      this.orders.push(await this.post('order', orderPayload))
    },
    async getOrders() {
      this.orders = await this.get('user/orders', true)
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
