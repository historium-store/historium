<template>
  <VeeForm
    v-slot="slot"
    :validation-schema="schemaProduct"
    as="div"
    class="mt-12 [&>div>input]:pl-5"
  >
    <form @submit="slot.handleSubmit($event, createProductSubmit)">
      <entity-field
        :name="name"
        :model="formData.name"
        placeholder="Введіть назву продукту"
        type="text"
      ></entity-field>
      <button
        type="submit"
        class="flex mt-5 border-2 flex-col mx-auto items-center min-w-[180px] text-base focus:outline-none font-medium rounded-3xl px-3 py-2 mb-4 bg-background bg-opacity-60"
      >
        Створити
      </button>
    </form>
  </VeeForm>
</template>

<script>
import { Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import EntityField from './EntityField.vue'
export default {
  components: { VeeForm, EntityField },
  setup() {
    const schemaProduct = yup.object({
      name: yup.string().required().min(2).max(50),
      creators: ['Ілларіон Павлюк'],
      type: '64737ffb4adab164082714ba',
      price: 200,
      description:
        'Київського кримінального психолога Андрія Гайстера відправляють консультантом у богом забуте селище Буськів Сад. Зимової ночі там зникла маленька дівчинка. А ще там водиться Звір — серійний маніяк, убивств якого тамтешні мешканці воліють не помічати... У цьому проклятому селищі, де все по колу і всі живуть життям, яке ненавидять, розслідування постійно заходить у глухий кут. Андрій вірить, що загублена дівчинка, попри все, жива і він її знайде. Але нікому, крім нього, це не потрібно. «Я бачу, вас цікавить пітьма» — історія про непробивну людську байдужість і пітьму всередині нас. Про чесність із собою й ціну, яку ми готові заплатити за забуття. Про гріхи, що матеріалізуються, і спокуту, дорожчу за спокій.',
      images: [
        'https://historium-store-s3-eu.s3.eu-central-1.amazonaws.com/9a155b82-3134-489f-aac4-2ab11e460f1c.webp'
      ],
      sections: ['6473a52ec9dd40d6f991c4e9'],
      requiresDelivery: false
    })

    return { schemaProduct }
  },
  data: () => {
    return {
      formData: {
        name: '',
        creators: [],
        type: '',
        price: 0,
        description: '',
        images: [],
        sections: [],
        requiresDelivery: false
      }
    }
  },
  computed: {}
}
</script>

<style></style>
