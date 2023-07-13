import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useModalStore } from './modal'

export const useAdminStore = defineStore('admin', {
  state() {
    return {}
  },
  actions: {
    ...mapActions(useApiStore, ['get', 'post', 'patch', 'delete']),
    ...mapActions(useModalStore, ['showModal']),
    async getAllEntity(name) {
      console.log(name)
      const data = await this.get(name, true)
      return ['product'].includes(name) ? data.result : data
    },
    async create() {
      // console.log('create', name)
      this.showModal('createEntity', 'admin-modal')
    }
  }
})
