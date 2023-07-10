<template>
  <header class="xl:ml-64 p-0">
    <nav class="border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
        <div class="flex flex-wrap items-center">
          <button
            @click="openSidebar('main')"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <RouterLink to="/" class="flex mx-4 items-center">
            <img src="/src/assets/logo.png" class="h-10 sm:h-11" alt="Historium Logo" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            ></span>
          </RouterLink>
        </div>
        <div class="flex flex-1 px-6 items-center xs:max-[550px]:hidden">
          <the-search></the-search>
        </div>
        <div class="flex flex-wrap items-center">
          <div class="flex">
            <div class="bookmark px-2">
              <div class="ml-2 top-5 w-3 h-3 rounded-full bg-cart-light items-center flex absolute">
                <p class="mx-auto text-xs">{{ user?.wishlist?.length }}</p>
              </div>
              <font-awesome-icon
                size="lg"
                class="max-sm:text-2xl"
                :icon="['fas', 'bookmark']"
                style="color: #ffffff"
              />
            </div>
            <span @click="openSidebar('cart')" class="px-2 hover:cursor-pointer">
              <div class="ml-3 top-5 w-3 h-3 rounded-full bg-cart-light items-center flex absolute">
                <p class="mx-auto text-xs">{{ cart?.items?.length }}</p>
              </div>
              <font-awesome-icon
                size="lg"
                class="max-sm:text-2xl"
                :icon="['fas', 'cart-shopping']"
                style="color: #ffffff"
              />
            </span>
            <div class="user px-2">
              <span class="hover:cursor-pointer" @click="profileClick">
                <font-awesome-icon
                  size="lg"
                  class="max-sm:text-2xl"
                  :icon="['fas', 'user']"
                  style="color: #ffffff"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center xs:max-sm:hidden">
        <ul class="flex items-center my-2 [&>li]:px-3 [&>li]:hover:cursor-pointer">
          <li><RouterLink to="/">Головна</RouterLink></li>
          <li @click="scrollTo('novelties')">Новинки</li>
          <li @click="scrollTo('recomendations')">Хіти продажів</li>
          <li>Про компанію</li>
          <li>Акції</li>
          <li>Контакти</li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- <login-view :isShowModal="true" :closeModal="closeModal"></login-view> -->
</template>

<script>
// import { Modal } from 'flowbite-vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import TheSearch from '../layout/TheSearch.vue'
import { useSidebarStore } from '../../stores/sidebar'
import { mapActions, mapWritableState } from 'pinia'
import { useModalStore } from '../../stores/modal'
import { useCartStore } from '../../stores/cart'
import { useUserStore } from '../../stores/user'
export default {
  props: ['openModal', 'switchModal'],
  setup() {
    const userStore = useAuthStore()
    const querySearch = ref('')
    return { userStore, querySearch }
  },
  components: { TheSearch },
  methods: {
    ...mapActions(useSidebarStore, ['openSidebar']),
    ...mapActions(useModalStore, ['showModal']),
    loginClick() {
      this.showModal('login')
    },
    async profileClick() {
      if (!this.userStore.isAuthenticated) {
        this.loginClick()
      } else this.openSidebar('profile')
    },
    scrollTo(section) {
      document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        window.scrollBy({ behavior: 'smooth', top: -12 })
      }, 400)
    }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart']),
    ...mapWritableState(useUserStore, ['user'])
  }
}
</script>
