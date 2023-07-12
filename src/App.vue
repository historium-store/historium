<template>
  <AuthModal />
  <Alert />
  <the-header :switch-modal="switchModalState" :open-modal="openModal" />
  <Suspense>
    <router-view v-slot="slotProps">
      <div class="xl:ml-48">
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
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import Alert from './components/layout/modals/Alert.vue'
import AuthModal from './components/layout/modals/AuthModal.vue'
import SectionsSidebar from './components/layout/sidebars/SectionsSidebar.vue'
import MainSidebar from './components/layout/sidebars/MainSidebar.vue'
import ProfileSidebar from './components/layout/sidebars/ProfileSidebar.vue'
import FiltersSidebar from './components/layout/sidebars/FiltersSidebar.vue'
import CartSidebar from './components/layout/sidebars/CartSidebar.vue'
import NavigationBar from './components/layout/sidebars/NavigationBar.vue'

import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'
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
