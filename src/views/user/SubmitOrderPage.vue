<template>
  <div class="flex-col md:w-3/4 mx-auto p-12 m-6 mt-0 pt-6">
    <!-- <div class="flex-col rotate-[10deg] text-turquoise -mt-[410px]"> -->
    <div
      class="xl:ml-24 absolute mt-24 sm:mt-32 md:mt-48 lg-mt-24 xl:mt-52 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[10deg] text-turquoise"
    >
      <p class="lg:text-2xl md:text-based text-sm mx-auto text-center">
        Дякуємо, ваше замовлення прийнято!
      </p>
      <p class="lg:text-lg md:text-based text-xs mx-auto text-center max-w-[460px] mt-2 md:mt-5">
        Найближчим часом з вами зв'яжеться менеджер для підтвердження замовлення.
      </p>
      <p class="lg:text-lg md:text-based text-xs text-center mt-2 md:mt-5">
        Номер замовлення №{{ orderNumber }}
      </p>
    </div>
    <img class="mx-auto" src="../../assets/envelope.png" alt="submit-order" />
  </div>
</template>

<script>
export default {
  props: ['orderNumber']
}
</script>

<style></style>
