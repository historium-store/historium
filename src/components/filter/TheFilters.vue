<template>
  <aside
    :class="'absolute mt-2 ml-48 top-24 left-0 z-30 w-full sm:w-64 h-screen transition-transform invisible xl:visible xl:transform-none'"
  >
    <div v-if="filters" class="space-y-3 px-3 py-4 bg-background_light rounded-2xl h-fit m-2">
      <FilterBlock title="Фільтри" :filters="filters['trend']" filter-key="trend" />
      <FilterBlock title="Тип книги" :filters="filters['type']" filter-key="type" />
      <FilterBlock title="Видавництво" :filters="filters['publisher']" filter-key="publisher" />
      <FilterBlock title="Мова" :filters="filters['language']" filter-key="language" />
      <FilterBlock title="Автори" :filters="filters['author']" filter-key="author" />
      <FilterBlock title="Ціна" :filters="filters['price']" type="number" filter-key="price" />
    </div>
  </aside>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import FilterBlock from './FilterBlock.vue'
import { useFilterStore } from '../../stores/filter'
export default {
  async mounted() {
    await this.loadFilters()
    console.log(this.filters)
  },
  components: { FilterBlock },
  computed: { ...mapWritableState(useFilterStore, ['filters']) },
  methods: {
    ...mapActions(useFilterStore, ['loadFilters'])
  }
}
</script>

<style></style>
