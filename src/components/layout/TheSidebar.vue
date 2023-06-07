<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-full xs:w-64 h-screen transition-transform -translate-x-full xl:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div class="inline-flex">
        <img src="src/assets/logo.png" class="ps-2 h-10" alt="Historium Logo" />
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
      </div>
      <ul class="space-y-2 font-medium mt-6">
        <the-sidebar-item title="Категорії книг" icon="list" />
        <the-sidebar-item title="Кошик" icon="cart-shopping" />
        <the-sidebar-item
          title="0-800-335-400"
          icon="phone"
          description="Без вихідних, з 8 до 21"
        />
        <hr />
        <the-sidebar-item title="Паперові книги" icon="book" />
        <the-sidebar-item title="Електронні книги" icon="cloud-arrow-down" />
        <the-sidebar-item title="Аудіокниги" icon="headphones" />
        <the-sidebar-item
          title="Інше"
          icon="ellipsis"
          description="Ігри, аксесуари, подарунки тощо"
        />
      </ul>
    </div>
  </aside>
</template>

<script>
import TheSidebarItem from './TheSidebarItem.vue'
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
  components: { TheSidebarItem },
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
