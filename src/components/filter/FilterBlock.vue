<template>
  <div class="body px-2 font-rubik text-sm">
    <div class="pb-2">
      <p class="font-rubik text-lg">{{ title }}</p>
    </div>
    <div v-if="type === 'number'" class="grid grid-cols-2 text-black">
      <div class="items-center p-1">
        <span class="absolute ps-1 pt-1">від</span>
        <input
          id="min"
          v-model="isChecked['price'][0]"
          class="rounded-md pr-2 w-full h-8 text-right"
          step="50"
          :min="filters['min']"
          :type="type"
          :placeholder="filters['min']"
          @change="updateFilters"
        />
      </div>
      <div class="items-center p-1">
        <span class="absolute ps-1 pt-1">до</span>
        <input
          id="max"
          v-model="isChecked['price'][1]"
          class="rounded-md pr-2 w-full h-8 text-right"
          step="50"
          :max="filters['max']"
          :type="type"
          :placeholder="filters['max']"
          @change="updateFilters"
        />
      </div>
    </div>
    <ul v-else>
      <li v-for="filter in filters" :key="filter">
        <div class="inline-flex items-center w-full py-1">
          <input :id="filter" v-model="isChecked[filter]" :type="type" @change="updateFilters" />
          <label class="pl-3 whitespace-nowrap overflow-hidden text-ellipsis" :for="filter">{{
            filter
          }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useFilterStore } from '../../stores/filter'
export default {
  props: {
    title: String,
    filters: Object,
    filterKey: String,
    type: {
      default: 'checkbox'
    }
  },
  computed: {
    ...mapWritableState(useFilterStore, ['isChecked'])
  },
  methods: {
    ...mapActions(useFilterStore, ['changeFilters', 'getFiltersQuery']),
    updateFilters() {
      if (this.filterKey === 'price') {
        this.changeFilters(this.filterKey, this.isChecked.price.join('-'))
      } else {
        const isCheckedCopy = { ...this.isChecked }
        delete isCheckedCopy.price
        const activeKeys = Object.entries(isCheckedCopy)
          .filter((entry) => entry[1])
          .map((entry) => entry[0])
        this.changeFilters(this.filterKey, activeKeys)
      }
      this.getFiltersQuery()
    }
  }
}
</script>

<style></style>
