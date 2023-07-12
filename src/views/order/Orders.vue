<template>
  <div class="p-3 md:w-4/5 mx-auto my-6">
    <p class="text-center text-2xl">Мої замовлення</p>
    <div v-if="orders.length > 0">
      <div class="" v-for="order in orders" :key="order._id">
        <order-history :order="order"></order-history>
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
import OrderHistory from '../../components/order/OrderHistory.vue'
import { useOrderStore } from '../../stores/order'
import { mapActions, mapWritableState } from 'pinia'

export default {
  components: { OrderHistory },
  async mounted() {
    await this.getOrders()
  },

  computed: {
    ...mapWritableState(useOrderStore, ['orders'])
  },
  methods: {
    ...mapActions(useOrderStore, ['getOrders'])
  }
}
</script>

<style></style>
