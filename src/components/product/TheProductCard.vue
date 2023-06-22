<template>
  <div class="rounded-lg hover:cursor-pointer px-2">
    <div class="card-poster">
      <div class="mx-auto w-[130px]">
        <img
          class="border-[3px] h-[200px] w-[130px] object-cover rounded-xl"
          :src="good?.image"
          alt=""
        />
        <div class="-mt-[192px] ml-[8px] border-[3px] rounded-xl h-[200px] w-[130px] -z-20"></div>
      </div>
    </div>
    <div class="card-content min-h-[100px] my-2 flex flex-col mx-auto">
      <div class="card-category flex-col line-clamp-3 hover:line-clamp-none">
        <p class="title-label font-rubik text-[14px] text-center text-ellipsis">
          {{ good?.name }}
        </p>
        <div class="author-wrapper text-center">
          <a class="creator-label text-[13px] text-gray-400">{{ good.authors?.[0] }}</a>
        </div>
      </div>
      <div class="mt-auto">
        <div class="price-wrapper text-center">
          <div class="price-display text-[24px]">
            <span class="pe-1">{{ good?.price }}</span>
            <span class="price-display-currency">₴</span>
          </div>
        </div>
        <!-- <div class="availability-status">
          <span :class="`status-text ` + (isAvailable ? 'text-green-500' : 'text-red-500')">{{
            isAvailable ? 'В наявності' : 'Немає в наявності'
          }}</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['good', 'isAvailable']
}
</script>
