import { defineStore } from 'pinia'

// const openedSidebarStyle = 'transform-none'
// const closedLeftSidebarClass = '-translate-x-full'
// const closedRightSidebarClass = 'translate-x-full'
const overflow = document.createElement('div')

overflow.className = 'bg-gray-900 bg-opacity-50 dark:bg-opacity-70 fixed inset-0 z-20'

export const useModalStore = defineStore('modal', {
  state: () => ({
    modals: [
      { name: 'login', isOpen: false, style: '' },
      { name: 'signup', isOpen: false, style: '' },
      { name: 'restore', isOpen: false, style: '' }
    ]
  }),
  actions: {
    getModal(modalName) {
      return this.modals.find((e) => e.name === modalName)
    },
    showModal(modalName) {
      const modal = this.getModal(modalName)
      if (modal) {
        modal.isOpen = true
        // modal.style = this.openedSidebarClass

        if (!document.body.classList.contains('overflow-hidden')) {
          document.body.classList.add('overflow-hidden')
        }

        overflow.onclick = this.hideModals
        overflow.id = modal.name
        document.body.appendChild(overflow)
      }
    },
    hideModal(modalName) {
      console.log('hideModal: ' + modalName)

      const modal = this.getModal(modalName)
      if (modal) {
        modal.isOpen = false
        // modal.style =
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
    },
    hideModals() {
      console.log('hideModals')
      document.body.classList.remove('overflow-hidden')
      document.body.removeChild(overflow)
    }
  }
})
