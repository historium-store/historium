<template>
  <aside
    id="profile-sidebar"
    :class="
      'fixed right-0 sm:right-10 z-50 w-full sm:w-[350px] transition-transform duration-500 ' +
      getStyle
    "
  >
    <!-- <div class="fixed">
      <img class="" src="src/assets/profile-border.png" alt="" />
    </div> -->

    <div class="px-3 py-4 bg-turquoise">
      <div class="border-t-2 border-x-2 rounded-t-2xl p-4 space-y-5 flex flex-col">
        <div class="inline-flex mx-auto mt-4">
          <span><h1 class="text-2xl">Профіль</h1></span>
          <div
            class="flex items-center w-8 h-8 hover:cursor-pointer hover:bg-slate-100 rounded-full absolute top-18 right-12"
          >
            <font-awesome-icon
              @click="closeSidebar('profile')"
              size="xl"
              class="max-sm:text-xl mx-auto"
              :icon="['fas', 'xmark']"
              style="color: #ffffff"
            />
          </div>
        </div>
        <hr class="" />
        <div class="inline-flex space-x-8 items-center px-3">
          <div class="flex items-center bg-slate-600 rounded-full w-14 h-14">
            <font-awesome-icon
              size="lg"
              class="max-sm:text-2xl mx-auto"
              :icon="['fas', 'user']"
              style="color: #ffffff"
            />
          </div>
          <div class="">
            <p class="text-lg">{{ fullName }}</p>
            <p class="tracking-widest">{{ user?.phoneNumber }}</p>
          </div>
        </div>
        <hr class="" />
        <div>
          <ul class="space-y-3 [&>li]:hover:cursor-pointer">
            <li class="px-3">
              <router-link
                :to="{
                  name: 'orders'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'truck']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Мої замовлення</p>
              </router-link>
            </li>
            <li class="px-3">
              <router-link
                :to="{
                  name: 'wishlist'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'bookmark']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Бажані товари</p>
              </router-link>
            </li>
            <li class="px-3">
              <div class="inline-flex space-x-3 items-center">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'list-check']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Товари в очікуванні</p>
              </div>
            </li>
            <li class="px-3">
              <div class="inline-flex space-x-3 items-center">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'book']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Моя бібліотека</p>
              </div>
            </li>
            <li class="px-3">
              <div class="inline-flex space-x-3 items-center">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'gift']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Бонуси</p>
              </div>
            </li>
            <hr class="" />

            <li class="px-3">
              <div class="inline-flex space-x-3 items-center">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'gear']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Налаштування</p>
              </div>
            </li>
            <hr class="" />
            <li class="px-3">
              <div class="inline-flex space-x-3 items-center" @click="logout">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'arrow-right-from-bracket']"
                    style="color: #0e6060"
                  />
                </div>
                <p>Вихід</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- <button
        class="p-2 w-full rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        @click="logout"
      >
        Вихід
      </button> -->
      </div>
    </div>
    <img class="max-md:w-full" src="../../../assets/profile-bottom.png" alt="" />
  </aside>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import { useAuthStore } from '../../../stores/auth'
import { useAlertStore } from '../../../stores/alert'
import { useUserStore } from '../../../stores/user'

export default {
  methods: {
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useAuthStore, { authLogout: 'logout' }),
    async logout() {
      this.closeSidebars()
      this.showAlert('Успішний вихід з аккаунту', 'bg-red-400')
      await this.authLogout()
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    ...mapState(useUserStore, ['user', 'fullName']),
    getStyle() {
      return this.getSidebar('profile').style
    }
  }
}
</script>
