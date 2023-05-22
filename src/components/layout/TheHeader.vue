<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-primary-1000">
      <div class="flex flex-wrap justify-between mx-auto max-w-screen-xl">
        <div class="flex flex-wrap items-center">
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
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
          </button>
        </div>
        <div class="flex flex-wrap items-center">
          <div class="relative flex flex-wrap items-stretch">
            <input
              type="search"
              class="relative m-0 block w-max min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Пошук"
              aria-label="Пошук"
              aria-describedby="button-addon2"
            />

            <!--Search icon-->
            <span
              class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="flex flex-wrap items-center">
          <div class="flex items-center lg:order-2">
            <router-link
              v-if="!userStore.isAuthenticated"
              to="/login"
              class="text-black dark:text-white focus:ring-4 hover:bg-primary-200 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-primary-700"
              >Увійти</router-link
            >
            <router-link
              v-else
              to="/my-account"
              class="text-black dark:text-white focus:ring-4 hover:bg-primary-200 font-medium rounded-md text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-primary-700"
              >{{ userStore?.user?.firstName }}</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
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
