<template>
  <div
    class="flex flex-col px-3 py-4 text-turquoise bg-whiteblue rounded-b-2xl max-h-[95vh] max-sm:overflow-y-scroll"
  >
    <!-- <div class="top-hr h-3 mb-6"></div> -->
    <img src="../../assets/cart-header-dashes.png" />
    <div class="px-2 md:px-8 mt-6 flex flex-col">
      <div class="inline-flex">
        <span class="mx-auto"><h1 class="text-2xl">Кошик</h1></span>
        <div
          :class="
            'flex items-center w-8 h-8 hover:cursor-pointer hover:bg-slate-100 rounded-full top-18 right-12 ' +
            (isSidebar ? '' : 'invisible')
          "
        >
          <font-awesome-icon
            @click="closeSidebar('cart')"
            size="xl"
            class="max-sm:text-xl mx-auto"
            :icon="['fas', 'xmark']"
            style="color: #0e6060"
          />
        </div>
        <!-- <button
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-18 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        ></button> -->
      </div>
      <ul class="mt-6">
        <hr class="border-[1.5px] flex rounded-full border-turquoise" />
        <li>
          <div class="inline-flex items-center w-full justify-between py-2">
            <p class="ps-2 text-[17px]">{{ cart?.totalQuantity }} шт.</p>
            <div class="border-[1.5px] rounded-full border-turquoise mr-2">
              <p @click="clearCart" class="hover:cursor-pointer px-3">Видалити все</p>
            </div>
          </div>
        </li>
        <hr class="border-[1.5px] rounded-full border-turquoise" />
      </ul>
      <cart-products-view
        class="overflow-y-auto max-h-[60vh] min-h-[200px]"
        :cart="cart"
      ></cart-products-view>
      <div class="-mt-4 bg-transparent h-4 bg-gradient-to-b from-transparent to-cart-lighter"></div>
      <hr class="mx-2 mt-6 border-[1.5px] rounded-full border-turquoise" />
      <div class="inline-flex justify-between items-center mt-auto mx-1">
        <p class="m-2 p-2 text-xl">Всього:</p>
        <p class="m-2 p-2 text-xl">{{ cart?.totalPrice }} ₴</p>
      </div>
      <div class="mx-8 border-2 border-turquoise rounded-full mt-2 hover:cursor-pointer">
        <RouterLink :to="cart.items.length > 0 ? '/checkout' : ''">
          <p class="py-1 text-center text-xl">Оформити замовлення</p>
        </RouterLink>
      </div>
    </div>
    <img class="my-4" src="../../assets/cart-bottom-dashes.png" />
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import CartProductsView from './CartProducts.vue'
import { useSidebarStore } from '../../stores/sidebar'
import { useCartStore } from '../../stores/cart'
export default {
  props: ['isSidebar'],
  components: { CartProductsView },
  methods: {
    ...mapActions(useSidebarStore, ['closeSidebar']),
    ...mapActions(useCartStore, ['clearCart'])
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart'])
  }
}
</script>

<style></style>
