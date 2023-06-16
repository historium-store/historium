import { defineStore } from 'pinia'

const overflow = document.createElement('div')

overflow.className = 'bg-gray-900 bg-opacity-70 dark:bg-opacity-80 fixed inset-0 z-40'

const modals = ['login', 'signup', 'restore', 'search']

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: modals,
    currentModal: modals[0],
    isActive: false
  }),
  actions: {
    getModal(modalName) {
      return this.modals.find((m) => m === modalName)
    },
    showModal(modalName) {
      const modal = this.getModal(modalName)
      if (modal) {
        this.currentModal = modal
        document.getElementById('modal').classList.remove('hidden')
        if (!document.body.classList.contains('overflow-hidden')) {
          document.body.classList.add('overflow-hidden')
        }

        overflow.onclick = this.hideModals
        overflow.id = modal
        document.body.appendChild(overflow)
      }
    },
    hideModal(modalName) {
      const modal = this.getModal(modalName)
      if (modal) {
        document.getElementById('modal').classList.add('hidden')
        this.isActive = false
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
    },
    hideModals() {
      document.getElementById('modal').classList.add('hidden')
      document.body.classList.remove('overflow-hidden')
      document.body.removeChild(overflow)
    }
  }
})
