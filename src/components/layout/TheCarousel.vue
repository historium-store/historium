<template>
  <div class="mx-6 my-12">
    <div class="relative slide">
      <div class="carousel-indicators absolute bottom-0 flex w-full justify-center items-center">
        <ol class="z-0 flex w-4/12 justify-center">
          <li
            v-for="(img, i) in images"
            :key="i"
            class="md:w-4 md:h-2 rounded-full cursor-pointer mx-2"
          ></li>
        </ol>
      </div>
      <div class="carousel-inner relative overflow-hidden rounded-lg">
        <div
          v-for="(img, i) in images"
          :id="`slide-${i}`"
          :key="i"
          :class="`${active === i ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative w-full transform transition-all duration-300 ease-in-out"
        >
          <img class="block w-full h-72" :src="img" alt="slides" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://static.yakaboo.ua/media/banner/image/130056295231.png',
        'https://static.yakaboo.ua/media/banner/image/13002210052023.png',
        'https://static.yakaboo.ua/media/banner/image/13002080520231.png'
      ],
      active: 0,
      timerCountdown: 3000,
      interval: null
    }
  },
  mounted() {
    this.interval = setInterval(this.slide, this.timerCountdown)
  },
  methods: {
    slide() {
      if (this.active < this.images.length - 1) {
        this.active++
      } else this.active = 0
    }
  }
}
</script>

<style scoped>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>
