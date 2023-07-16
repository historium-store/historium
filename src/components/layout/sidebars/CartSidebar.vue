<template>
  <aside
    id="cart-sidebar"
    :class="
      'fixed right-0 sm:right-10 z-50 w-full sm:w-[500px] transition-transform duration-500 ' +
      getStyle
    "
  >
    <Cart is-sidebar="_" />
  </aside>
</template>

<script>
import { mapActions } from 'pinia'
import { useCartStore } from '../../../stores/cart'
import { useProductStore } from '../../../stores/product'
import { useSidebarStore } from '../../../stores/sidebar'
import Cart from '../../cart/Cart.vue'
export default {
  components: { Cart },
  computed: {
    getStyle() {
      return this.getSidebar('cart').style
    },
    isDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  },
  async mounted() {
    await this.updateCart()
  },
  methods: {
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useCartStore, ['updateCart', 'updateLocalCart', 'clearCart'])
  }
}
</script>
