import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faReadme, faTelegram } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowLeft,
  faArrowRight,
  faArrowRightFromBracket,
  faBagShopping,
  faBook,
  faBookBookmark,
  faBookOpen,
  faBookmark,
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faClipboard,
  faClock,
  faCloudArrowDown,
  faEllipsis,
  faFilter,
  faGear,
  faGift,
  faHeadphones,
  faImage,
  faLanguage,
  faList,
  faListCheck,
  faPen,
  faPencil,
  faPhone,
  faPlus,
  faPuzzlePiece,
  faSearch,
  faTrashCan,
  faTruck,
  faUser,
  faUsers,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import SyncLoader from 'vue-spinner/src/SyncLoader.vue'

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
  faListCheck,
  faPlus,
  faSearch,
  faInstagram,
  faTelegram,
  faFacebook,
  faFilter,
  faClock,
  faReadme,
  faArrowRight
)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('PulseLoader', SyncLoader)

app.mount('#app')
