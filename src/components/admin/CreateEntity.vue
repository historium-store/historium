<template>
  <h1 class="text-3xl text-center font-sans leading-tight tracking-tight md:text-2xl">
    Створення {{ entityName }}
  </h1>
  <div>
    <div v-if="entityName === 'product'">
      <entity-form />
    </div>
  </div>
</template>

<script>
import EntityForm from './entity/EntityForm.vue'
export default {
  components: { EntityForm },
  data: () => {
    return {
      entityName: window.location.pathname.split('/').at(-1)
    }
  },
  async mounted() {
    // this.entityName = window.location.pathname.split('/').at(-1)
  }
}
</script>

<style></style>
