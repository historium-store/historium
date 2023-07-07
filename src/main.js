import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import { useValidateField, useField } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
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
  faArrowLeft,
  faPuzzlePiece,
  faPencil,
  faBookBookmark,
  faBookOpen,
  faGift,
  faTruck,
  faArrowRightFromBracket,
  faListCheck
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
  faArrowLeft,
  faPuzzlePiece,
  faPencil,
  faBookBookmark,
  faBookOpen,
  faGift,
  faTruck,
  faArrowRightFromBracket,
  faListCheck
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('pulse-loader', SyncLoader)

app.mount('#app')
