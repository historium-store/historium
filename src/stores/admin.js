import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'

export const useAdminStore = defineStore('admin', {
  state() {
    return {}
  },
  actions: {
    ...mapActions(useApiStore, ['get', 'post', 'patch', 'delete']),
    async getAllInstance(name) {
      console.log(name)
      const response = await this.get(name, true)
      return ['product'].includes(name) ? response.data.result : response.data
    }
  }
})
