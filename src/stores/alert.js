import { defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', {
  state() {
    return {
      startAnimationDelay: 200,
      duration: 2500,
      title: '',
      color: 'bg-turquoise'
    }
  },
  actions: {
    showAlert(title, color = 'bg-turquoise') {
      this.$patch({ color, title })
      const alertInstance = document.getElementById('alert')
      if (alertInstance) {
        setTimeout(() => {
          let alert = alertInstance.cloneNode(true)
          alert.id = 'alert-' + Math.floor(Math.random() * Date.now()).toString(36)
          document.body.append(alert)

          setTimeout(() => {
            alert.classList.add('translate-y-[-100px]')
          }, this.startAnimationDelay)

          setTimeout(() => {
            alert.classList.remove('translate-y-[-100px]')
            setTimeout(() => {
              document.body.removeChild(alert)
            }, this.duration)
          }, this.duration)
        }, this.startAnimationDelay)
      }
    }
  }
})
