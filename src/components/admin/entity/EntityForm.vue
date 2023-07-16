<template>
  <VeeForm v-slot="{ handleSubmit }" as="div" class="font-rubik [&>div>input]:pl-5">
    <form @submit="handleSubmit($event, createProductSubmit)">
      <entity-field name="name" placeholder="Введіть назву продукту" type="text" />
      <select
        v-model="adminStore.entities.product.creators"
        multiple
        :class="inputStyle"
        name="creators"
      >
        <option disabled>Оберіть автора (ів)</option>
        <option v-for="author in adminStore.authors" :key="author._id" :value="author.fullName">
          {{ author.fullName }}
        </option>
      </select>
      <select v-model="adminStore.entities.product.type" :class="inputStyle" name="type">
        <option disabled>Оберіть тип</option>
        <option
          v-for="product_type in adminStore.product_types"
          :key="product_type.key"
          :value="product_type.key"
        >
          {{ product_type.name }}
        </option>
      </select>
      <entity-field name="price" placeholder="Введіть ціну" type="number" />
      <textarea
        v-model="adminStore.entities.product.description"
        :class="inputStyle"
        name="description"
        placeholder="Введіть опис"
      />
      <entity-field
        v-model="adminStore.entities.product.images"
        multiple
        name="images"
        type="file"
      />
      <select v-model="adminStore.entities.product.sections" :class="inputStyle" name="type">
        <option disabled>Оберіть категорію</option>
        <option v-for="section in adminStore.sections" :key="section.key" :value="section.key">
          {{ section.name }}
        </option>
      </select>
      <!-- <entity-field name="requiresDelivery" placeholder="requiresDelivery" type="checkbox" /> -->
      <div class="flex items-center space-x-2 mt-4 px-3">
        <input
          id="requiresDelivery"
          v-model.trim="adminStore.entities['product'].requiresDelivery"
          type="checkbox"
          name="requiresDelivery"
          class="rounded-2xl pr-2 h-4 text-right bg-transparent border [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="requiresDelivery"
        />
        <label for="requiresDelivery">З доставкою</label>
      </div>
      <button
        type="submit"
        class="flex mt-5 border-2 flex-col mx-auto items-center min-w-[180px] text-base focus:outline-none font-medium rounded-3xl px-3 py-2 mb-4 bg-background bg-opacity-60 appearance-none"
      >
        Створити
      </button>
    </form>
  </VeeForm>
</template>

<script>
import { mapActions, mapStores } from 'pinia'
import { Form as VeeForm } from 'vee-validate'
import * as yup from 'yup'
import { useAdminStore } from '../../../stores/admin'
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
    return {}
  },
  computed: {
    // ...mapWritableState(useAdminStore, ['entities']),
    ...mapStores(useAdminStore),
    inputStyle() {
      return 'border mt-4 sm:text-lg rounded-2xl block w-full p-3 py-1.5 bg-background bg-opacity-30 border-white'
    }
  },
  async mounted() {
    await this.getAuthors()
    await this.getProductTypes()
    await this.getSections()
  },
  methods: {
    ...mapActions(useAdminStore, [
      'createProductSubmit',
      'getAuthors',
      'getProductTypes',
      'getSections'
    ])
  }
}
</script>

<style></style>
