<template>
  <div class="flex relative m-2 mx-auto p-2 items-center hover:cursor-pointer">
    <!-- <div class="border-2 rounded-2xl h-32 my-2" /> -->
    <img src="../../assets/section-book.png" alt="section-book" />
    <div class="inner w-24">
      <font-awesome-icon class="my-4" size="2xl" :icon="['fab', 'readme']" style="color: #ffffff" />
      <p class="font-sans text-xs">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style>
.inner {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-width: 50%;
  text-align: center;
}
</style>
