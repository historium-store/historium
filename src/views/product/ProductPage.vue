<template>
  <div v-if="isLoaded" class="w-11/12 mx-auto my-6 p-4">
    <div class="grid grid-cols-1 lg:grid-cols-5">
      <div class="flex p-2 col-span-1 lg:col-span-2">
        <div class="flex flex-col mx-auto">
          <div class="md:w-3/4 mx-auto lg:w-full">
            <div class="m-auto p-6 pt-0 xl:px-12 2xl:px-24">
              <img class="rounded-2xl shadow-xl" :src="currentImage" />
            </div>
            <div class="my-4 flex space-x-2 font-rubik text-[13px]">
              <Button
                id="addToCartButton"
                class="w-1/2 py-1.5 border hover:bg-turquoise border-turquoise rounded-full"
                @click="addToCart"
              >
                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                <span class="ml-2">До кошика</span>
              </Button>
              <Button
                class="w-1/2 py-1.5 border hover:bg-turquoise border-turquoise rounded-full"
                @click="checkout"
              >
                <font-awesome-icon :icon="['fas', 'bag-shopping']" />
                <span class="ml-2">Купити</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-2 col-span-4 lg:col-span-3 font-rubik">
        <div class="grid grid-cols-4">
          <div class="col-span-4 md:col-span-3">
            <div class="mb-5">
              <h2 class="text-2xl font-body">
                {{ good.product.name }}
              </h2>
              <span
                v-for="[i, author] in Object.entries(good.product?.creators || [])"
                :key="author.id"
                class="text-lg text-gray-400"
                >{{ author }}{{ i < good.product?.creators.length - 1 ? ', ' : '' }}
              </span>
            </div>
          </div>
          <div class="col-span-4 md:col-span-1 text-turquoise">
            <h2 class="text-[32px] font-body pb-5 md:pb-0 md:text-center">
              <span class="inline-flex items-center space-x-1">
                <p>{{ good.product.price }}</p>
                <p class="text-[28px]">₴</p>
              </span>
            </h2>
          </div>
        </div>
        <div class="space-x-2">
          <Button class="px-4 h-8 border border-turquoise rounded-full"> Читати фрагмент </Button>
          <Button class="w-8 h-8 py-0.5 border bg-turquoise border-turquoise rounded-full">
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </Button>
        </div>
        <div>
          <div v-if="['book', 'e-book', 'audiobook'].includes(good.product.type.key)" class="mt-5">
            <p class="text-gray-400">Формат</p>
            <div class="inline-flex py-2">
              <Button class="px-4 h-8 border bg-turquoise border-turquoise rounded-full">
                <font-awesome-icon :icon="['fas', 'book']" />
                <span class="ml-2">{{ good.type }}</span>
              </Button>
            </div>
          </div>
          <div v-if="['book', 'e-book', 'audiobook'].includes(good.product.type.key)">
            <p class="text-gray-400">Мова книги</p>
            <div class="inline-flex py-2">
              <Button
                v-for="language in good.languages"
                :key="language"
                class="px-4 h-8 border border-turquoise rounded-full"
              >
                <span>{{ language }}</span>
              </Button>
            </div>
          </div>
          <div class="py-2">
            <p class="text-gray-400">Опис</p>
            <p>«{{ showDescription }}»</p>
            <span class="hover:cursor-pointer text-gray-400" @click="switchDescription">
              <div v-if="!isExtendedDescription" class="inline-flex items-center mt-5">
                <p>Показати ще</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
              </div>
              <div v-else class="inline-flex items-center mt-5">
                <p>Приховати</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
              </div>
            </span>
          </div>
        </div>
        <div v-if="['book', 'e-book', 'audiobook'].includes(good.product.type.key)">
          <p class="font-body text-xl my-5">Характеристики</p>
          <div class="border-2 rounded-2xl p-3 px-6 space-y-5">
            <div v-if="good.product.type.key === 'book'">
              <p class="text-gray-400">Формат</p>
              <p>{{ good.format }}</p>
            </div>
            <div>
              <p class="text-gray-400">Автор</p>
              <span
                v-for="[i, author] in Object.entries(good.authors)"
                :key="author.id"
                class="font-thin"
                >{{ author.fullName }}{{ i < good.product?.creators?.length - 1 ? ', ' : '' }}
              </span>
            </div>
            <div v-if="good.type">
              <p class="text-gray-400">Тип</p>
              <p>{{ good.type }}</p>
            </div>
            <div v-if="isExtendedFeature" class="space-y-5">
              <div v-if="good.illustrationsType.length">
                <p class="text-gray-400">Ілюстрації</p>
                <p>{{ good.illustrationsType.join(', ') }}</p>
              </div>
              <div v-if="good.bindingType">
                <p class="text-gray-400">Палітурка</p>
                <p>{{ good.bindingType }}</p>
              </div>
              <div v-if="good.publisher">
                <p class="text-gray-400">Видавництво</p>
                <p>{{ good.publisher.name }}</p>
              </div>
              <div v-if="good.isbns.length">
                <p class="text-gray-400">ISBN</p>
                <p>{{ good.isbns.join(', ') }}</p>
              </div>
              <div v-if="good.literaturePeriod.length">
                <p class="text-gray-400">Література за періодами</p>
                <p>{{ good.literaturePeriod.join(', ') }}</p>
              </div>
              <div v-if="good.languages">
                <p class="text-gray-400">Мова</p>
                <p>{{ good.languages[0] }}</p>
              </div>
              <div v-if="good.pages">
                <p class="text-gray-400">Кількість сторінок</p>
                <p>{{ good.pages }}</p>
              </div>
              <div v-if="good.publishedIn">
                <p class="text-gray-400">Рік видання</p>
                <p>{{ good.publishedIn }}</p>
              </div>
              <div v-if="good.firstPublishedIn">
                <p class="text-gray-400">Рік першого видання</p>
                <p>{{ good.firstPublishedIn }}</p>
              </div>
            </div>
            <span class="hover:cursor-pointer text-gray-400" @click="switchFeature">
              <div v-if="!isExtendedFeature" class="inline-flex items-center mt-5">
                <p>Показати ще характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
              </div>
              <div v-else class="inline-flex items-center mt-5">
                <p>Приховати всі характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
              </div>
            </span>
          </div>
        </div>
        <div v-else-if="good.product.type.key === 'board-game'">
          <p class="font-body text-xl my-5">Характеристики</p>
          <div class="border-2 rounded-2xl p-3 px-6 space-y-5">
            <div>
              <p class="text-gray-400">Пакування</p>
              <p>{{ good.packaging }}</p>
            </div>
            <div>
              <p class="text-gray-400">Розмір</p>
              <p>{{ good.packageSize }}</p>
            </div>
            <div>
              <p class="text-gray-400">Виробник</p>
              <p>{{ good.product.creators.join(', ') }}</p>
            </div>
            <div>
              <p class="text-gray-400">Тип</p>
              <p>{{ good.type }}, {{ good.kind }}</p>
            </div>
            <div v-if="isExtendedFeature" class="space-y-5">
              <div>
                <p class="text-gray-400">Вік</p>
                <p>{{ good.ages.join(', ') }}</p>
              </div>
              <div>
                <p class="text-gray-400">Мова</p>
                <p>{{ good.languages.join(', ') }}</p>
              </div>
              <div>
                <p class="text-gray-400">Кількість гравців</p>
                <p>{{ good.playersCount }}</p>
              </div>
              <div>
                <p class="text-gray-400">Артикул</p>
                <p>{{ good.article }}</p>
              </div>
            </div>
            <span class="hover:cursor-pointer text-gray-400" @click="switchFeature">
              <div v-if="!isExtendedFeature" class="inline-flex items-center mt-5">
                <p>Показати ще характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-down']" />
              </div>
              <div v-else class="inline-flex items-center mt-5">
                <p>Приховати всі характеристики</p>
                <font-awesome-icon class="px-3" :icon="['fas', 'chevron-up']" />
              </div>
            </span>
          </div>
        </div>
        <div>
          <p class="text-xl font-body my-5">Рецензії</p>
          <Button class="px-4 w-full py-0.5 border bg-turquoise border-turquoise rounded-full">
            Написати рецензію
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex">
    <pulse-loader class="mx-auto mt-6" />
  </div>
  <special-section class="mx-6" name="history" title="Раніше переглядали" />
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import SpecialSection from '../../components/layout/sections/SpecialSection.vue'
import { useAlertStore } from '../../stores/alert'
import { useCartStore } from '../../stores/cart'
import { useProductStore } from '../../stores/product'

export default {
  components: { SpecialSection },
  props: ['type', 'id'],
  data() {
    return {
      imageIndex: 0,
      isLoaded: false,
      isExtendedDescription: false,
      isExtendedFeature: false
    }
  },
  computed: {
    ...mapWritableState(useProductStore, { good: 'product' }),
    currentImage() {
      return this.good?.product?.images[this.imageIndex]
    },
    availability() {
      return this.good?.product?.quantity > 0
    },
    showDescription() {
      // const description = this.product.description.replaceAll(';', '. ')
      const description = this.good?.product?.description
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
  watch: {
    id: async function () {
      this.isLoaded = false
      await this.loadProduct(this.id, this.typeMiddlewar(this.type))
      this.isLoaded = true
    }
  },

  async mounted() {
    await this.loadProduct(this.id, this.typeMiddlewar(this.type))
    this.isLoaded = true
  },

  methods: {
    ...mapActions(useAlertStore, ['showAlert']),
    ...mapActions(useProductStore, ['loadProduct']),
    ...mapActions(useCartStore, ['addItem']),
    typeMiddlewar(type) {
      if (['e-book', 'audiobook'].includes(type)) return 'book'
      return type
    },
    pickImage(event) {
      if (event.originalTarget.id < this.good.images.length) {
        this.imageIndex = event.originalTarget.id
      }
    },
    async addToCart() {
      document.getElementById('addToCartButton').disabled = true
      await this.addItem(this.good.product._id)
      this.showAlert('Товар додано')
      document.getElementById('addToCartButton').disabled = false
    },
    async checkout() {
      await this.addToCart()
      await this.$router.push({ name: 'checkout' })
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
