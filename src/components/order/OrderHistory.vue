<template>
  <div
    v-if="filterKey === 'all' || filterKey === order.status.key"
    :class="'rounded-3xl my-4 p-1 md:p-3 font-rubik bg-turquoise ' + orderHistoryStyle"
  >
    <div class="text-xs md:text-base flex justify-between p-3">
      <p>№ {{ order.number }}</p>
      <p>{{ orderDate }}</p>
      <p>{{ order.status.name }}</p>
    </div>
    <hr class="mx-4 border-[1.5px] rounded-full" />
    <div>
      <order-items :order="order" />
    </div>
    <div v-if="isExtended" class="p-3 text-xs md:text-base">
      <div class="flex justify-between my-3">
        <p>{{ totalQuantityLabel }}</p>
        <p>{{ order.totalPrice - order.deliveryPrice }} ₴</p>
      </div>
      <hr />
      <div class="flex justify-between my-3">
        <p>{{ order.deliveryInfo.type }}</p>
        <p>{{ order.deliveryPrice }} ₴</p>
      </div>
      <hr />
      <div class="flex justify-between my-3">
        <p>До сплати</p>
        <p>{{ order.totalPrice }} ₴</p>
      </div>
      <hr />
      <div class="my-3">
        <div class="flex justify-between">
          <p>Замовник</p>
          <p>{{ order.contactInfo.firstName }}</p>
        </div>
        <div class="flex justify-between">
          <p>Email</p>
          <p>{{ order.contactInfo.email }}</p>
        </div>
        <div class="flex justify-between">
          <p>Телефон</p>
          <p>{{ order.contactInfo.phoneNumber }}</p>
        </div>
        <div class="flex justify-between">
          <p>Спосіб оплати</p>
          <p>{{ order.paymentType }}</p>
        </div>
      </div>
      <hr />
    </div>
    <div class="flex justify-between hover:cursor-pointer" @click="extendInfoToggle">
      <div class="inline-flex space-x-1 text-lg p-3">
        <p>Всього:</p>
        <p>{{ order.totalPrice }} ₴</p>
      </div>
      <div v-if="!isExtended" class="inline-flex items-center space-x-2 p-3">
        <p class="text-xs">Детальніше</p>
        <font-awesome-icon
          class="text-xl w-1/12"
          :icon="['fas', 'chevron-down']"
          @click="pickDeliveryType(type)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OrderItems from '../order/OrderItems.vue'
export default {
  components: { OrderItems },
  props: ['order', 'filterKey'],
  data: () => ({
    orderDate: '',
    orderStatus: '',
    isExtended: false
  }),
  computed: {
    totalQuantityLabel() {
      const totalQuantityLabel =
        this.order.items.length % 10 === 1 && this.order.items.length !== 11
          ? 'товар'
          : this.order.items.length < 10 &&
            1 < this.order.items.length % 10 &&
            this.order.items.length % 10 < 5
          ? 'товари'
          : 'товарів'

      return `${this.order.items.length} ${totalQuantityLabel}`
    },
    orderHistoryStyle() {
      return this.orderStatus === 'active'
        ? 'bg-opacity-100'
        : this.orderStatus === 'completed'
        ? 'bg-opacity-70'
        : 'bg-opacity-40'
    }
  },
  mounted() {
    const orderDate = new Date(this.order.createdAt).toString().split(' ')
    this.orderDate = `${orderDate[2]} ${orderDate[1]} ${orderDate[3]}`
    this.orderStatus = this.order.status.key
  },
  methods: {
    extendInfoToggle() {
      this.isExtended = !this.isExtended
    }
  }
}
</script>

<style></style>
