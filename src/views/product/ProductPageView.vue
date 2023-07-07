<template>
  <div v-if="isLoaded" class="w-11/12 mx-auto my-6 p-4">
    <div class="grid grid-cols-1 lg:grid-cols-5">
      <div class="flex p-2 col-span-1 lg:col-span-2">
        <div class="flex flex-col mx-auto">
          <div class="w-2/3 mx-auto lg:w-full lg:h-2/3">
            <div class="mx-auto p-6 xl:px-12 2xl:px-24">
              <img class="rounded-2xl shadow-xl h-full" :src="currentImage" />
              <div class="my-4 flex space-x-2 font-rubik text-[13px]">
                <Button
                  id="addToCartButton"
                  @click="addToCart"
                  class="w-1/2 py-1.5 border hover:bg-cart-light border-cart-light rounded-full"
                >
                  <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                  <span class="ml-2">До кошика</span>
                </Button>
                <Button
                  @click="checkout"
                  class="w-1/2 py-1.5 border hover:bg-cart-light border-cart-light rounded-full"
                >
                  <font-awesome-icon :icon="['fas', 'bag-shopping']" />
                  <span class="ml-2">Купити зараз</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 col-span-4 lg:col-span-3 font-rubik">
        <div class="grid grid-cols-4">
          <div class="col-span-4 md:col-span-3">
            <div class="mb-5">
              <h2 class="text-[28px] font-body">{{ product.name }}</h2>
              <span
                v-for="[i, author] in Object.entries(product?.authors)"
                :key="author.id"
                class="text-lg text-gray-400"
                >{{ author.fullName }}{{ i < product?.authors?.length - 1 ? ', ' : '' }}
              </span>
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 text-cart-light">
            <h2 class="text-[32px] font-body pb-5 md:pb-0 md:text-center">
              <span class="inline-flex items-center space-x-1">
                <p>{{ product.product.price }}</p>
                <p class="text-[28px]">₴</p>
              </span>
            </h2>
          </div>
        </div>
        <div class="space-x-2">
          <Button class="px-4 h-8 border border-cart-light rounded-full"> Читати фрагмент </Button>
          <Button class="w-8 h-8 py-0.5 border bg-cart-light border-cart-light rounded-full">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </Button>
        </div>
        <div class="mt-5">
          <p class="text-gray-400">Формат</p>
          <div class="inline-flex py-2">
            <Button class="px-4 h-8 border bg-cart-light border-cart-light rounded-full">
              <font-awesome-icon :icon="['fas', 'book']" />
              <span class="ml-2">{{ product.type }}</span>
            </Button>
          </div>
        </div>
        <div>
          <p class="text-gray-400">Мова книги</p>
          <div class="inline-flex py-2">
            <Button
              v-for="language in product.languages"
              :key="language"
              class="px-4 h-8 border border-cart-light rounded-full"
            >
              <span>{{ language }}</span>
            </Button>
          </div>
        </div>
        <div class="py-2">
          <p class="text-gray-400">Опис</p>
          <p>«{{ showDescription }}»</p>
          <span class="hover:cursor-pointer text-gray-400" @click="switchDescription">
            <div class="inline-flex items-center mt-5" v-if="!isExtendedDescription">
              <p>Показати ще</p>
              <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
            </div>
            <div class="inline-flex items-center mt-5" v-else>
              <p>Приховати</p>
              <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
            </div>
          </span>
        </div>
        <div>
          <p class="font-body text-xl my-5">Характеристики</p>
          <div class="border-2 rounded-2xl p-3 px-6 space-y-5">
            <div>
              <p class="text-gray-400">Формат</p>
              <p>{{ product.format }}</p>
            </div>
            <div>
              <p class="text-gray-400">Автор</p>
              <span
                v-for="[i, author] in Object.entries(product.authors)"
                :key="author.id"
                class="font-thin"
                >{{ author.fullName }}{{ i < product.product?.creators?.length - 1 ? ', ' : '' }}
              </span>
            </div>
            <div>
              <p class="text-gray-400">Тип</p>
              <p>{{ product.type }}</p>
            </div>
            <div v-if="isExtendedFeature" class="space-y-5">
              <div>
                <p class="text-gray-400">Ілюстрації</p>
                <p>{{ product.illustrationsType[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Палітурка</p>
                <p>{{ product.bindingType }}</p>
              </div>
              <div>
                <p class="text-gray-400">Видавництво</p>
                <p>{{ product.publisher.name }}</p>
              </div>
              <div>
                <p class="text-gray-400">ISBN</p>
                <p>{{ product.isbns[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Мова</p>
                <p>{{ product.languages[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Кількість сторінок</p>
                <p>{{ product.pages }}</p>
              </div>
              <div>
                <p class="text-gray-400">Рік видання</p>
                <p>{{ product.publishedIn }}</p>
              </div>
            </div>
            <span class="hover:cursor-pointer text-gray-400" @click="switchFeature">
              <div class="inline-flex items-center mt-5" v-if="!isExtendedFeature">
                <p>Показати ще характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
              </div>
              <div class="inline-flex items-center mt-5" v-else>
                <p>Приховати всі характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
              </div>
            </span>
          </div>
        </div>
        <div>
          <p class="text-xl font-body my-5">Рецензії</p>
          <Button class="px-4 w-full py-0.5 border bg-cart-light border-cart-light rounded-full">
            Написати рецензію
          </Button>
        </div>
      </div>
    </div>
    <the-special-section name="history" title="Раніше переглядали" />
  </div>
  <spinner v-else size="10" class="mx-auto mt-10" />
</template>
<!-- <template>
  <div v-if="isLoaded" class="w-11/12 mx-auto my-6 p-4">
    <div class="grid grid-cols-1 lg:grid-cols-5">
      <div class="flex p-2 col-span-1 lg:col-span-2">
        <div class="flex flex-col mx-auto">
          <div class="w-3/4 mx-auto lg:w-full">
            <div class="m-auto p-6 pt-0 xl:px-12 2xl:px-24">
              <img class="rounded-2xl shadow-xl" :src="currentImage" />
            </div>
          </div>
          <div class="max-md:my-4 flex space-x-2 font-rubik text-[13px]">
            <Button
              id="addToCartButton"
              @click="addToCart"
              class="w-1/2 py-1.5 border hover:bg-cart-light border-cart-light rounded-full"
            >
              <font-awesome-icon :icon="['fas', 'cart-shopping']" />
              <span class="ml-2">До кошика</span>
            </Button>
            <Button
              @click="checkout"
              class="w-1/2 py-1.5 border hover:bg-cart-light border-cart-light rounded-full"
            >
              <font-awesome-icon :icon="['fas', 'bag-shopping']" />
              <span class="ml-2">Купити зараз</span>
            </Button>
          </div>
        </div>
      </div>
      <div class="p-2 col-span-4 lg:col-span-3 font-rubik">
        <div class="grid grid-cols-4">
          <div class="col-span-4 md:col-span-3">
            <div class="mb-5">
              <h2 class="text-2xl font-body">{{ book.product.name }}</h2>
              <span
                v-for="[i, author] in Object.entries(book.authors)"
                :key="author.id"
                class="text-lg text-gray-400"
                >{{ author.fullName }}{{ i < specificProduct?.authors?.length - 1 ? ', ' : '' }}
              </span>
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 text-cart-light">
            <h2 class="text-[32px] font-body pb-5 md:pb-0 md:text-center">
              <span class="inline-flex items-center space-x-1">
                <p>{{ book.product.price }}</p>
                <p class="text-[28px]">₴</p>
              </span>
            </h2>
          </div>
        </div>
        <div class="space-x-2">
          <Button class="px-4 h-8 border border-cart-light rounded-full"> Читати фрагмент </Button>
          <Button class="w-8 h-8 py-0.5 border bg-cart-light border-cart-light rounded-full">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </Button>
        </div>
        <div class="mt-5">
          <p class="text-gray-400">Формат</p>
          <div class="inline-flex py-2">
            <Button class="px-4 h-8 border bg-cart-light border-cart-light rounded-full">
              <font-awesome-icon :icon="['fas', 'book']" />
              <span class="ml-2">{{ book.type }}</span>
            </Button>
          </div>
        </div>
        <div>
          <p class="text-gray-400">Мова книги</p>
          <div class="inline-flex py-2">
            <Button
              v-for="language in book.languages"
              :key="language"
              class="px-4 h-8 border border-cart-light rounded-full"
            >
              <span>{{ language }}</span>
            </Button>
          </div>
        </div>
        <div class="py-2">
          <p class="text-gray-400">Опис</p>
          <p>«{{ showDescription }}»</p>
          <span class="hover:cursor-pointer text-gray-400" @click="switchDescription">
            <div class="inline-flex items-center mt-5" v-if="!isExtendedDescription">
              <p>Показати ще</p>
              <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
            </div>
            <div class="inline-flex items-center mt-5" v-else>
              <p>Приховати</p>
              <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
            </div>
          </span>
        </div>
        <div>
          <p class="font-body text-xl my-5">Характеристики</p>
          <div class="border-2 rounded-2xl p-3 px-6 space-y-5">
            <div>
              <p class="text-gray-400">Формат</p>
              <p>{{ book.format }}</p>
            </div>
            <div>
              <p class="text-gray-400">Автор</p>
              <span
                v-for="[i, author] in Object.entries(book?.authors)"
                :key="author.id"
                class="font-thin"
                >{{ author.fullName }}{{ i < specificProduct?.authors?.length - 1 ? ', ' : '' }}
              </span>
            </div>
            <div>
              <p class="text-gray-400">Тип</p>
              <p>{{ book.type }}</p>
            </div>
            <div v-if="isExtendedFeature" class="space-y-5">
              <div>
                <p class="text-gray-400">Ілюстрації</p>
                <p>{{ book.illustrationsType[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Палітурка</p>
                <p>{{ book.bindingType }}</p>
              </div>
              <div>
                <p class="text-gray-400">Видавництво</p>
                <p>{{ book.publisher.name }}</p>
              </div>
              <div>
                <p class="text-gray-400">ISBN</p>
                <p>{{ book.isbns[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Мова</p>
                <p>{{ book.languages[0] }}</p>
              </div>
              <div>
                <p class="text-gray-400">Кількість сторінок</p>
                <p>{{ book.pages }}</p>
              </div>
              <div>
                <p class="text-gray-400">Рік видання</p>
                <p>{{ book.publishedIn }}</p>
              </div>
            </div>
            <span class="hover:cursor-pointer text-gray-400" @click="switchFeature">
              <div class="inline-flex items-center mt-5" v-if="!isExtendedFeature">
                <p>Показати ще характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
              </div>
              <div class="inline-flex items-center mt-5" v-else>
                <p>Приховати всі характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
              </div>
            </span>
          </div>
        </div>
        <div>
          <p class="text-xl font-body my-5">Рецензії</p>
          <Button class="px-4 w-full py-0.5 border bg-cart-light border-cart-light rounded-full">
            Написати рецензію
          </Button>
        </div>
      </div>
    </div>
    <the-special-section name="history" title="Раніше переглядали" />
  </div>
  <div v-else class="flex"><pulse-loader class="mx-auto mt-6"></pulse-loader></div>
</template> -->

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProductStore } from '../../stores/product'
import { useCartStore } from '../../stores/cart'
import TheSpecialSection from '../../components/product/TheSpecialSection.vue'
import { useAlertStore } from '../../stores/alert'
import { useBookStore } from '../../stores/book'

export default {
  props: ['type', 'id'],
  watch: {
    id: async function () {
      this.isLoaded = false
      await this.loadProduct(this.id, this.type)
      this.isLoaded = true
    }
  },
  async mounted() {
    await this.loadProduct(this.id, this.type)
    this.isLoaded = true
  },
  data() {
    return {
      imageIndex: 0,
      isLoaded: false,
      isExtendedDescription: false,
      isExtendedFeature: false
    }
  },

  computed: {
    ...mapWritableState(useProductStore, ['product']),
    // ...mapWritableState(useBookStore, ['book']),
    //
    currentImage() {
      return this.product?.product?.images[this.imageIndex]
    },
    availability() {
      return this.product?.product?.quantity > 0
    },
    showDescription() {
      // const description = this.product.description.replaceAll(';', '. ')
      const description = this.product?.product?.description
      if (this.isExtendedDescription || description.length < 200) {
        return description
      } else {
        let shortDescription = ''
        for (let i of description.split(/[.,!;]+/)) {
          if (shortDescription.length < 200) {
            shortDescription += `${i}.`
          }
        }
        return shortDescription
      }
    }
  },
  methods: {
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useProductStore, ['loadProduct']),
    ...mapActions(useBookStore, ['loadBook']),
    ...mapActions(useCartStore, ['addItem']),
    pickImage(event) {
      if (event.originalTarget.id < this.product.images.length) {
        this.imageIndex = event.originalTarget.id
      }
    },
    // async addToCart() {
    //   document.getElementById('addToCartButton').disabled = true
    //   await this.addItem(this.product._id)
    //   this.showAlert('Товар додано')
    //   document.getElementById('addToCartButton').disabled = false
    // },
    async addToCart() {
      document.getElementById('addToCartButton').disabled = true
      await this.addItem(this.product.product._id)
      this.showAlert('Товар додано')
      document.getElementById('addToCartButton').disabled = false
    },
    async checkout() {
      await this.addToCart()
      await this.$router.push('checkout')
    },
    switchDescription() {
      this.isExtendedDescription = !this.isExtendedDescription
    },
    switchFeature() {
      this.isExtendedFeature = !this.isExtendedFeature
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
