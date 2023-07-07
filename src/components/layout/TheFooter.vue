<template>
  <footer class="mt-auto bg-cart-dark bg-opacity-40">
    <div class="xl:ml-64 w-4/5 mx-auto my-12">
      <div class="m-3">
        <img class="h-20 mx-auto" src="../../assets/wb-logo.png" />
        <hr class="mt-6 border-[1.5px] rounded mx-auto" />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 mx-auto my-8">
        <div class="mx-auto">
          <p class="text-teal-500 text-2xl">Контакти</p>
          <p class="text-teal-700">Наша адреса</p>
          <p class="">м. Одеса, вул. Казкова, 17</p>
          <p class="text-teal-700">Режим роботи</p>
          <p class="text-md">Пн-Пт: 09:00-20:00</p>
          <p class="text-md">Сб-Нд: 10:00-19:00</p>
        </div>
        <div class="mx-auto">
          <p class="text-teal-500 text-2xl">Інформація</p>
          <div class="mt-3 space-y-1">
            <p>Доставка та оплата</p>
            <p>Подарункові сертифікати</p>
            <p>Повернення товару</p>
            <p>Блог</p>
          </div>
        </div>
        <div class="mx-auto col-span-2 mt-8 md:mt-0 md:col-span-1">
          <div class="md:space-y-2 md:block inline-flex space-x-5 md:space-x-0">
            <p class="text-teal-500 text-xl">+38 (096) 324 23 23</p>
            <p class="text-teal-500 text-xl">+38 (093) 534 22 55</p>
          </div>
          <div class="flex items-center justify-center space-x-6 mt-3">
            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
            <div class="w-8 h-8 rounded-full bg-slate-100"></div>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-6 flex w-3/4 text-sm space-x-2">
        <input
          class="w-4/5 px-3 py-1 rounded-2xl border-2 items-center text-white bg-transparent"
          type="search"
          placeholder="Введіть email"
        />
        <input class="px-3 rounded-2xl bg-teal-600" type="button" value="Отримувати цікавинки" />
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style></style>
