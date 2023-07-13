<template>
  <aside
    id="filters-sidebar"
    :class="
      'overflow-y-auto fixed top-0 left-0 z-50 h-full w-full sm:w-80 transition-transform bg-background_light ' +
      getStyle
    "
  >
    <button
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      @click="closeSidebar('filters')"
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
    <filters />
  </aside>
</template>

<script>
import { mapActions } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import Filters from '../../filter/Filters.vue'
export default {
  components: { Filters },
  computed: {
    getStyle() {
      return this.getSidebar('filters').style
    }
  },
  methods: {
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar'])
  }
}
</script>
