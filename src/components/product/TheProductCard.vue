<template>
  <div class="rounded-lg hover:cursor-pointer">
    <div class="card-poster bg-gray-950 rounded-md p-3">
      <img class="rounded-sm h-[180px]" :src="good.image" alt="" />
    </div>
    <div class="card-content my-2 px-2">
      <div class="card-category">
        <a class="title-label">{{ good.name }}</a>
        <div class="author-wrapper">
          <a class="creator-label text-[12px]">{{ good.authors[0] }}</a>
        </div>
      </div>
      <div class="price-wrapper mt-2">
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
