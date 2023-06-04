<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-full xs:w-64 h-screen transition-transform -translate-x-full xl:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-primary-950">
      <button
        type="button"
        data-drawer-hide="default-sidebar"
        aria-controls="default-sidebar"
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
      <ul class="space-y-2 font-medium mt-6">
        <li>
          <a
            @click="openSectionSidebar"
            data-drawer-target="section-sidebar"
            data-drawer-toggle="section-sidebar"
            aria-controls="section-sidebar"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Категорії</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  data: function () {
    return {
      display: false,
      types: [
        {
          _id: '646622f5eadf03bd22d5e987',
          name: 'Книга'
        },
        {
          _id: '646756b056db96bcce3c0673',
          name: 'Електронна книга'
        },
        {
          _id: '646756e756db96bcce3c0684',
          name: 'Аудіокнига'
        }
      ]
    }
  },
  methods: {
    dropdown() {
      console.log('x')
    },
    openSidebar() {
      this.display = !this.display
    },
    openSectionSidebar() {}
  }
}
</script>
