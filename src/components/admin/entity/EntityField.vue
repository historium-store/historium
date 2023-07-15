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
  <div></div>
</template>

<script>
// import { Field } from 'vee-validate'

export default {
  components: {  },
  props: ['name', 'model', 'placeholder', 'type'],
  methods: {
    inputStyle(meta) {
      return (
        'border mt-4 sm:text-lg rounded-2xl block w-full p-3 bg-background bg-opacity-30 ' +
        (meta.validated ? (meta.valid ? 'border-turquoise' : 'border-red-600') : 'border-white')
      )
    }
  }
}
</script>

<style></style>
