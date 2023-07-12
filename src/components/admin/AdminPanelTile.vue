<template>
  <RouterLink :to="link" class="flex p-2 m-2 h-20 bg-primary-1000 rounded-lg hover:bg-primary-950">
    <div class="mx-auto items-center inline-flex space-x-3">
      <font-awesome-icon size="lg" :icon="['fas', icon]" style="color: #ffffff" />
      <p class="text-xl">
        {{ title }}
      </p>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: ['link', 'title', 'icon']
}
</script>

<style></style>
