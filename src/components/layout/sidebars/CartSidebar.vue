<template>
  <aside
    id="cart-sidebar"
    :class="
      'fixed right-0 sm:right-10 z-30 w-full sm:w-[500px] transition-transform duration-500 ' +
      getStyle
    "
  >
    <div class="flex flex-col px-3 py-4 text-cart-light bg-cart-lighter">
      <!-- <div class="top-hr h-3 mb-6"></div> -->
      <img src="../../../assets/cart-header-dashes.png" />
      <div class="px-2 md:px-8 mt-6 flex flex-col">
        <div class="inline-flex">
          <span class="mx-auto"><h1 class="text-2xl">Кошик</h1></span>
          <div
            class="flex items-center w-8 h-8 hover:cursor-pointer hover:bg-slate-100 rounded-full absolute top-18 right-12"
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
          <hr class="border-[1.5px] flex rounded-full border-cart-light" />
          <li>
            <div class="inline-flex items-center w-full justify-between py-2">
              <p class="ps-2 text-[17px]">{{ cart?.totalQuantity }} шт.</p>
              <div class="border-[1.5px] rounded-full border-cart-light mr-2">
                <p @click="clearCart" class="hover:cursor-pointer px-3">Видалити все</p>
              </div>
            </div>
          </li>
          <hr class="border-[1.5px] rounded-full border-cart-light" />
        </ul>
        <!-- <div
          class="-mb-16 h-16 z-50 bg-gradient-to-b from-cart-lighter to-transparent"
        ></div> -->
        <ul class="font-medium h-[50vmin] overflow-y-auto flex flex-col [&>*:last-child]:mb-4">
          <li v-for="item in cart ? cart?.items : []" :key="item.product._id" class="py-3">
            <div class="flex m-2">
              <img
                class="h-24 rounded-md hover:cursor-pointer border-2"
                :src="item.product?.image"
                @click="viewProduct(item.product.key)"
              />
              <div class="product-details pl-4 flex flex-col">
                <p
                  @click="viewProduct(item.product.key)"
                  class="text-cart-dark hover:cursor-pointer"
                >
                  {{ item.product?.name }}
                </p>
                <p class="text-xs">{{ item.product?.authors?.[0] }}</p>
                <span class="inline-flex items-center mt-auto">
                  <p class="text-xl">{{ item.product?.price }} ₴</p>
                  <span class="mx-2 text-xl">•</span>
                  <p>{{ item.product?.type?.name || item.product?.type }}</p>
                </span>
              </div>
              <div class="ml-auto flex flex-col justify-between">
                <font-awesome-icon
                  @click="removeAll(item.product._id)"
                  size="xl"
                  class="max-sm:text-xl ms-auto hover:cursor-pointer"
                  :icon="['fas', 'trash-can']"
                  style="color: #0e6060"
                />
                <div
                  class="product-actions select-none inline-flex items-center border-2 border-cart-light rounded-full"
                >
                  <div
                    class="bg-cart-dark rounded-full w-6 h-6 m-1 text-2xl hover:cursor-pointer"
                    @click="remove(item.product._id)"
                  >
                    <p class="text-center text-white -mt-0.5">-</p>
                  </div>
                  <input
                    @blur="change(item.product._id, item.quantity)"
                    @keydown="quantityChangeEnter($event, item.product._id)"
                    class="bg-transparent w-8 text-xl text-center rounded-md"
                    v-model.number="item.quantity"
                  />
                  <div
                    class="bg-cart-dark rounded-full w-6 h-6 m-1 text-2xl hover:cursor-pointer"
                    @click="add(item.product._id)"
                  >
                    <p class="text-center text-white -mt-0.5">+</p>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mx-2 mt-6 border-[1.5px] rounded-full border-cart-light opacity-40" />
          </li>
        </ul>
        <div
          class="-mt-16 bg-transparent h-16 bg-gradient-to-b from-transparent to-cart-lighter"
        ></div>
        <hr class="mx-2 mt-6 border-[1.5px] rounded-full border-cart-light" />
        <div class="inline-flex justify-between items-center mt-auto mx-1">
          <p class="m-2 p-2 text-xl">Всього:</p>
          <p class="m-2 p-2 text-xl">{{ cart?.totalPrice }} ₴</p>
        </div>
        <div class="mx-8 border-2 border-cart-light rounded-full mt-2 hover:cursor-pointer">
          <RouterLink to="/checkout">
            <p class="py-1 text-center text-xl">Оформити замовлення</p>
          </RouterLink>
        </div>
      </div>
      <img class="mt-4" src="../../../assets/cart-bottom-dashes.png" />
    </div>
    <!-- <img v-if="isDarkMode" src="../../../assets/cart-bottom-dark.png" /> -->
    <img src="../../../assets/cart-bottom.png" />
  </aside>
</template>

<script>
// import SidebarItem from './SidebarItem.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useSidebarStore } from '../../../stores/sidebar'
import { useCartStore } from '../../../stores/cart'
import { useAuthStore } from '../../../stores/auth'
import { useProductStore } from '../../../stores/product'

export default {
  async mounted() {
    const userStore = useAuthStore()
    await this.updateCart()
    return { userStore }
  },
  components: {},
  methods: {
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useSidebarStore, ['closeSidebar', 'openSidebar', 'getSidebar', 'closeSidebars']),
    ...mapActions(useCartStore, [
      'addItem',
      'removeItem',
      'decreaseItem',
      'changeItemCount',
      'updateCart',
      'updateLocalCart',
      'clearCart'
    ]),
    async add(id) {
      console.log(id)
      await this.addItem(id)
    },
    async remove(id) {
      console.log(id)
      await this.decreaseItem(id)
    },
    async removeAll(id) {
      await this.removeItem(id)
    },
    async change(id, count) {
      await this.changeItemCount(id, count)
    },
    async quantityChangeEnter(e, id) {
      if (e.key === 'Enter') {
        await this.change(id, e.target.value)
      }
    }
  },
  computed: {
    ...mapWritableState(useCartStore, ['cart']),
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
