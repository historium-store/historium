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
      <div class="carousel-inner relative overflow-hidden rounded-lg border-[3px]">
        <div
          v-for="(img, i) in images"
          :id="`slide-${i}`"
          :key="i"
          :class="`${active === i ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative w-full transform transition-all duration-300 ease-in-out"
        >
          <img v-if="isSmall" class="block w-full" :src="img.small" alt="slides" />
          <img v-else class="block w-full max-h-72" :src="img.big" alt="slides" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      images: [
        {
          small: './src/assets/banner-example-small.jpg',
          big: './src/assets/banner-example-big.jpg'
        },
        {
          small: './src/assets/banner-example-small.jpg',
          big: './src/assets/banner-example-big.jpg'
        }
      ],
      active: 0,
      timerCountdown: 3000,
      interval: null
    }
  },
  mounted() {
    this.interval = setInterval(this.slide, this.timerCountdown)
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  methods: {
    slide() {
      if (this.active < this.images.length - 1) {
        this.active++
      } else this.active = 0
    }
  },
  computed: {
    isSmall() {
      if (this.windowWidth < 558) return true
      else return false
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
