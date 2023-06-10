<template>
  <div class="rounded-lg hover:cursor-pointer">
    <div class="card-poster bg-teal-950 rounded-md p-3">
      <img class="rounded-sm h-[200px] mx-auto" :src="good?.image" alt="" />
    </div>
    <div class="card-content min-h-[120px] my-2 px-2 flex flex-col">
      <div class="card-category">
        <p
          class="title-label whitespace-nowrap overflow-hidden text-ellipsis hover:whitespace-normal"
        >
          {{ good?.name }}
        </p>
        <div class="author-wrapper">
          <a class="creator-label text-[12px]">{{ good.authors?.[0] }}</a>
        </div>
      </div>
      <div class="mt-auto">
        <div class="price-wrapper">
          <div class="price-display text-[18px]">
            <span class="pe-1">{{ good?.price }}</span>
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
  </div>
</template>
<script>
export default {
  props: ['good', 'isAvailable']
}
</script>
