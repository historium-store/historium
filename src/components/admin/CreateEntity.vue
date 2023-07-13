<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Створення {{ entityName }}
  </h1>
  <!-- <div>
    <div v-if="entityName === ''"></div>
  </div> -->
</template>

<script>
export default {
  data: () => {
    return {
      entityName: undefined
    }
  },
  async mounted() {
    // this.entityName = this.$route.fullPath
    // this.entityName = router?.currentRoute?.value?.params?.instance?.[0]
  }
}
</script>

<style></style>
