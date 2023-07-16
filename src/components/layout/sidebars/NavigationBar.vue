<template>
  <aside
    id="navigation-sidebar"
    :class="
      'fixed top-0 left-0 z-20 w-full sm:w-40 h-screen hidden ease-linear xl:flex ' + getStyle
    "
  >
    <div :class="'w-full mb-auto flex overflow-y-auto ml-10 mt-8 ' + marginTop">
      <div class="border-[3px] rounded-full px-5 py-[65px] mx-auto bg-background">
        <img class="absolute -ms-7 z-20" src="../../../assets/star-1.png" alt="star" />
        <img class="absolute mt-24 -ms-7 z-20" src="../../../assets/star-2.png" alt="star" />
        <img class="absolute mt-52 ms-[37px] z-20" src="../../../assets/star-2.png" alt="star" />
        <img class="absolute mt-72 -ms-[27px] z-20" src="../../../assets/star-1.png" alt="star" />
        <ul class="space-y-10 [&>li]:mx-auto [&>li]:hover:cursor-pointer">
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'list']"
              style="color: #ffffff"
              @click="openSidebar('sections')"
            />
          </li>
          <li>
            <router-link
              :key="$route.fullPath"
              :to="{ name: 'AllProducts', params: { type: 'book' } }"
            >
              <font-awesome-icon
                class="w-6"
                size="lg"
                :icon="['fas', 'book-open']"
                style="color: #ffffff"
              />
            </router-link>
          </li>
          <li>
            <router-link
              :key="$route.fullPath"
              :to="{ name: 'AllProducts', params: { type: 'e-book' } }"
            >
              <font-awesome-icon
                class="w-6"
                size="lg"
                :icon="['fas', 'cloud-arrow-down']"
                style="color: #ffffff"
              />
            </router-link>
          </li>
          <li>
            <router-link
              :key="$route.fullPath"
              :to="{ name: 'AllProducts', params: { type: 'audiobook' } }"
            >
              <font-awesome-icon
                class="w-6"
                size="lg"
                :icon="['fas', 'headphones']"
                style="color: #ffffff"
              />
            </router-link>
          </li>
          <li>
            <router-link
              :key="$route.fullPath"
              :to="{ name: 'AllProducts', params: { type: 'board-game' } }"
            >
              <font-awesome-icon
                class="w-6"
                size="lg"
                :icon="['fas', 'puzzle-piece']"
                style="color: #ffffff"
              />
            </router-link>
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'book-bookmark']"
              style="color: #ffffff"
            />
          </li>
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
  computed: {
    marginTop() {
      // return this.isScrolled ? 'mt-4' : 'mt-48'
      return this.isScrolled
        ? ' transform translate-y-0 duration-300 '
        : ' transform translate-y-36 duration-300 '
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 145) this.isScrolled = true
      else this.isScrolled = false
    })
  },
  methods: {
    ...mapActions(useSidebarStore, ['openSidebar'])
  }
}
</script>

<style></style>
