<template>
  <div v-if="product" class="w-11/12 mx-auto my-6 p-4">
    <div class="pb-2 mb-2">
      <h2 class="text-[28px]">{{ product.name }}</h2>
      <span
        v-for="[i, author] in Object.entries(specificProduct?.authors)"
        :key="author.id"
        class="font-thin"
        >{{ author.fullName }}{{ i < specificProduct?.authors?.length - 1 ? ', ' : '' }}
      </span>
    </div>
    <div class="">
      <!-- <div class="">
        <sup class="">LIKE</sup>
        <sup class="">ADD TO LIB</sup>
        <sup class="">READ PART</sup>
      </div> -->
      <!-- image viewer component -->
      <div class="mx-auto py-4 sm:w-5/6 md:w-2/5">
        <div class="">
          <img class="rounded-lg shadow-lg dark:shadow-black/30 h-[500px]" :src="currentImage" />
          <div class="thumb flex justify-normal">
            <div class="px-1" v-for="[i, image] in Object.entries(product.images)" :key="image.id">
              <img
                @click="pickImage"
                class="h-20 rounded-md my-2 border-primary-100 border-2"
                :id="i"
                :src="image"
                :alt="i"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button class="justify-center" @click="next">| > |</button> -->
    <div class="mt-4">
      <div class="inline-flex">
        <div class="price">
          <span class="pe-2 text-[32px]">{{ product.price }}</span>
          <span class="text-[28px]">грн</span>
        </div>
        <!-- <div class="label-promotion">Акція</div> -->
      </div>
      <div class="">
        <span class="font-thin text-sm">{{
          availability ? 'В наявності' : 'Немає в наявності'
        }}</span>
        <span class="mx-2">•</span>
        <span class="font-thin text-sm">{{ product.type.name }}</span>
      </div>
    </div>
    <div class="mt-4">
      <Button @click="addToCart" class="mr-2 p-2 border border-cyan-500 rounded-md">
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        <span class="ml-2">До кошика</span>
      </Button>
      <Button @click="checkout" class="mr-2 p-2 border border-cyan-500 rounded-md">
        <font-awesome-icon :icon="['fas', 'bag-shopping']" />
        <span class="ml-2">Купити зараз</span>
      </Button>
    </div>
    <br />
    <div class="mt-4">Формат</div>
    <div class="mt-4">Мова</div>
    <div class="mt-4">Видавництво</div>
    <div class="mt-4">Рік видання</div>
    <br />
    <div class="mt-4">Доставка</div>
    <div class="mt-4">Про автора</div>
    <div class="mt-4">
      <h2 class="text-[24px] text-center">Про книгу</h2>
      <div>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <div class="mt-4"></div>
    <div class="mt-4">{{ specificProduct }}</div>
    <div class="mt-4">{{ product }}</div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'

export default {
  props: ['id'],
  setup(state) {
    const productStore = useProductStore()
    productStore.useProductMock()
    return { productStore, state }
  },
  async mounted() {
    await this.productStore.loadProduct(this.state.id)
  },
  data() {
    return {
      imageIndex: 0
    }
  },
  computed: {
    ...mapWritableState(useProductStore, ['product']),
    specificProduct() {
      return this.product?.specificProduct
    },
    currentImage() {
      return this.product?.images[this.imageIndex]
    },
    availability() {
      return this.product?.quantity > 0
    }
  },
  methods: {
    ...mapActions(useCartStore, ['addItem']),
    pickImage(event) {
      if (event.originalTarget.id < this.product.images.length) {
        this.imageIndex = event.originalTarget.id
      }
    },
    async addToCart() {
      await this.addItem(this.product._id)
    },
    async checkout() {
      await this.addToCart()
      await this.$router.push('checkout')
    }
  }
}
</script>

<style scoped>
.price {
  font-weight: 500;
  font-size: 24px;
  line-height: 100%;
  font-style: normal;
}
</style>
