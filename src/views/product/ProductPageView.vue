<template>
  <div class="w-11/12 mx-auto">
    <div class="pb-2 px-2 mb-2">
      <h2 class="font-semibold">{{ title }}</h2>
      <span class="font-thin">{{ author }}</span>
    </div>
    <div class="">
      <!-- <div class="">
        <sup class="">LIKE</sup>
        <sup class="">ADD TO LIB</sup>
        <sup class="">READ PART</sup>
      </div> -->
      <!-- image viewer component -->
      <div class="w-3/4 mx-auto">
        <img class="rounded-lg" :src="currentImage" />
        <div class="thumb inline-flex">
          <div class="" v-for="image in images" :key="image.id">
            <img
              @click="pickImage"
              class="h-20 rounded-md m-2"
              :id="image.id"
              :src="image.src"
              :alt="image.id"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <button class="justify-center" @click="next">| > |</button> -->
    <div>
      <div class="inline-flex">
        <div class="price">
          <span class="">{{ price }}</span>
          <span class="">грн</span>
        </div>
        <!-- <div class="label-promotion">Акція</div> -->
      </div>
      <div class="">
        <span class="font-thin text-sm">{{
          availability ? 'В наявності' : 'Немає в наявності'
        }}</span>
        <span class="mx-2">•</span>
        <span class="font-thin text-sm">{{ type }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Книга Пес Патрон. Маленька історія про велику мрію',
      author: 'Зоряна Живка',
      price: 330,
      images: [
        {
          src: 'https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/p/e/pes_patron_malen324-1440x960.jpg',
          id: 0
        },
        {
          src: 'https://static.yakaboo.ua/media/mediagallery/image/0/1/01_210_14.jpg',
          id: 1
        },
        {
          src: 'https://static.yakaboo.ua/media/mediagallery/image/0/2/02_212_14.jpg',
          id: 2
        },
        {
          src: 'https://static.yakaboo.ua/media/mediagallery/image/0/4/04_196_14.jpg',
          id: 3
        },
        {
          src: 'https://static.yakaboo.ua/media/mediagallery/image/0/5/05_185_14.jpg',
          id: 4
        }
      ],
      type: 'Паперова книга',
      quantity: 1,
      imageIndex: 0
    }
  },
  computed: {
    currentImage() {
      return this.images[this.imageIndex].src
    },
    availability() {
      return this.quantity > 0
    }
  },
  methods: {
    pickImage(event) {
      if (0 <= event.originalTarget.id < this.images.length - 1) {
        this.imageIndex = event.originalTarget.id
      }
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
