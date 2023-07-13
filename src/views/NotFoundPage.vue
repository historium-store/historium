<template>
  <div class="md:w-4/5 mx-auto m-6 -mt-12 p-6">
    <img
      class="w-[700px] mx-auto pointer-events-none md:-mt-24 lg:-mt-32 md:h-[600px] lg:h-[700px]"
      src="../assets/not-found.png"
      alt="not-found"
    />
    <div class="-mt-46 md:-mt-28">
      <p class="text-center text-xl md:text-4xl m-6">Упс! Щось ти загубився...</p>
      <router-link
        to="/"
        class="flex w-1/2 first-of-type:md:w-1/3 mx-auto m-3 bg-turquoise py-1.5 rounded-full items-center"
      >
        <p class="mx-auto md:text-lg px-2">Повернутися на головну сторінку</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
