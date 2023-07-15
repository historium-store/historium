<template>
  <div v-if="filters" class="space-y-3 px-3 py-4 h-fit">
    <FilterBlock title="Фільтри" :filters="filters['trend']" filter-key="trend" />
    <FilterBlock title="Тип книги" :filters="filters['bookType']" filter-key="bookType" />
    <FilterBlock title="Видавництво" :filters="filters['publisher']" filter-key="publisher" />
    <FilterBlock title="Мова" :filters="filters['language']" filter-key="language" />
    <FilterBlock title="Автори" :filters="filters['author']" filter-key="author" />
    <FilterBlock title="Ціна" :filters="filters['price']" type="number" filter-key="price" />
    <div
      class="mx-3 py-0.5 text-center font-rubik rounded-2xl border hover:cursor-pointer"
      @click="clearFilters()"
    >
      <p>Очистити</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useFilterStore } from '../../stores/filter'
import FilterBlock from './FilterBlock.vue'
export default {
  components: { FilterBlock },
  computed: { ...mapWritableState(useFilterStore, ['filters']) },
  async mounted() {
    await this.loadFilters()
  },
  methods: {
    ...mapActions(useFilterStore, ['loadFilters', 'clearFilters'])
  }
}
</script>

<style></style>
