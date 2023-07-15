<template>
  <div class="body px-2 font-rubik text-sm">
    <div class="pb-2">
      <p class="font-rubik text-lg">{{ title }}</p>
    </div>
    <div v-if="type === 'number'" class="grid grid-cols-2">
      <div class="items-center p-1">
        <span class="absolute ps-3 pt-1">Від</span>
        <input
          id="min"
          v-model="isChecked['price'][0]"
          class="rounded-2xl pr-2 w-full h-8 text-right bg-transparent border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          step="50"
          :min="filters['min']"
          :type="type"
          :placeholder="filters['min']"
          @change="updateFilters"
        />
      </div>
      <div class="items-center p-1">
        <span class="absolute ps-3 pt-1">До</span>
        <input
          id="max"
          v-model="isChecked['price'][1]"
          class="rounded-2xl pr-2 w-full h-8 text-right bg-transparent border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
          <div>
            <input
              :id="filter"
              v-model="isChecked[filterKey][filter]"
              class="relative float-left mr-[5px] mt-[0.15rem] h-[18px] w-[18px] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-whiteblue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-turquoise hover:bg-lightturquoise checked:bg-turquoise checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-whiteblue checked:focus:after:bg-transparent"
              :type="type"
              @change="updateFilters"
            />
          </div>
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
        const activeKeys = Object.entries(this.isChecked[this.filterKey])
          .filter((entry) => entry[1])
          .map((entry) => entry[0])
        this.changeFilters(this.filterKey, activeKeys)
        this.getFiltersQuery()
      }
    }
  }
}
</script>

<style></style>
