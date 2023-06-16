import { defineStore } from 'pinia'

const openedSidebarStyle = 'transform-none'
const closedLeftSidebarClass = '-translate-x-full'
const closedRightSidebarClass = 'translate-x-full'
const closedTopSidebarClass = '-translate-y-full'

const overflow = document.createElement('div')
overflow.className = 'bg-gray-900 bg-opacity-70 fixed inset-0 z-20'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    sidebars: [
      { name: 'main', isOpen: false, style: closedLeftSidebarClass, align: 'left' },
      { name: 'sections', isOpen: false, style: closedLeftSidebarClass, align: 'left' },
      { name: 'cart', isOpen: false, style: closedTopSidebarClass, align: 'top' },
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
        sidebar.style = openedSidebarStyle

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
        this.setSidebarStyle(sidebar)
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
    },
    closeSidebars() {
      if (this.sidebars.find((s) => s.isOpen === true)) {
        this.sidebars.forEach((s) => {
          s.isOpen = false
          this.setSidebarStyle(s)
        })
        document.body.classList.remove('overflow-hidden')
        document.body.removeChild(overflow)
      }
    },
    setSidebarStyle(sidebar) {
      switch (sidebar.align) {
        case 'right': {
          sidebar.style = closedRightSidebarClass
          break
        }
        case 'left': {
          sidebar.style = closedLeftSidebarClass
          break
        }
        case 'top': {
          sidebar.style = closedTopSidebarClass
          break
        }
      }
    }
  }
})
