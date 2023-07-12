<template>
  <div class="title">
    <span>{{ title }}</span>
  </div>
  <!-- {{ isChecked }} -->
  <div class="body px-2 font-rubik text-xs">
    <div v-if="type === 'number'" class="grid grid-cols-2 text-black">
      <div class="items-center p-1">
        <span class="absolute ps-1 pt-1">від</span>
        <input
          class="rounded-md pr-2 w-full h-8 text-right"
          step="50"
          :min="filters['min']"
          :type="type"
          :value="filters['min']"
        />
      </div>
      <div class="items-center p-1">
        <span class="absolute ps-1 pt-1">до</span>
        <input
          class="rounded-md pr-2 w-full h-8 text-right"
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
        <div class="inline-flex items-center w-full py-1">
          <input @change="updateFilters" v-model="isChecked[filter]" :id="filter" :type="type" />
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
  // data: () => ({
  //   isChecked: {}
  // }),
  // watch: {
  //   isChecked: {
  //     handler() {
  //       console.log('isChecked watch')
  //       // this.updateFilters()
  //       // this.getFiltersQuery()
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    ...mapActions(useFilterStore, ['changeFilters', 'getFiltersQuery']),
    updateFilters() {
      const activeKeys = Object.entries(this.isChecked)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
      this.changeFilters(this.filterKey, activeKeys)
      this.getFiltersQuery()
    }
  },
  computed: {
    ...mapWritableState(useFilterStore, ['isChecked'])
  }
}
</script>

<style></style>
