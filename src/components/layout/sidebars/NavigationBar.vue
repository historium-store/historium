<template>
  <aside
    id="navigation-sidebar"
    :class="
      'fixed top-0 left-0 z-20 w-full sm:w-44 h-screen transition-transform hidden xl:flex ' +
      getStyle
    "
  >
    <div :class="'w-full mb-auto flex overflow-y-auto ml-14 ' + marginTop">
      <div class="border-[3px] rounded-full px-5 py-20 mx-auto bg-background">
        <ul class="space-y-10 [&>li]:mx-auto [&>li]:hover:cursor-pointer">
          <li>
            <font-awesome-icon
              @click="openSidebar('sections')"
              class="w-6"
              size="lg"
              :icon="['fas', 'list']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'book-open']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'cloud-arrow-down']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'headphones']"
              style="color: #ffffff"
            />
          </li>
          <!-- <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'pencil']"
              style="color: #ffffff"
            />
          </li> -->
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'puzzle-piece']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'book-bookmark']"
              style="color: #ffffff"
            />
          </li>
          <!-- <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'gift']"
              style="color: #ffffff"
            />
          </li> -->
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
export default {
  data: () => {
    return { isScrolled: false }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 150) this.isScrolled = true
      else this.isScrolled = false
    })
  },
  methods: {
    ...mapActions(useSidebarStore, ['openSidebar'])
  },
  computed: {
    marginTop() {
      return this.isScrolled ? 'mt-4' : 'mt-48'
    }
  }
}
</script>

<style></style>
