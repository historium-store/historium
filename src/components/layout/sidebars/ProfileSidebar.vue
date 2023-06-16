<template>
  <aside
    id="profile-sidebar"
    :class="
      'fixed top-0 right-0 z-30 w-full sm:w-[400px] overflow-y-auto h-screen transition-transform ' +
      getStyle
    "
  >
    <div class="h-screen space-y-5 flex flex-col px-3 py-4 bg-background">
      <div class="inline-flex">
        <span><h1 class="text-2xl">Профіль</h1></span>
        <button
          @click="closeSidebar('profile')"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
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
          <span class="sr-only">Close menu</span>
        </button>
      </div>
      <div class="inline-flex space-x-8 items-center">
        <div class="flex items-center bg-slate-600 rounded-full w-10 h-10">
          <font-awesome-icon
            size="lg"
            class="max-sm:text-2xl mx-auto"
            :icon="['fas', 'user']"
            style="color: #ffffff"
          />
        </div>
        <div class="tracking-widest">
          <p>{{ fullName }}</p>
          <p>{{ user?.phoneNumber }}</p>
        </div>
      </div>
      <hr class="" />
      <div>
        <ul class="space-y-2">
          <li class="p-3"><p>Замовлення</p></li>
          <li class="p-3"><p>Моя бібліотека</p></li>
          <li class="p-3"><p>Бажані книги</p></li>
          <li class="p-3"><p>Товари в очікуванні</p></li>
          <li class="p-3"><p>Бонуси</p></li>
        </ul>
      </div>
      <hr class="" />
      <ul class="">
        <li class="p-3"><p>Налаштування</p></li>
      </ul>
      <hr class="" />
      <button
        class="p-2 w-full rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        @click="logout"
      >
        Вихід
      </button>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import { useAuthStore } from '../../../stores/auth'

export default {
  methods: {
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useAuthStore, { authLogout: 'logout' }),
    logout() {
      this.closeSidebars()
      this.authLogout()
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user', 'isAuthenticated', 'fullName']),
    getStyle() {
      return this.getSidebar('profile').style
    }
  }
}
</script>
