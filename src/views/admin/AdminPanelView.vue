<template>
  <div>
    <h1 class="text-center text-3xl my-5">Admin Panel</h1>
    <div class="[&>div]:hover:cursor-pointer grid grid-cols-2 gap-5 w-11/12 mx-auto mt-4">
      <RouterLink
        to="products"
        class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950"
      >
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'book']" style="color: #ffffff" />
          <p class="text-xl">Товари</p>
        </div>
      </RouterLink>

      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'list']" style="color: #ffffff" />
          <p class="text-xl">Категорії</p>
        </div>
      </div>
      <hr class="col-span-2 my-4 border-[1.5px] rounded mx-3" />
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'users']" style="color: #ffffff" />
          <p class="text-xl">Автори</p>
        </div>
      </div>
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'gear']" style="color: #ffffff" />
          <p class="text-xl">Видавництва</p>
        </div>
      </div>
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'image']" style="color: #ffffff" />
          <p class="text-xl">Ілюстратори</p>
        </div>
      </div>
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'language']" style="color: #ffffff" />
          <p class="text-xl">Перекладачі</p>
        </div>
      </div>
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'pen']" style="color: #ffffff" />
          <p class="text-xl">Редактори</p>
        </div>
      </div>
      <div class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'clipboard']" style="color: #ffffff" />
          <p class="text-xl">Компонувальники</p>
        </div>
      </div>
      <hr class="col-span-2 my-4 border-[1.5px] rounded mx-3" />
      <div class="col-span-2 flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
        <div class="mx-auto items-center inline-flex space-x-3">
          <font-awesome-icon size="lg" :icon="['fas', 'user']" style="color: #ffffff" />
          <p class="text-xl">Клієнти</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
