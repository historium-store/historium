<template>
  <div class="w-4/5 mx-auto my-6">
    <p class="text-center text-2xl">Мої замовлення</p>
    <div class="" v-for="order in orders" :key="order._id">
      <order-history :order="order"></order-history>
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
