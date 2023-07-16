<template>
  <aside
    id="section-sidebar"
    :class="
      'fixed top-0 left-0 z-50 w-full sm:w-96 h-screen transition-transform font-rubik ' + getStyle
    "
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-background">
      <span><h1 class="text-2xl px-5 font-body">Категорії</h1></span>
      <button
        class="text-gray-400 bg-transparent hover:text-gray-900 rounded-3xl text-sm p-1.5 absolute top-2.5 right-6 inline-flex items-center hover:bg-gray-600"
        @click="closeSidebar('sections')"
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
      <ul v-if="currentSection" class="space-y-2 font-medium mt-6">
        <sidebar-item
          v-if="!currentSection.root"
          icon="arrow-left"
          title="Назад"
          title-style="text-base"
          class="bg-deepgreen"
          @click="back"
        />
        <sidebar-item
          v-if="!currentSection.root"
          title="Показати всі"
          title-style="text-base"
          class="bg-deepgreen"
          @click="showAll"
        />
        <sidebar-item
          v-for="section in currentSection.sections"
          :key="section.key"
          :title="section.name"
          title-style="text-base"
          @click="pickSection(section.key)"
        />
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useSectionStore } from '../../../stores/section'
import { useSidebarStore } from '../../../stores/sidebar'
import SidebarItem from './SectionSidebarItem.vue'
export default {
  components: { SidebarItem },
  computed: {
    ...mapWritableState(useSectionStore, ['sections', 'rootPath', 'currentSection']),
    getStyle() {
      return this.getSidebar('sections').style
    }
  },
  async mounted() {
    await this.loadSectionNames()
  },

  methods: {
    ...mapActions(useSectionStore, ['loadSectionNames', 'back', 'pickSection', 'showAll']),
    ...mapActions(useSidebarStore, ['getSidebar', 'closeSidebar', 'closeSidebars'])
  }
}
</script>
