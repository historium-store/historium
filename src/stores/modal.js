import { defineStore } from 'pinia'

const overflow = document.createElement('div')

overflow.className = 'bg-gray-900 bg-opacity-70 dark:bg-opacity-80 fixed inset-0 z-40'

const modals = [
  'login',
  'signup',
  'restore',
  'search',
  'createEntity',
  'editEntity',
  'removeEntity'
]

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: modals,
    currentModal: modals[0],
    isActive: false
  }),
  actions: {
    showModal(modalName, id = 'modal') {
      if (this.modals.includes(modalName)) {
        this.currentModal = modalName
        document.getElementById(id).classList.remove('hidden')
        if (!document.body.classList.contains('overflow-hidden')) {
          document.body.classList.add('overflow-hidden')
        }
        overflow.onclick = this.hideModals
        overflow.id = modalName
        document.body.appendChild(overflow)
      }
    },
    hideModal(modalName, id = 'modal') {
      if (this.modals.includes(modalName)) {
        document.getElementById(id).classList.add('hidden')
        this.isActive = false
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
    },
    hideModals() {
      const modal = document.getElementById('modal').classList.add('hidden')
      const adminModal = document.getElementById('admin-modal')

      if (modal) modal.classList.add('hidden')
      if (adminModal) adminModal.classList.add('hidden')

      document.body.classList.remove('overflow-hidden')
      if (document.body.contains(overflow)) document.body.removeChild(overflow)
    }
  }
})
