<template>
  <Modal
    size="xl"
    class="[&>*>*>*]:bg-transparent [&>*>*]:border [&>*>*]:w-1/2 [&>*>div]:h-96 [&>*]:flex [&>*>*]:items-center [&>*>*]:justify-center [&>*>*]:h-screen [&>*>*]:rounded-2xl [&>*]:bg-black [&>*]:bg-opacity-50 [&>*]:z-50"
    v-if="isShowModal"
    @close="closeModal"
  >
    <template #header></template>
    <template #body>
      <LoginView
        :closeModal="closeModal"
        :switchModal="switchModalState"
        v-if="modalState === 'login'"
      ></LoginView>
      <SignUpView
        :close-modal="closeModal"
        :switchModal="switchModalState"
        v-else-if="modalState === 'signup'"
      ></SignUpView>
      <RestoreView
        :close-modal="closeModal"
        :switchModal="switchModalState"
        v-else-if="modalState === 'restore'"
      ></RestoreView>
    </template>
  </Modal>
  <main-sidebar></main-sidebar>
  <sections-sidebar></sections-sidebar>
  <profile-sidebar></profile-sidebar>
  <cart-sidebar></cart-sidebar>
  <the-header :switchModal="switchModalState" :openModal="openModal"></the-header>

  <Suspense>
    <router-view v-slot="slotProps">
      <div class="xl:ml-64">
        <component :is="slotProps.Component"></component>
      </div>
      <!-- <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition> -->
    </router-view>
  </Suspense>
</template>

<script>
import { Modal, Sidebar, Breadcrumb, BreadcrumbItem } from 'flowbite-vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
import MainSidebar from './components/layout/sidebars/MainSidebar.vue'
import SectionsSidebar from './components/layout/sidebars/SectionsSidebar.vue'
import ProfileSidebar from './components/layout/sidebars/ProfileSidebar.vue'
import CartSidebar from './components/layout/sidebars/CartSidebar.vue'
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
  components: {
    SectionsSidebar,
    TheHeader,
    TheFooter,
    Sidebar,
    MainSidebar,
    CartSidebar,
    ProfileSidebar,
    Breadcrumb,
    Modal,
    LoginView,
    RouterView,
    SignUpView,
    RestoreView,
    BreadcrumbItem
  },
  methods: {
    openModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    },
    switchModalState(state) {
      this.modalState = state
    }
  }
}
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
