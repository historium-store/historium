<template>
  <li class="rounded-lg hover:backdrop-brightness-125 hover:cursor-pointer">
    <div
      data-drawer-target="section-sidebar"
      data-drawer-toggle="section-sidebar"
      aria-controls="section-sidebar"
      class="flex items-center p-2"
    >
      <font-awesome-icon class="w-6" :icon="['fas', icon]" size="lg" />
      <div class="grid ml-3">
        <span :class="titleStyle ? titleStyle : 'text-lg'">{{ title }}</span>
        <span v-if="description" class="text-[11px] -mt-1">{{ description }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default { props: ['icon', 'title', 'titleStyle', 'description'] }
</script>

<style></style>
