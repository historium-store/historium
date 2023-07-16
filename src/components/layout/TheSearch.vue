<template>
  <div :id="`search-block-${name}`" class="flex-1 flex-col px-6 items-center z-50">
    <div class="flex flex-1 mt-3">
      <input
        v-model.trim="searchInput"
        type="search"
        class="relative block w-max min-w-0 flex-auto rounded-2xl border border-solid border-white bg-transparent bg-clip-padding px-3 py-[0.25rem] text-sm font-normal leading-[1.8] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:outline-none"
        placeholder="Знайти книгу"
        aria-label="Знайти книгу"
        aria-describedby="button-addon2"
        @keydown="searchInputTrigger"
        @change="searchInputTrigger"
      />
      <span
        v-if="name === 'pc'"
        class="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal hover:cursor-pointer"
      >
        <font-awesome-icon
          size="lg"
          class="max-sm:text-2xl"
          :icon="['fas', 'search']"
          style="color: #ffffff"
          @click="search"
        />
      </span>
    </div>
    <search-modal v-if="searchInput" :name="name" />
  </div>
</template>
<script>
import { mapActions, mapWritableState } from 'pinia'
import { useSearchStore } from '../../stores/search'
import SearchModal from '../user/Search.vue'

export default {
  components: { SearchModal },
  props: ['name'],
  computed: {
    ...mapWritableState(useSearchStore, ['searchInput', 'results'])
  },
  methods: {
    ...mapActions(useSearchStore, ['search', 'openSearch', 'closeSearch']),
    async searchInputTrigger(e) {
      this.openSearch()
      await this.search()
      if (!this.searchInput) this.closeSearch()
      if (e.key === 'Enter') {
        await this.$router.push({ path: '/search', query: { q: this.searchInput } })
        this.closeSearch()
      }
    }
  }
}
</script>
