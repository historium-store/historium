<template>
  <div class="p-3 md:w-4/5 mx-auto my-6">
    <p class="text-center text-2xl">Мої замовлення</p>
    <div v-if="orders.length && statuses.length">
      <div class="overflow-x-scroll sm:overflow-visible">
        <div class="inline-flex mt-6">
          <div :class="filterStyle + isActiveFilter('all')" @click="pickFilter('all')">Всі</div>
          <div
            v-for="status in statuses"
            :key="status"
            :class="filterStyle + isActiveFilter(status.key)"
            @click="pickFilter(status.key)"
          >
            {{ status.name }}
          </div>
        </div>
      </div>
      <div v-for="order in orders" :key="order._id" class="">
        <order-history :filter-key="activeFilter" :order="order" />
      </div>
    </div>
    <div v-else>
      <div class="flex bg-whiteblue rounded-2xl mt-6 bg-opacity-10 h-32 items-center">
        <p class="mx-auto">Замовлень ще немає</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import OrderHistory from '../../components/order/OrderHistory.vue'
import { useOrderStore } from '../../stores/order'

export default {
  components: { OrderHistory },
  data: () => {
    return {
      activeFilter: 'all'
    }
  },
  computed: {
    ...mapWritableState(useOrderStore, ['orders', 'statuses']),
    filterStyle() {
      return 'py-1 mr-2 min-w-[60px] px-3 bg-turquoise rounded-full text-center hover:cursor-pointer '
    }
  },
  async mounted() {
    await this.getOrders()
    await this.getOrderStatuses()
  },

  methods: {
    ...mapActions(useOrderStore, ['getOrders', 'getOrderStatuses']),
    isActiveFilter(key) {
      return key === this.activeFilter ? 'bg-opacity-100' : 'bg-opacity-50'
    },
    pickFilter(key) {
      this.activeFilter = key
    }
  }
}
</script>

<style></style>
