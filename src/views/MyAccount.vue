<template>
  <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
    <button
      class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      @click="userStore.logout"
    >
      LOGOUT
    </button>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth.js'
export default {
  setup() {
    const userStore = useAuthStore()
    return { userStore }
  }
}
</script>
