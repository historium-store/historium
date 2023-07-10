<template>
  <div class="rounded-lg hover:cursor-pointer px-2">
    <div class="card-poster" @click="viewProduct(good.key, good.type.key)">
      <div class="mx-auto w-[130px]">
        <img
          class="border-[3px] h-[200px] w-[130px] object-cover rounded-xl"
          :src="good?.image"
          alt=""
        />
        <div class="-mt-[192px] ml-[8px] border-[3px] rounded-xl h-[200px] w-[130px] -z-20"></div>
      </div>
    </div>
    <div class="card-content min-h-[120px] my-2 flex flex-col mx-auto">
      <div
        class="card-category flex-col line-clamp-3 hover:line-clamp-none"
        @click="viewProduct(good.key, good.type.key)"
      >
        <p class="title-label font-rubik text-[14px] text-center text-ellipsis">
          {{ good?.name }}
        </p>
        <div class="author-wrapper text-center">
          <a class="creator-label text-xs text-gray-400">{{ good.creators?.[0] }}</a>
        </div>
      </div>
      <div class="mt-auto">
        <div class="price-wrapper text-center">
          <div class="flex price-display text-[24px] lg:mx-4 lg:px-2">
            <div class="mx-auto">
              <span class="pe-1">{{ good?.price }}</span>
              <span class="price-display-currency">₴</span>
            </div>
            <span class="mx-auto space-x-2">
              <font-awesome-icon
                @click.stop="addToWishlist"
                size="xs"
                :icon="['fas', 'bookmark']"
                :style="{ color: bookmarkColor }"
              />
              <font-awesome-icon
                @click.stop="addToCart"
                size="xs"
                :icon="['fas', 'cart-shopping']"
                :style="{ color: cartColor }"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCartStore } from '../../stores/cart'
import { useAlertStore } from '../../stores/alert'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
import { useAuthStore } from '../../stores/auth'
export default {
  props: ['good', 'isAvailable'],
  methods: {
    ...mapActions(useCartStore, ['addItem']),
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useUserStore, ['pushInWishlist', 'removeFromWishlist']),
    async addToCart() {
      await this.addItem(this.good._id)
      this.showAlert('Товар додано у кошик')
    },
    async addToWishlist() {
      if (!this.isInWishlist) {
        await this.pushInWishlist(this.good._id)
        this.showAlert('Товар додано до бажаних')
      } else {
        await this.removeFromWishlist(this.good._id)
        this.showAlert('Товар видалено з бажаних')
      }
    }
  },
  computed: {
    ...mapWritableState(useAuthStore, ['isAuthenticated']),
    ...mapWritableState(useCartStore, ['cart']),
    ...mapWritableState(useUserStore, ['user']),
    isInWishlist() {
      return this.isAuthenticated && this.user.wishlist.map((item) => item).includes(this.good._id)
    },
    isInCart() {
      return this.cart.items.map((item) => item.product._id).includes(this.good._id)
    },
    cartColor() {
      return this.isInCart ? '#abea7c' : '#ffffff'
    },
    bookmarkColor() {
      return this.isInWishlist ? '#f2e34c' : '#ffffff'
    }
  }
}
</script>
