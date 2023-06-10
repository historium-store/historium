import { defineStore } from 'pinia'
import { useApiStore } from './api'

const openedSidebarStyle = 'transform-none'
const closedLeftSidebarClass = '-translate-x-full'
const closedRightSidebarClass = 'translate-x-full'
const overflow = document.createElement('div')
overflow.className = 'bg-gray-900 bg-opacity-50 dark:bg-opacity-70 fixed inset-0 z-20'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    api: useApiStore(),
    openedSidebarClass: openedSidebarStyle,
    closedLeftSidebarClass: closedLeftSidebarClass,
    closedRightSidebarClass: closedRightSidebarClass,
    sidebars: [
      { name: 'main', isOpen: false, style: closedLeftSidebarClass, align: 'left' },
      { name: 'sections', isOpen: false, style: closedLeftSidebarClass, align: 'left' },
      { name: 'cart', isOpen: false, style: closedRightSidebarClass, align: 'right' },
      { name: 'profile', isOpen: false, style: closedRightSidebarClass, align: 'right' }
    ]
  }),
  actions: {
    getSidebar(sidebarName) {
      return this.sidebars.find((e) => e.name === sidebarName)
    },
    openSidebar(sidebarName) {
      const sidebar = this.getSidebar(sidebarName)
      if (sidebar) {
        sidebar.isOpen = true
        sidebar.style = this.openedSidebarClass

        if (!document.body.classList.contains('overflow-hidden')) {
          document.body.classList.add('overflow-hidden')
        }

        overflow.onclick = this.closeSidebars
        overflow.id = sidebar.name
        document.body.appendChild(overflow)
      }
    },
    closeSidebar(sidebarName) {
      const sidebar = this.getSidebar(sidebarName)
      if (sidebar) {
        sidebar.isOpen = false
        sidebar.style =
          sidebar.align === 'right' ? this.closedRightSidebarClass : this.closedLeftSidebarClass
        document.body.classList.remove('overflow-hidden')

        document.body.removeChild(overflow)
      }
    },
    closeSidebars() {
      this.sidebars.forEach((s) => {
        s.isOpen = false
        s.style = s.align === 'right' ? this.closedRightSidebarClass : this.closedLeftSidebarClass
      })
      document.body.classList.remove('overflow-hidden')

      document.body.removeChild(overflow)
    }
  }
})
