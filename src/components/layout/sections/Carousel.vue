<template>
  <div v-if="images" class="mx-6 my-12">
    <div class="relative slide">
      <img class="absolute mt-24 z-20 -ms-[12px]" src="../../../assets/star-4.png" alt="star" />
      <img
        class="absolute rotate-90 z-20 -mt-[13px] ms-[30%]"
        src="../../../assets/star-2.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 z-20 -mt-[13px] ms-48"
        src="../../../assets/star-2.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 z-20 -mt-[11px] ms-[63%]"
        src="../../../assets/star-1.png"
        alt="star"
      />
      <img
        class="absolute mt-8 -me-[5px] z-20 right-0"
        src="../../../assets/star-1.png"
        alt="star"
      />
      <img
        class="absolute mt-28 -me-[7px] z-20 right-0"
        src="../../../assets/star-3.png"
        alt="star"
      />
      <div class="carousel-inner relative overflow-hidden rounded-3xl border-[3px]">
        <div
          v-for="(img, i) in images"
          :id="`slide-${i}`"
          :key="i"
          :class="`${active === i ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
        >
          <img
            v-if="isSmall"
            class="block w-full max-h-[1200px]"
            :src="img.imageSquare"
            alt="slides"
          />
          <img
            v-else
            class="block w-full pointer-events-none max-h-[371px]"
            :src="img.imageRect"
            alt="slides"
          />
        </div>
      </div>
      <img
        class="absolute rotate-90 -mt-[16px] ms-[40%]"
        src="../../../assets/star-2.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 -mt-[12px] ms-[20%]"
        src="../../../assets/star-1.png"
        alt="star"
      />
      <img
        class="absolute rotate-90 -mt-[20px] ms-[60%]"
        src="../../../assets/star-3.png"
        alt="star"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useApiStore } from '../../../stores/api'
export default {
  data() {
    return {
      windowWidth: window.innerWidth,
      images: [],
      active: 0,
      timerCountdown: 6000,
      interval: null
    }
  },
  computed: {
    isSmall() {
      if (this.windowWidth < 640) return true
      else return false
    }
  },
  async mounted() {
    this.interval = setInterval(this.slide, this.timerCountdown)
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    const data = await this.get('banner')
    this.images = data
  },
  methods: {
    ...mapActions(useApiStore, ['get']),
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
