<template>
  <div class="flex border-2 space-x-3 p-3 m-5 font-rubik items-center w-1/4 hover:cursor-pointer">
    <p>Add new {{ instance[0] }}</p>
    <font-awesome-icon class="text-xl text-green-600" :icon="['fas', 'plus']" />
  </div>
  <div v-if="instanceItems" class="m-5 overflow-x-scroll font-rubik">
    <table class="table-auto w-max border-collapse">
      <thead>
        <tr>
          <th class="border-2 p-3">Edit</th>
          <th class="border-2 p-3">Remove</th>
          <th
            v-for="key in Object.keys(instanceItems?.[0]).splice(1)"
            :key="key"
            class="border-2 p-3"
          >
            {{ key }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="instanceItem in instanceItems" :key="instanceItem" class="">
          <td class="border-2 p-3 text-center hover:cursor-pointer">
            <font-awesome-icon class="text-xl text-yellow-600" :icon="['fas', 'pencil']" />
          </td>
          <td class="border-2 p-3 text-center hover:cursor-pointer">
            <font-awesome-icon class="text-xl text-red-600" :icon="['fas', 'trash-can']" />
          </td>
          <td
            v-for="field in Object.values(instanceItem).splice(1)"
            :key="field"
            class="border-2 p-3"
          >
            <div v-if="['string', 'number'].includes(typeof field)">
              {{ field }}
            </div>
            <div v-else-if="Array.isArray(field) && typeof field[0] !== 'string'">
              <table>
                <thead>
                  <th v-for="key in Object.keys(field[0] || [])" :key="key" class="border-2 p-3">
                    {{ key }}
                  </th>
                </thead>
                <tbody>
                  <tr v-for="item in field" :key="item">
                    <td v-for="value in Object.values(item)" :key="value" class="border-2 p-3">
                      {{ value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else-if="Array.isArray(field)">
              {{ field.join(', ') }}
            </div>
            <div v-else>
              {{ field }}
            </div>
            <!-- <div v-else>
              <table>
                <thead>
                  <th class="border-2 p-3" v-for="key in Object.keys(field || [])" :key="key">
                    {{ key }}
                  </th>
                </thead>
                <tbody>
                  <tr v-for="item in field" :key="item">
                    <td
                      class="border-2 p-3"
                      v-for="value in Object.values(item) || []"
                      :key="value"
                    >
                      {{ value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useAdminStore } from '../../stores/admin'
export default {
  props: ['instance'],
  data: () => {
    return {
      instanceItems: undefined
    }
  },
  async mounted() {
    this.instanceItems = await this.getAllInstance(this.instance[0])
    console.log(this.instanceItems)
  },
  methods: {
    ...mapActions(useAdminStore, ['getAllInstance'])
  }
}
</script>

<style></style>
