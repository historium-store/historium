<template>
  <!-- <Field v-slot="" :name="name">
    <input
      :id="name"
      v-model.trim="vslot.field.value"
      :type="type"
      :name="name"
      :class="inputStyle(vslot.meta)"
      :placeholder="placeholder"
      @input="vslot.handleChange"
    /> -->
  <!-- <p v-if="meta.errors" class="text-sm ps-3 mt-1">{{ meta.errors[0] }}</p> -->
  <!-- </Field> -->
  <input
    :id="name"
    v-model.trim="entities['product'][name]"
    :type="type"
    :name="name"
    :class="inputStyle"
    :placeholder="placeholder"
  />
</template>

<script>
import { mapWritableState } from 'pinia'
import { useAdminStore } from '../../../stores/admin'
// import { Field } from 'vee-validate'

export default {
  components: {},
  props: ['name', 'placeholder', 'type'],
  computed: {
    ...mapWritableState(useAdminStore, ['entities']),
    inputStyle() {
      return 'border mt-4 md:text-lg rounded-2xl block w-full p-3 py-1.5 bg-background bg-opacity-30 border-white appearance-none'
    }
  },
  methods: {}
}
</script>

<style></style>
