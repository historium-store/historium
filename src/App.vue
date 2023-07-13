<template>
  <auth-modal />
  <alert />
  <the-header :switch-modal="switchModalState" :open-modal="openModal" />
  <Suspense>
    <router-view v-slot="slotProps">
      <div class="xl:ml-48 min-h-[600px]">
        <component :is="slotProps.Component" />
      </div>
      <!-- <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition> -->
    </router-view>
  </Suspense>
  <the-footer />
  <main-sidebar />
  <sections-sidebar />
  <profile-sidebar />
  <cart-sidebar />
  <filters-sidebar />
  <navigation-bar />
</template>

<script>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
import Alert from './components/layout/modals/Alert.vue'
import AuthModal from './components/layout/modals/AuthModal.vue'
import CartSidebar from './components/layout/sidebars/CartSidebar.vue'
import FiltersSidebar from './components/layout/sidebars/FiltersSidebar.vue'
import MainSidebar from './components/layout/sidebars/MainSidebar.vue'
import NavigationBar from './components/layout/sidebars/NavigationBar.vue'
import ProfileSidebar from './components/layout/sidebars/ProfileSidebar.vue'
import SectionsSidebar from './components/layout/sidebars/SectionsSidebar.vue'

import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'
export default {
  components: {
    SectionsSidebar,
    TheHeader,
    TheFooter,
    MainSidebar,
    CartSidebar,
    ProfileSidebar,
    AuthModal,
    RouterView,
    Alert,
    NavigationBar,
    FiltersSidebar
  },
  setup() {
    const authStates = ['login', 'signup', 'restore']
    const isShowModal = ref(false)
    const modalState = ref(authStates[0])
    return { isShowModal, modalState, authStates }
  },
  computed: {
    alertStyle() {
      return 'translate-y-[150px]'
    }
  },
  async mounted() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    if (authStore.isAuthenticated) {
      await cartStore.updateCart()
    }
    return { cartStore }
  }
}
</script>
