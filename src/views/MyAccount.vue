<template>
  <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl text-center font-sans leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Ваш аккаунт
      </h1>
      <ul class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        <li
          class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-for="field of Object.entries(userStore.user)"
          :key="field"
        >
          {{ field[0] }}: {{ field[1] }}
        </li>
      </ul>
      <button
        class="p-2 ml-1 w-max text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        @click="userStore.logout"
      >
        logout
      </button>
    </div>
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
