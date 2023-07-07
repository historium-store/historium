<template>
  <TheModal />
  <TheAlert />
  <the-header :switchModal="switchModalState" :openModal="openModal"></the-header>
  <Suspense>
    <router-view v-slot="slotProps">
      <div class="xl:ml-48">
        <component :is="slotProps.Component"></component>
      </div>
      <!-- <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition> -->
    </router-view>
  </Suspense>
  <the-footer />
  <Main-sidebar />
  <Sections-sidebar />
  <Profile-sidebar />
  <Cart-sidebar />
  <NavigationBar />
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheAlert from './components/layout/modals/TheAlert.vue'
import TheModal from './components/layout/modals/TheModal.vue'
import SectionsSidebar from './components/layout/sidebars/SectionsSidebar.vue'
import MainSidebar from './components/layout/sidebars/MainSidebar.vue'
import ProfileSidebar from './components/layout/sidebars/ProfileSidebar.vue'
import CartSidebar from './components/layout/sidebars/CartSidebar.vue'
import NavigationBar from './components/layout/sidebars/NavigationBar.vue'
import LoginView from './components/auth/LoginView.vue'
import SignUpView from './components/auth/SignUpView.vue'
import RestoreView from './components/auth/RestoreView.vue'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'
export default {
  setup() {
    const authStates = ['login', 'signup', 'restore']
    const isShowModal = ref(false)
    const modalState = ref(authStates[0])
    return { isShowModal, modalState, authStates }
  },
  async mounted() {
    const userStore = useAuthStore()
    const cartStore = useCartStore()
    if (userStore.isAuthenticated) {
      await cartStore.updateCart()
    }
    return { cartStore }
  },
  computed: {
    alertStyle() {
      return 'translate-y-[150px]'
    }
  },
  components: {
    SectionsSidebar,
    TheHeader,
    TheFooter,
    MainSidebar,
    CartSidebar,
    ProfileSidebar,
    Breadcrumb,
    TheModal,
    LoginView,
    RouterView,
    SignUpView,
    RestoreView,
    BreadcrumbItem,
    TheAlert,
    NavigationBar
  }
}
</script>
