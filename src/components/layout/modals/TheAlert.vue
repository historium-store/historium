<template>
  <alert
    id="alert"
    :class="
      'fixed z-50 -top-20 right-10 w-64 transition duration-500 shadow-md shadow-black ' + color
    "
    :title="title"
  ></alert>
</template>

<script>
import { Alert } from 'flowbite-vue'
import { mapActions, mapState } from 'pinia'
import { useAlertStore } from '../../../stores/alert'
export default {
  components: { Alert },
  methods: {
    ...mapActions(useAlertStore, ['showAlert'])
  },
  computed: {
    ...mapState(useAlertStore, ['title', 'color'])
  }
}
</script>

<style></style>
