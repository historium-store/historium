<template>
  <div class="rounded-lg group hover:cursor-pointer px-2">
    <div class="m-2" @click="viewProduct(good.key, good.type.key)">
      <div class="mx-auto w-[182px] md:w-[130px]">
        <div
          class="hover:transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute flex rounded-full items-center mt-3 md:mt-2  ml-[8.5rem] md:ml-[5.5rem] bg-turquoise shadow-xl w-8 h-8"
        >
          <font-awesome-icon
            @click.stop="addToWishlist"
            size="md"
            :icon="['fas', 'bookmark']"
            :style="{ color: bookmarkColor }"
            class="mx-auto"
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
    <div class="min-h-[140px] my-2 flex flex-col mx-auto">
      <div
        class="card-category flex-col line-clamp-3 hover:line-clamp-none"
        @click="viewProduct(good.key, good.type.key)"
      >
        <p class="font-rubik text-md text-center text-ellipsis">
          {{ goodTitle }}
        </p>
        <div class="text-center">
          <a class="text-sm text-gray-400">{{ good.creators?.[0] }}</a>
        </div>
      </div>
      <div class="mb-3 w-2/3 mx-auto mt-auto">
        <div>
          <div class="flex space-x-3 items-center text-2xl">
            <div class="mr-auto">
              <span>{{ good?.price }}</span>
              <span>₴</span>
            </div>
            <span
              @click.stop="addToCart"
              :class="'flex items-center ms-auto text-lg h-7 rounded-full  ' + cartButtonColor"
            >
              <font-awesome-icon :icon="['fas', 'cart-shopping']" :class="'mx-4 ' + cartColor" />
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
    },
    short(title, maxlength) {
      let result = ''

      for (let word of title.split(' ')) {
        if (result.length >= maxlength) return result
        result += word + ' '
      }

      return result
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
      return this.isInCart ? 'text-white' : 'text-white'
    },
    cartButtonColor() {
      return this.isInCart
        ? 'border-2 bg-turquoise'
        : 'border-2 border-white hover:bg-lightturquoise'
    },
    bookmarkColor() {
      return this.isInWishlist ? '#f2e34c' : 'text-whiteblue'
    },
    goodTitle() {
      const title = this.good?.name?.split(/\.|:/)[0] || ''

      return title.length < 35 ? title : this.short(title, 35)
    }
  }
}
</script>
