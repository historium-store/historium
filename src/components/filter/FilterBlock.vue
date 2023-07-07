<template>
  <div class="title">
    <span>{{ title }}</span>
  </div>
  <div class="body px-2">
    <div v-if="type === 'number'" class="grid grid-cols-2 text-black h-8">
      <div class="items-center">
        <span class="absolute">від</span>
        <input
          class="rounded-md ps-6"
          step="50"
          :min="filters['min']"
          :type="type"
          :value="filters['min']"
        />
      </div>
      <div class="items-center">
        <span class="absolute">до</span>
        <input
          class="rounded-md ps-6"
          step="50"
          :max="filters['max']"
          :type="type"
          :value="filters['max']"
        />
      </div>
      <!-- <label for="min">Від {{ filters['min'] }}</label> -->
      <!-- <label for="max">До {{ filters['max'] }}</label> -->
    </div>
    <ul v-else>
      <li v-for="filter in filters" :key="filter">
        <div class="inline-flex items-center">
          <input v-model="isChecked[filter]" class="w-5 h-5" :id="filter" :type="type" />
          <label class="pl-3 text-ellipsis whitespace-nowrap" :for="filter">{{ filter }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
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
  data: () => ({
    isChecked: {}
  }),
  watch: {
    isChecked: {
      handler() {
        this.updateFilters()
        this.getFiltersQuery()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(useFilterStore, ['changeFilters', 'getFiltersQuery']),
    updateFilters() {
      const activeKeys = Object.entries(this.isChecked)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
      this.changeFilters(this.filterKey, activeKeys)
    }
  }
}
</script>

<style></style>
