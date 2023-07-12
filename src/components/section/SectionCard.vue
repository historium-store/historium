<template>
  <div class="flex-col m-2 p-3 items-center hover:cursor-pointer">
    <div class="border-2 rounded-2xl h-32 my-2"></div>
    <p class="mx-auto text-center font-rubik text-xs">{{ name }}</p>
  </div>
</template>

<script>
export default {
  props: ['name']
}
</script>

<style></style>
