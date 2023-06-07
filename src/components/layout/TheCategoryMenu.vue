<template>
  <aside
    id="section-sidebar"
    class="fixed top-0 left-0 z-50 w-full xs:w-64 h-screen transition-transform -translate-x-full xl:translate-x-0"
    aria-label="Sidebar 2"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <ul class="space-y-2 font-medium">
        <!--  -->
        <the-sidebar-item
          @click="pickSection(section.key)"
          v-for="section in sections"
          :key="section.key"
          :title="section.name"
          titleStyle="text-sm"
          icon="book"
        />
      </ul>
    </div>
  </aside>
</template>

<script>
import router from '../../router'
import { mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import TheSidebarItem from './TheSidebarItem.vue'
export default {
  data() {
    return {
      isNested: false,
      path: '/section'
    }
  },
  components: { TheSidebarItem },
  computed: {
    ...mapWritableState(useProductStore, ['sections'])
  },
  methods: {
    async pickSection(key) {
      console.log(key)
      const pick = this.sections.find((section) => section.key === key)
      if (pick?.sections?.length) {
        this.isNested = true
        this.path += `/${pick.key}`
        // console.log(pick.sections)
        this.sections = pick.sections
      } else await router.push(`${this.path}/${pick.key}`)
    },
    toogleSidebar() {
      this.display = !this.display
    }
  }
}
</script>
