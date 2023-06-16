<template>
  <input
    @keydown="searchInputTrigger"
    type="search"
    class="relative block w-max min-w-0 flex-auto rounded-2xl border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:outline-none"
    placeholder="Знайти книгу"
    aria-label="Знайти книгу"
    aria-describedby="button-addon2"
    v-model.trim="searchInput"
  />
  <span
    @click="search"
    class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal hover:cursor-pointer"
    id="basic-addon2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
      <path
        fill-rule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clip-rule="evenodd"
      />
    </svg>
  </span>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia'
import { useSearchStore } from '../../stores/search'
export default {
  computed: {
    ...mapWritableState(useSearchStore, ['searchInput'])
  },
  methods: {
    ...mapActions(useSearchStore, ['search']),
    async searchInputTrigger(e) {
      if (e.key === 'Enter') {
        await this.search()
      }
    }
  }
}
</script>
