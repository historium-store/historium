<template>
  <div class="rounded-lg hover:bg-primary-1000">
    <div class="card-poster bg-primary-950 rounded-md p-3">
      <img class="rounded-sm object-cover" :src="good.image" alt="" />
    </div>
    <div class="card-content my-2 px-2">
      <div class="card-category">
        <a class="title-label">{{ good.name }}</a>
        <div class="author-wrapper">
          <a class="creator-label text-[12px]">{{ good.authors[0] }}</a>
        </div>
      </div>
      <div class="price-wrapper">
        <div class="price-display text-[18px]">
          <span class="pe-1">{{ good.price }}</span>
          <span class="price-display-currency">грн</span>
        </div>
      </div>
      <div class="availability-status">
        <span :class="`status-text ` + (isAvailable ? 'text-green-500' : 'text-red-500')">{{
          isAvailable ? 'В наявності' : 'Немає в наявності'
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['good', 'isAvailable']
}
</script>
