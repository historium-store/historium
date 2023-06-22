import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { useValidateField, useField } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUser,
  faCartShopping,
  faBookmark,
  faBagShopping,
  faList,
  faPhone,
  faBook,
  faHeadphones,
  faCloudArrowDown,
  faEllipsis,
  faChevronDown,
  faChevronUp,
  faUsers,
  faGear,
  faPen,
  faLanguage,
  faImage,
  faClipboard,
  faTrashCan,
  faXmark,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faCartShopping,
  faBookmark,
  faBagShopping,
  faList,
  faPhone,
  faBook,
  faHeadphones,
  faCloudArrowDown,
  faEllipsis,
  faChevronDown,
  faChevronUp,
  faUsers,
  faGear,
  faPen,
  faLanguage,
  faImage,
  faClipboard,
  faTrashCan,
  faXmark,
  faArrowLeft
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
