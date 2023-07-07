<template>
  <aside
    id="cart-sidebar"
    :class="
      'fixed right-0 sm:right-10 z-30 w-full sm:w-[500px] transition-transform duration-500 ' +
      getStyle
    "
  >
    <Cart isSidebar="_" />
    <!-- <img v-if="isDarkMode" src="../../../assets/cart-bottom-dark.png" /> -->
    <!-- <img src="../../../assets/cart-bottom.png" /> -->
  </aside>
</template>

<script>
// import SidebarItem from './SidebarItem.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import { useCartStore } from '../../../stores/cart'
import { useAuthStore } from '../../../stores/auth'
import { useProductStore } from '../../../stores/product'
import Cart from '../../cart/Cart.vue'
export default {
  async mounted() {
    const userStore = useAuthStore()
    await this.updateCart()
    return { userStore }
  },
  components: { Cart },
  methods: {
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useCartStore, ['updateCart', 'updateLocalCart', 'clearCart'])
  },
  computed: {
    getStyle() {
      return this.getSidebar('cart').style
    },
    isDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
}
</script>

<style scoped></style>
