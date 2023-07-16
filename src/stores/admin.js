import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useModalStore } from './modal'

export const useAdminStore = defineStore('admin', {
  state() {
    return {
      currentEntity: {},
      pagination: {
        total: undefined,
        offset: 0,
        part: 10
      },
      entities: {
        product: {
          name: '',
          creators: [],
          type: '',
          price: 0,
          description: '',
          images: [],
          sections: [],
          requiresDelivery: false
        }
      },
      authors: [],
      product_types: [],
      sections: []
    }
  },
  actions: {
    ...mapActions(useApiStore, ['get', 'post', 'patch', 'delete']),
    ...mapActions(useModalStore, ['showModal']),
    async getEntity(name) {
      const data = await this.get(name, true, {
        offset: this.pagination.offset,
        limit: this.pagination.part
      })
      this.pagination.total = data.total
      this.currentEntity = ['product'].includes(name) ? data.result : data
    },
    async getAuthors() {
      this.authors = await this.get('author', true)
    },
    async getProductTypes() {
      this.product_types = await this.get('product-type', true)
    },
    async getSections() {
      this.sections = await this.get('section/names', true)
    },
    async createProductSubmit() {
      console.log(this.entities.product)
    },
    async create() {
      this.showModal('createEntity', 'admin-modal')
    },
    async edit() {
      this.showModal('editEntity', 'admin-modal')
    },
    async remove() {
      this.showModal('removeEntity', 'admin-modal')
    },
    async nextPart(name) {
      if (
        !this.pagination.total ||
        this.pagination.offset + this.pagination.part <= this.pagination.total
      ) {
        this.pagination.offset += this.pagination.part
        await this.getEntity(name)
      }
    },
    async prevPart(name) {
      if (this.pagination.offset - this.pagination.part >= 0) {
        this.pagination.offset -= this.pagination.part
        await this.getEntity(name)
      }
    },
    dropPagination() {
      this.pagination.offset = 0
    }
  }
})
