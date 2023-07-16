import { defineStore, mapActions } from 'pinia'
import { useApiStore } from './api'
import { useAuthStore } from './auth'
export const useSpecialStore = defineStore('special', {
  state: () => ({
    specialSections: {
      novelties: undefined,
      recomendations: undefined,
      history: undefined
    }
  }),
  actions: {
    ...mapActions(useApiStore, ['get']),
    async loadNovelties() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      this.specialSections.novelties = data.result
    },
    async loadRecomendations() {
      const data = await this.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'asc',
        limit: 12
      })
      this.specialSections.recomendations = data.result
    },
    async loadHistory() {
      if (useAuthStore().isAuthenticated) {
        this.history = await this.get(`user/history`, true)
      } else {
        this.specialSections.history = JSON.parse(localStorage.getItem('history')) || []
      }
    }
  }
})
