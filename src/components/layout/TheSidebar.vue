<template>
  <!-- <div class="flex h-screen bg-red-400">
    <ul>
      <li class="bg-red-800 mb-3" v-for="x in 10" :key="x">{{ x }}</li>
    </ul>
  </div> -->

  <!-- <span class="absolute text-white text-4xl top-5 left-4 cursor-pointer" @click="openSidebar">
    <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
  </span> -->
  <button
    data-collapse-toggle="mobile-menu-2"
    type="button"
    class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="mobile-menu-2"
    aria-expanded="false"
    @click="openSidebar"
  >
    <span class="sr-only">Open main menu</span>
    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
  <div
    v-show="display"
    class="z-50 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
  >
    <div class="text-gray-100 text-xl">
      <div class="p-2.5 mt-1 flex items-center">
        <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600">logo</i>
        <h1 class="font-bold text-gray-200 text-[15px] ml-3">historium</h1>
        <i class="bi bi-x cursor-pointer ml-28 lg:hidden" @click="openSidebar">O</i>
      </div>
      <div class="my-2 bg-gray-600 h-[1px]"></div>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-house-door-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Категорії книг</span>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Кошик</span>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">0-800-333-444</span>
    </div>
    <div class="my-4 bg-gray-600 h-[1px]"></div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      @click="dropdown"
    >
      <i class="bi bi-chat-left-text-fill">X</i>
      <div class="flex justify-between w-full items-center">
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Паперові книги</span>
        <span class="text-sm rotate-180" id="arrow">
          <i class="bi bi-chevron-down">X</i>
        </span>
      </div>
    </div>
    <div class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold" id="submenu">
      <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">1</h1>
      <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">2</h1>
      <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">3</h1>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Електронні книги</span>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Аудіокниги</span>
    </div>
    <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-bookmark-fill">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Інше</span>
    </div>
    <!-- <div
      class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
    >
      <i class="bi bi-box-arrow-in-right">X</i>
      <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
    </div> -->
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      display: false
    }
  },
  methods: {
    dropdown() {
      console.log('x')
    },
    openSidebar() {
      this.display = !this.display
    }
  }
}
</script>
