<template>
  <div class="rounded-lg hover:cursor-pointer px-2">
    <div class="card-poster" @click="viewProduct(good.key, good.type.key)">
      <div class="mx-auto w-[182px] md:w-[130px]">
        <div class="absolute mt-2 ml-[6.4rem] bg-gray-400 w-8 h-8">
          <font-awesome-icon
            @click.stop="addToWishlist"
            size="xl"
            :icon="['fas', 'bookmark']"
            :style="{ color: bookmarkColor }"
            class=""
          />
        </div>
        <img
          class="border-[3px] h-[280px] w-[182px] md:h-[200px] md:w-[130px] object-cover rounded-xl"
          :src="good?.image"
          alt=""
        />
        <div
          class="-mt-[268px] ml-[12px] md:-mt-[192px] md:ml-[8px] border-[3px] rounded-xl h-[280px] w-[182px] md:h-[200px] md:w-[130px] -z-20"
        ></div>
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
        <div class="price-wrapper text-center flex">
          <div class="flex price-display justify-between text-xl mx-auto lg:px-2">
            <div class="">
              <span class="">{{ good?.price }}</span>
              <span class="price-display-currency">₴</span>
            </div>
            <span class="space-x-2">
              <font-awesome-icon
                @click.stop="addToCart"
                size="sm"
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
      if (!this.isAuthenticated) {
        this.showAlert('Увійдіть в акаунт', 'bg-red-500')
        return
      }
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
      return this.isAuthenticated && this.user?.wishlist.map((item) => item).includes(this.good._id)
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
