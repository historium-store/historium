<template>
  <div v-if="isLoaded" class="w-11/12 mx-auto my-6 p-4">
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
      <div class="flex py-4">
        <div class="flex flex-col mx-auto">
          <div class="h-[500px]">
            <img class="rounded-lg shadow-xl h-full" :src="currentImage" />
          </div>
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
    <div>
      <div class="inline-flex">
        <div class="price">
          <span class="pe-2 text-[32px]">{{ product.price }}</span>
          <span class="text-[28px]">грн</span>
        </div>
        <!-- <div class="label-promotion">Акція</div> -->
      </div>
      <div class="mt-4">
        <span class="font-thin text-sm">{{
          availability ? 'В наявності' : 'Немає в наявності'
        }}</span>
        <span class="mx-2">•</span>
        <span class="font-thin text-sm">{{ product.type.name }}</span>
      </div>
    </div>
    <div class="my-4 inline-flex">
      <Button
        id="addToCartButton"
        @click="addToCart"
        class="mr-2 p-2 border hover:bg-cart-light border-cyan-500 rounded-md"
      >
        <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        <span class="ml-2">До кошика</span>
      </Button>
      <Button
        @click="checkout"
        class="mr-2 p-2 border hover:bg-cart-light border-cyan-500 rounded-md"
      >
        <font-awesome-icon :icon="['fas', 'bag-shopping']" />
        <span class="ml-2">Купити зараз</span>
      </Button>
    </div>
    <br />
    <div class="space-y-6">
      <div>
        <p class="text-lg">Формат</p>
        <p class="mt-2">{{ specificProduct.format }}</p>
      </div>
      <div>
        <p class="text-lg">Мова</p>
        <span>
          <p class="mt-2" v-for="lang in specificProduct.languages" :key="lang">{{ lang }}</p>
        </span>
      </div>
      <div>
        <p class="text-lg">Видавництво</p>
        <span>
          <p class="mt-2">{{ specificProduct.publisher.name }}</p>
        </span>
      </div>
      <div>
        <p class="text-lg">Рік видання</p>
        <p class="mt-2">{{ specificProduct.firstPublishedIn }}</p>
      </div>
      <hr />
      <div><p>Доставка, оплата, гарантія</p></div>
      <hr />
      <div>
        <p class="text-lg">Про автора</p>
        <span>
          <p class="" v-for="author in specificProduct.authors" :key="author">
            {{ author.fullName }}
          </p>
        </span>
      </div>
      <div>
        <h2 class="text-[24px] text-center">Про книгу</h2>
        <div>
          <p>{{ product.description }}</p>
        </div>
      </div>
      <!-- <div></div>
      <div>{{ specificProduct }}</div>
      <div>{{ product }}</div> -->
    </div>
  </div>
  <spinner v-else size="10" class="mx-auto mt-10" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import { Spinner } from 'flowbite-vue'

export default {
  props: ['id'],
  // setup(state) {
  //   const productStore = useProductStore()
  //   productStore.useProductMock()
  //   return { productStore, state }
  // },
  async mounted() {
    await this.loadProduct(this.id)
    this.isLoaded = true
  },
  data() {
    return {
      imageIndex: 0,
      isLoaded: false
    }
  },
  components: { Spinner },
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
    ...mapActions(useProductStore, ['loadProduct']),
    ...mapActions(useCartStore, ['addItem']),
    pickImage(event) {
      if (event.originalTarget.id < this.product.images.length) {
        this.imageIndex = event.originalTarget.id
      }
    },
    async addToCart() {
      document.getElementById('addToCartButton').disabled = true
      await this.addItem(this.product._id)
      document.getElementById('addToCartButton').disabled = false
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
