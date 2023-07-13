<template>
  <div class="m-3 p-3 flex items-center space-x-2 hover:cursor-pointer" @click="goBack">
    <font-awesome-icon class="w-6" :icon="['fas', 'arrow-left']" size="lg" />
    <p class="font-rubik">Назад</p>
  </div>
  <div
    class="flex border-2 space-x-3 p-3 m-5 font-rubik items-center w-1/4 hover:cursor-pointer"
    @click="create"
  >
    <p>Add new {{ instance[0] }}</p>
    <font-awesome-icon class="text-xl text-green-600" :icon="['fas', 'plus']" />
  </div>
  <div v-if="instanceItems" class="m-5 overflow-x-scroll font-rubik text-[12px]">
    <table class="table-auto w-max border-collapse">
      <thead>
        <tr>
          <th class="border-2 p-3">Edit</th>
          <th class="border-2 p-3">Remove</th>
          <th v-for="key in instanceKeys.slice(1)" :key="key" class="border-2 p-3">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instanceItem in instanceItems" :key="instanceItem" class="">
          <td class="border-2 p-3 text-center hover:cursor-pointer">
            <font-awesome-icon class="text-lg text-yellow-600" :icon="['fas', 'pencil']" />
          </td>
          <td class="border-2 p-3 text-center hover:cursor-pointer">
            <font-awesome-icon class="text-lg text-red-600" :icon="['fas', 'trash-can']" />
          </td>
          <td v-for="key in instanceKeys.slice(1)" :key="key" class="border-2 px-3 py-1">
            <!-- {{ instanceItem[key] }} -->
            <div v-if="Array.isArray(instanceItem[key])">
              <div v-for="field in beautifyArray(instanceItem[key])" :key="field">
                {{ field }}
              </div>
            </div>
            <div v-else-if="typeof instanceItem[key] === 'object'">
              <div v-for="field in beautifyObject(instanceItem[key])" :key="field">
                {{ field }}
              </div>
            </div>
            <div v-else>
              {{ instanceItem[key].toString().replaceAll('{"', '') }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-40">
    <div class="h-screen w-full flex">
      <pulse-loader class="m-auto" />
    </div>
  </div>
  <admin-modal />
</template>

<script>
import { mapActions } from 'pinia'
import router from '../../router'

import AdminModal from '../../components/layout/modals/AdminModal.vue'
import { useAdminStore } from '../../stores/admin'
export default {
  components: { AdminModal },
  props: ['instance'],
  data: () => {
    return {
      instanceItems: undefined,
      instanceKeys: undefined
    }
  },
  async mounted() {
    this.instanceItems = await this.getAllEntity(this.instance[0])
    this.instanceKeys = Object.keys(this.instanceItems[0])
  },
  methods: {
    ...mapActions(useAdminStore, ['getAllEntity', 'create']),
    goBack() {
      router.go(-1)
    },
    beautifyObject(obj, nested) {
      let res = []
      if (Object.values(obj)) {
        for (let [key, value] of Object.entries(obj)) {
          if (Array.isArray(value) && value.length > 1) {
            res.push(this.beautifyArray(value))
          } else if (typeof value === 'object') {
            res.push(this.beautifyObject(value))
          } else res.push(`${key}: ${value}`)
        }
      }
      return nested ? res.join(', ') : res
    },
    beautifyArray(array, nested) {
      let res = []

      for (let i of array) {
        if (typeof i === 'string') res.push(i)
        else res.push(this.beautifyObject(i, true))
      }

      return nested ? res.join(', ') : res
    }
  }
}
</script>

<style></style>
