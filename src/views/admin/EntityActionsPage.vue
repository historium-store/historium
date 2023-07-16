<template>
  <div class="m-3 p-3 flex items-center space-x-2 hover:cursor-pointer" @click="goBack">
    <font-awesome-icon class="w-6" :icon="['fas', 'arrow-left']" size="lg" />
    <p class="font-rubik">Назад</p>
  </div>
  <div class="m-3 p-3 flex items-center justify-between hover:cursor-pointer">
    <div :class="pagination.offset === 0 ? 'invisible' : ''" @click="prevPart(entity[0])">
      <font-awesome-icon class="w-6" :icon="['fas', 'arrow-left']" size="lg" />
      <p class="font-rubik">Prev</p>
    </div>
    <div
      :class="
        pagination.part + pagination.offset >= pagination.total ||
        currentEntity.length < pagination.part
          ? 'invisible'
          : ''
      "
      @click="nextPart(entity[0])"
    >
      <font-awesome-icon class="w-6" :icon="['fas', 'arrow-right']" size="lg" />
      <p class="font-rubik">Next</p>
    </div>
  </div>
  <div
    class="flex border-2 space-x-3 p-3 m-5 font-rubik items-center md:w-1/4 hover:cursor-pointer"
    @click="create"
  >
    <p>Add new {{ entity[0] }}</p>
    <font-awesome-icon class="text-xl text-green-600" :icon="['fas', 'plus']" />
  </div>
  <div v-if="currentEntity && entityKeys" class="m-5 overflow-x-scroll font-rubik text-[12px]">
    <table class="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th class="border-2 px-3">Edit</th>
          <th class="border-2 px-3">Remove</th>
          <th v-for="key in entityKeys.slice(1)" :key="key" class="border-2 p-3">
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entityItem in currentEntity" :key="entityItem" class="">
          <td class="border-2 p-3 text-center hover:cursor-pointer" @click="edit">
            <font-awesome-icon class="text-lg text-yellow-600" :icon="['fas', 'pencil']" />
          </td>
          <td class="border-2 p-3 text-center hover:cursor-pointer" @click="remove">
            <font-awesome-icon class="text-lg text-red-600" :icon="['fas', 'trash-can']" />
          </td>
          <td v-for="key in entityKeys.slice(1)" :key="key" class="border-2 px-3 py-1">
            <div>
              <div v-for="field in beautifyEntity(entityItem[key])" :key="field">
                {{ field }}
              </div>
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
import { mapActions, mapWritableState } from 'pinia'
import router from '../../router'

import AdminModal from '../../components/layout/modals/AdminModal.vue'
import { useAdminStore } from '../../stores/admin'
export default {
  components: { AdminModal },
  props: ['entity'],
  data: () => {
    return {
      // entityItems: undefined,
      entityKeys: undefined
    }
  },
  computed: {
    ...mapWritableState(useAdminStore, ['currentEntity', 'pagination'])
  },
  async mounted() {
    this.dropPagination()
    await this.getEntity(this.entity[0])
    this.entityKeys = Object.keys(this.currentEntity[0])
  },
  methods: {
    ...mapActions(useAdminStore, [
      'getEntity',
      'create',
      'edit',
      'remove',
      'nextPart',
      'prevPart',
      'dropPagination'
    ]),
    goBack() {
      router.go(-1)
    },
    beautifyEntity(entity) {
      if (Array.isArray(entity)) {
        return this.beautifyArray(entity)
      } else if (typeof entity === 'object') {
        return this.beautifyObject(entity)
      } else return [entity]
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
