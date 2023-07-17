<template>
  <div
    class="col-span-2 border-[1.5px] rounded-xl bg-transparent space-x-2 p-3 hover:cursor-pointer"
    @click="pickDeliveryType(type)"
  >
    <div class="flex">
      <div class="w-1/12">
        <input
          :checked="type === delivery.pickedType"
          class="relative float-left mr-[5px] mt-[0.15rem] h-[18px] w-[18px] appearance-none rounded-full border-[0.125rem] border-solid border-whiteblue outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] checked:border-turquoise hover:bg-lightturquoise checked:bg-turquoise checked:before:opacity-[0.16] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-whiteblue checked:focus:after:bg-transparent"
          type="radio"
          name="deliveryType"
          :value="type.key"
        />
      </div>
      <div class="flex-col w-10/12">
        <p class="text-lg">
          {{ type.name }}
        </p>
        <p class="">{{ type.price }} ₴</p>
      </div>
      <font-awesome-icon
        class="text-xl w-1/12"
        :icon="['fas', 'chevron-down']"
        @click="pickDeliveryType(type)"
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
          'border sm:text-lg rounded-2xl p-3 m-1 bg-turquoise bg-opacity-60 h-10 ' +
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
