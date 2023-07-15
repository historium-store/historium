<template>
  <alert
    :class="
      'fixed z-50 -bottom-16 right-10 w-max transition duration-500 shadow-md shadow-black px-6 ' +
      color
    "
    :title="title"
  />
</template>

<script>
import { Alert } from 'flowbite-vue'
import { mapActions, mapState } from 'pinia'
import { useAlertStore } from '../../../stores/alert'
export default {
  components: { Alert },
  computed: {
    ...mapState(useAlertStore, ['title', 'color'])
  },
  methods: {
    ...mapActions(useAlertStore, ['showAlert'])
  }
}
</script>

<style></style>
