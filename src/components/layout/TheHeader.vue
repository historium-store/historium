<template>
  <header class="xl:ml-64 p-0">
    <nav class="border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
        <div class="flex flex-wrap items-center">
          <button
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            @click="openSidebar('main')"
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
              />
            </svg>
          </button>
          <RouterLink to="/" class="flex mx-4 items-center">
            <img src="/src/assets/historium-logo.svg" class="h-12 sm:h-14" alt="Historium Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white" />
          </RouterLink>
        </div>
        <the-search name="pc" class="max-[640px]:hidden" />
        <div class="flex flex-wrap items-center">
          <div class="flex">
            <RouterLink to="/user/wishlist" class="bookmark px-2">
              <div
                class="ml-2 top-6 w-5 h-5 sm:w-4 sm:h-4 rounded-full bg-turquoise items-center flex absolute"
              >
                <p class="mx-auto mt-1 sm:mt-0 sm:text-xs">
                  {{ wishlistItemsQuantity }}
                </p>
              </div>

              <font-awesome-icon
                size="xl"
                class="max-sm:text-2xl"
                :icon="['fas', 'bookmark']"
                style="color: #ffffff"
              />
            </RouterLink>
            <span class="px-2 hover:cursor-pointer" @click="openSidebar('cart')">
              <div
                class="ml-3 top-6 w-5 h-5 sm:w-4 sm:h-4 rounded-full bg-turquoise items-center flex absolute"
              >
                <p class="mx-auto mt-1 sm:mt-0 sm:text-xs">{{ cart?.items?.length }}</p>
              </div>
              <font-awesome-icon
                size="xl"
                class="max-sm:text-2xl"
                :icon="['fas', 'cart-shopping']"
                style="color: #ffffff"
              />
            </span>
            <div class="user px-2">
              <span class="hover:cursor-pointer" @click="profileClick">
                <font-awesome-icon
                  size="xl"
                  class="max-sm:text-2xl"
                  :icon="['fas', 'user']"
                  style="color: #ffffff"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <the-search name="phone" class="mt-5 min-[640px]:hidden" />
      <div class="flex justify-center xs:max-sm:hidden">
        <ul class="flex items-center my-3 [&>li]:px-4 [&>li]:hover:cursor-pointer">
          <li>
            <RouterLink to="/">Головна</RouterLink>
          </li>
          <li @click="scrollTo('novelties')">Новинки</li>
          <li @click="scrollTo('recomendations')">Хіти продажів</li>
          <li><RouterLink to="/about">Про компанію</RouterLink></li>
          <li><RouterLink to="/contacts">Контакти</RouterLink></li>
        </ul>
      </div>
    </nav>
  </header>
  <!-- <login-view :isShowModal="true" :closeModal="closeModal"></login-view> -->
</template>

<script>
// import { Modal } from 'flowbite-vue'
import { useAuthStore } from '@/stores/auth.js'
import { mapActions, mapWritableState } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from '../../stores/cart'
import { useModalStore } from '../../stores/modal'
import { useSidebarStore } from '../../stores/sidebar'
import { useUserStore } from '../../stores/user'
import TheSearch from '../layout/TheSearch.vue'
export default {
  components: { TheSearch },
  props: ['openModal', 'switchModal'],
  setup() {
    const authStore = useAuthStore()
    const querySearch = ref('')
    return { authStore, querySearch }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart']),
    ...mapWritableState(useUserStore, ['user', 'wishlistItemsQuantity']),
    ...mapWritableState(useAuthStore, ['isAuthenticated'])
  },
  methods: {
    ...mapActions(useSidebarStore, ['openSidebar']),
    ...mapActions(useModalStore, ['showModal']),
    loginClick() {
      this.showModal('login')
    },
    async profileClick() {
      if (!this.authStore.isAuthenticated) {
        this.loginClick()
      } else this.openSidebar('profile')
    },
    async scrollTo(section) {
      if (window.location.pathname != '/') {
        await this.$router.push('/')
      }
      document.getElementById(section).scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        window.scrollBy({ behavior: 'smooth', top: -12 })
      }, 400)
    }
  }
}
</script>
