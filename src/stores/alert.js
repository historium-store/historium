import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state() {
    return {
      duration: 2500,
      title: 'Товар додано',
      color: 'bg-cart-light'
    }
  },
  actions: {
    showAlert(title, color = 'bg-cart-light') {
      this.title = title
      this.color = color
      const alert = document.getElementById('alert')
      if (alert) {
        alert.classList.add('translate-y-[100px]')
        setTimeout(() => {
          alert.classList.remove('translate-y-[100px]')
        }, this.duration)
      }
    }
  }
})
