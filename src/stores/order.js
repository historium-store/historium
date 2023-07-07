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
      const response = await this.post('order', orderPayload)
      console.log(response)
      console.log(response.data)
      this.orders.push(response.data)
    },
    async getOrders() {
      const response = await this.get('user/orders', true)
      console.log(response.data)
      this.orders = response.data
    },
    async getCountries() {
      const response = await this.get('country')
      console.log(response.data)
      this.countries = response.data
      this.cities = this.countries?.[0].cities
    },
    async getDeliveryTypes() {
      const response = await this.get('delivery-type')
      console.log(response.data)
      this.delivery.types = response.data
      this.delivery.pickedType = response.data[0]
    },
    pickCountry(country) {
      this.pickedCountry = country
    },
    pickDeliveryType(deliveryType) {
      this.delivery.pickedType = deliveryType
    },
    pickPaymentType(paymentType) {
      console.log(paymentType)
      this.delivery.pickedPaymentType = paymentType
    }
  }
})
