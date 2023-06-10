<template>
  <aside
    id="profile-sidebar"
    :class="
      'fixed top-0 right-0 z-30 w-full sm:w-[400px] overflow-y-auto h-screen transition-transform ' +
      getStyle
    "
  >
    <div class="h-full flex flex-col px-3 py-4 bg-gray-50 dark:bg-gray-900">
      <div class="inline-flex">
        <span><h1 class="text-2xl">Акаунт</h1></span>
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
      <ul v-if="user" class="space-y-2 mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <li
          class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-for="field of Object.entries(user)"
          :key="field"
        >
          {{ field[0] }}: {{ field[1] }}
        </li>
      </ul>
      <button
        class="p-2 ml-1 w-max text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        @click="logout"
      >
        logout
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
    ...mapState(useAuthStore, ['user', 'isAuthenticated']),
    getStyle() {
      return this.getSidebar('profile').style
    }
  }
}
</script>
