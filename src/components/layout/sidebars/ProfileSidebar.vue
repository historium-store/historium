<template>
  <aside
    id="profile-sidebar"
    :class="
      'fixed right-0 sm:right-10 z-50 w-full sm:w-[360px] transition-transform duration-500 ' +
      getStyle
    "
  >
    <img
      class="absolute px-4 pt-4 pb-8 w-full h-full pointer-events-none"
      src="../../../assets/profile-border.png"
      alt=""
    />
    <div class="px-3 py-4 bg-turquoise">
      <div class="rounded-t-2xl p-4 space-y-5 flex flex-col">
        <div class="inline-flex mx-auto mt-4">
          <span><h1 class="text-2xl">Профіль</h1></span>
          <div
            class="flex items-center w-8 h-8 hover:cursor-pointer hover:bg-lightturquoise rounded-full absolute top-18 right-12"
          >
            <font-awesome-icon
              size="xl"
              class="max-sm:text-xl mx-auto"
              :icon="['fas', 'xmark']"
              style="color: #ffffff"
              @click="closeSidebar('profile')"
            />
          </div>
        </div>
        <hr class="mx-3" />
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
            <p class="text-lg">
              {{ fullName }}
            </p>
            <p class="tracking-widest">
              {{ user?.phoneNumber }}
            </p>
          </div>
        </div>
        <hr class="mx-3" />
        <div>
          <ul class="space-y-3 [&>li]:hover:cursor-pointer">
            <li class="px-3">
              <router-link
                v-if="isAdmin"
                :to="{
                  name: 'admin'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'user']"
                    style="color: #209393"
                  />
                </div>
                <p>Адмін панель</p>
              </router-link>
            </li>
            <hr class="mx-3" />
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
                    style="color: #209393"
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
                    style="color: #209393"
                  />
                </div>
                <p>Бажані товари</p>
              </router-link>
            </li>
            <li class="px-3">
              <router-link
                :to="{
                  name: 'waitlist'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'list-check']"
                    style="color: #209393"
                  />
                </div>
                <p>Товари в очікуванні</p>
              </router-link>
            </li>
            <li class="px-3">
              <router-link
                :to="{
                  name: 'library'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'book']"
                    style="color: #209393"
                  />
                </div>
                <p>Моя бібліотека</p>
              </router-link>
            </li>
            <hr class="mx-3" />
            <li class="px-3">
              <router-link
                :to="{
                  name: 'account'
                }"
                class="inline-flex space-x-3 items-center"
              >
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'gear']"
                    style="color: #209393"
                  />
                </div>
                <p>Налаштування</p>
              </router-link>
            </li>
            <hr class="mx-3" />
            <li class="px-3" @click="logout">
              <div class="inline-flex space-x-3 items-center">
                <div class="rounded-full w-8 h-8 bg-white flex mx-auto items-center">
                  <font-awesome-icon
                    class="max-sm:text-xl mx-auto"
                    :icon="['fas', 'arrow-right-from-bracket']"
                    style="color: #209393"
                  />
                </div>
                <p>Вихід</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <img class="max-md:w-full" src="../../../assets/profile-bottom.png" alt="" />
  </aside>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useAlertStore } from '../../../stores/alert'
import { useAuthStore } from '../../../stores/auth'
import { useSidebarStore } from '../../../stores/sidebar'
import { useUserStore } from '../../../stores/user'

export default {
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    ...mapState(useUserStore, ['user', 'fullName', 'isAdmin']),
    getStyle() {
      return this.getSidebar('profile').style
    }
  },
  methods: {
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useAuthStore, { authLogout: 'logout' }),
    async logout() {
      this.closeSidebars()
      this.showAlert('Успішний вихід з аккаунту', 'bg-red-500')
      await this.authLogout()
    }
  }
}
</script>
