<template>
  <div class="rounded-lg group hover:cursor-pointer px-2">
    <div class="m-2" @click="viewProduct(good.key, good.type.key)">
      <div class="mx-auto w-[182px] md:w-[130px]">
        <div
          class="hover:transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute flex rounded-full items-center mt-3 md:mt-2 ml-[8.5rem] md:ml-[5.5rem] bg-lightturquoise shadow-xl w-8 h-8"
          @click.stop="addToWishlist"
        >
          <font-awesome-icon
            size="lg"
            :icon="['fas', 'bookmark']"
            :class="'mx-auto ' + bookmarkColor"
          />
        </div>
        <img
          class="border-[3px] h-[280px] w-[182px] md:h-[200px] md:w-[130px] object-cover rounded-xl"
          :src="good?.image"
          alt="book-image"
        />
        <div
          class="-mt-[268px] ml-[12px] md:-mt-[192px] md:ml-[8px] border-[3px] rounded-xl h-[280px] w-[182px] md:h-[200px] md:w-[130px] -z-20"
        />
      </div>
    </div>
    <div class="min-h-[130px] my-2 flex flex-col mx-auto">
      <div class="card-category flex-col" @click="viewProduct(good.key, good.type.key)">
        <p class="text-base line-clamp-1 hover:line-clamp-none text-center text-ellipsis">
          {{ goodTitle }}
        </p>
        <div class="text-center">
          <a class="text-sm text-gray-400">{{ good.creators?.[0] }}</a>
        </div>
        <div class="flex items-center">
          <div :class="'mx-auto space-x-1 ' + availabilityColor">
            <font-awesome-icon :icon="['fas', availabilityIcon]" size="xs" />
            <a class="text-xs">{{ availability }}</a>
          </div>
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
              v-if="isEBook || isAudioBook || isAvailable"
              :class="
                'flex items-center transition-colors ease-out duration-200 ms-auto text-lg h-7 rounded-full  ' +
                cartButtonColor
              "
              @click.stop="addToCart"
            >
              <font-awesome-icon :icon="['fas', 'cart-shopping']" :class="'mx-4 text-white'" />
            </span>
            <span
              v-else
              :class="
                'flex items-center transition-colors ease-out duration-200 ms-auto text-lg h-7 rounded-full  ' +
                waitingButtonColor
              "
              @click.stop="addToWaitlist"
            >
              <font-awesome-icon :icon="['fas', 'clock']" :class="'mx-4 text-white'" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia'
import { useAlertStore } from '../../stores/alert'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import { useProductStore } from '../../stores/product'
import { useUserStore } from '../../stores/user'
export default {
  props: ['good'],
  computed: {
    ...mapWritableState(useAuthStore, ['isAuthenticated']),
    ...mapWritableState(useCartStore, ['cart']),
    ...mapWritableState(useUserStore, ['user']),
    isInWaitlist() {
      return (
        this.isAuthenticated && this.user?.waitlist?.map((item) => item).includes(this.good._id)
      )
    },
    isInWishlist() {
      return (
        this.isAuthenticated && this.user?.wishlist?.map((item) => item).includes(this.good._id)
      )
    },
    isInCart() {
      return this.cart.items.map((item) => item.product._id).includes(this.good._id)
    },
    cartButtonColor() {
      return this.isInCart
        ? 'border-2 bg-turquoise'
        : 'border-2 border-white hover:bg-lightturquoise'
    },
    bookmarkColor() {
      return this.isInWishlist ? 'text-turquoise' : 'text-whiteblue'
    },
    waitingButtonColor() {
      return this.isInWaitlist
        ? 'border-2 bg-turquoise'
        : 'border-2 border-white hover:bg-lightturquoise'
    },
    goodTitle() {
      const title = this.good?.name?.split(/\.|:/)[0] || ''

      return title.length < 35 ? title : this.short(title, 35)
    },
    isAvailable() {
      return this.good?.quantity > 0
    },
    isEBook() {
      return this.good?.type?.key === 'e-book'
    },
    isAudioBook() {
      return this.good?.type?.key === 'audiobook'
    },
    availability() {
      if (this.isEBook) {
        return 'Електронна'
      } else if (this.isAudioBook) {
        return 'Аудіокнига'
      }
      return this.isAvailable ? 'В наявності' : 'Немає в наявності'
    },
    availabilityIcon() {
      return this.isEBook ? 'cloud-arrow-down' : this.isAudioBook ? 'headphones' : 'truck'
    },
    availabilityColor() {
      return this.isEBook || this.isAudioBook
        ? 'text-whiteblue'
        : this.isAvailable
        ? 'text-turquoise'
        : 'text-red-300'
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addItem']),
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useProductStore, ['viewProduct']),
    ...mapActions(useUserStore, [
      'pushInWishlist',
      'removeFromWishlist',
      'pushInWaitlist',
      'removeFromWaitlist'
    ]),
    async addToCart() {
      if (!this.isInCart) {
        await this.addItem(this.good._id)
        this.showAlert('Товар додано у кошик')
      }
    },
    async addToWaitlist() {
      if (!this.isAuthenticated) {
        this.showAlert('Увійдіть в акаунт', 'bg-red-500')
        return
      }
      if (!this.isInWaitlist) {
        await this.pushInWaitlist(this.good._id)
        this.showAlert('Товар додано до очікування')
      } else {
        await this.removeFromWaitlist(this.good._id)
        this.showAlert('Товар видалено з очікуванних')
      }
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
  }
}
</script>
