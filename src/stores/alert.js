import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state() {
    return {
      startAnimationDelay: 200,
      duration: 2500,
      title: 'Товар додано',
      color: 'bg-turquoise'
    }
  },
  actions: {
    showAlert(title, color = 'bg-turquoise') {
      this.title = title
      this.color = color
      const alert = document.getElementById('alert')
      if (alert) {
        setTimeout(() => {
          alert.classList.add('translate-y-[-100px]')
        }, this.startAnimationDelay)
        setTimeout(() => {
          alert.classList.remove('translate-y-[-100px]')
        }, this.duration)
      }
    }
  }
})
