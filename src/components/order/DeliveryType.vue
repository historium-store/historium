<template>
  <div
    class="col-span-2 border-[1.5px] rounded-xl bg-transparent space-x-2 p-3 hover:cursor-pointer"
    @click="pickDeliveryType(type)"
  >
    <div class="flex">
      <div class="w-1/12">
        <input
          :checked="type === delivery.pickedType"
          class="w-5 h-5 hover:cursor-pointer"
          type="radio"
          name="deliveryType"
          :value="type.key"
        />
      </div>
      <div class="flex-col w-10/12">
        <p class="text-lg">{{ type.name }}</p>
        <p class="">{{ type.price }} ₴</p>
      </div>
      <font-awesome-icon
        @click="pickDeliveryType(type)"
        class="text-xl w-1/12"
        :icon="['fas', 'chevron-down']"
      />
    </div>
    <div v-if="type === delivery.pickedType" class="grid grid-cols-2 my-5">
      <input
        v-for="input in additionalInfo[type.key]?.inputs"
        :key="input.name"
        v-model="delivery[input.name]"
        type="text"
        :placeholder="input.title"
        :class="
          'border sm:text-lg rounded-2xl p-3 m-1 bg-cart-light bg-opacity-60 h-10 ' +
          (input?.fullWidth ? 'col-span-2' : 'col-span-1')
        "
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useOrderStore } from '../../stores/order'
// const contactInfo = [
//   { name: 'name', title: "Ім'я", value: '' },
//   { name: 'surname', title: 'Прізвище', value: '' }
// ]

const fullAddressInfo = [
  { name: 'street', title: 'Назва вулиці', value: '', fullWidth: true },
  { name: 'house', title: 'Будинок', value: '' },
  { name: 'flat', title: 'Кв./Офіс', value: '' }
]
export default {
  props: ['type'],
  data: () => ({
    isOpened: false,
    additionalInfo: {
      'viddilennya-ukrposhta': {
        inputs: [{ name: 'address', title: 'Адреса відділення', value: '', fullWidth: true }]
      },
      'viddilennya-nova-poshta': {
        inputs: [{ name: 'address', title: 'Адреса відділення', value: '', fullWidth: true }]
      },
      'poshtomat-nova-poshta': {
        inputs: [{ name: 'address', title: 'Адреса поштомата', value: '', fullWidth: true }]
      },
      'kurier-ukrposhta': {
        inputs: [...fullAddressInfo]
      },
      'kurier-nova-poshta': {
        inputs: [...fullAddressInfo]
      }
    }
  }),
  computed: {
    ...mapWritableState(useOrderStore, ['delivery'])
  },
  methods: {
    ...mapActions(useOrderStore, ['pickDeliveryType'])
  }
}
</script>

<style></style>
