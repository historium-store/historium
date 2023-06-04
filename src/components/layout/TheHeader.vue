<template>
  <header class="xl:ml-64 p-0">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-primary-1000">
      <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
        <div class="flex flex-wrap items-center">
          <!-- <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            @click="openSidebar"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> -->
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <RouterLink to="/" class="flex items-center ml-3">
            <img src="src/assets/logo.png" class="ml-3 h-10 sm:h-12" alt="Historium Logo" />
            <span
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            ></span>
          </RouterLink>
        </div>
        <div class="flex flex-wrap items-center xs:max-sm:hidden">
          <the-search :query="querySearch"></the-search>
        </div>
        <div class="flex flex-wrap items-center">
          <div class="flex">
            <div class="hover:cursor-pointer" v-if="!userStore.isAuthenticated" @click="loginClick">
              (log)
            </div>
            <RouterLink v-else to="/my-account">(acc)</RouterLink>
          </div>
        </div>
        <div v-show="currentMode === 'sm'" class="flex mt-3 mx-5 w-full items-center">
          <the-search></the-search>
        </div>
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
export default {
  props: ['openModal', 'switchModal'],
  setup() {
    const userStore = useAuthStore()
    const screenModes = ['sm', 'ms', 'lg']
    const currentMode = ref(undefined)
    const querySearch = ref('')
    return { userStore, screenModes, currentMode, querySearch }
  },
  components: { TheSearch },
  mounted() {
    this.onResize()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    openSidebar() {
      console.log('open sidebar')
    },
    loginClick() {
      this.switchModal('login')
      this.openModal()
    },
    onResize() {
      if (window.innerWidth < 640) {
        this.currentMode = this.screenModes[0]
      } else this.currentMode = this.screenModes[1]
    }
  }
}
</script>
