<template>
  <aside
    id="main-sidebar"
    :class="'fixed top-0 left-0 z-50 w-full sm:w-64 h-screen transition-transform ' + getStyle"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-background">
      <div class="inline-flex">
        <img src="../../../assets/wb-logo.png" class="ps-2 h-10" alt="Historium Logo" />
        <button
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          @click="closeSidebar('main')"
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
            />
          </svg>
          <span class="sr-only">Close menu</span>
        </button>
      </div>
      <ul class="space-y-2 font-medium mt-6">
        <sidebar-item title="Категорії книг" icon="list" @click="openSidebar('sections')" />
        <sidebar-item title="Кошик" icon="cart-shopping" @click="openSidebar('cart')" />
        <sidebar-item title="0-800-335-400" icon="phone" description="Без вихідних, з 8 до 21" />
        <hr />
        <sidebar-item title="Паперові книги" icon="book" />
        <sidebar-item title="Електронні книги" icon="cloud-arrow-down" />
        <sidebar-item title="Аудіокниги" icon="headphones" />
        <sidebar-item title="Інше" icon="ellipsis" description="Ігри, аксесуари, подарунки тощо" />
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import SidebarItem from './SectionSidebarItem.vue'
export default {
  components: { SidebarItem },
  computed: {
    getStyle() {
      return this.getSidebar('main').style
    }
  },
  methods: {
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar'])
  }
}
</script>
