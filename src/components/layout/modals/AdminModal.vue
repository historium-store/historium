<template>
  <div
    id="admin-modal"
    class="flex xs:h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center hidden"
    @click.self="hideModal(currentModal, 'admin-modal')"
  >
    <div
      class="relative p-4 w-full h-full md:h-auto max-w-2xl md:border-4 rounded-3xl shadow bg-gray-900 bg-opacity-60 border-gray-200 dark:border-white"
    >
      <div class="relative">
        <div class="p-4 flex justify-between items-center">
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="hideModal(currentModal, 'admin-modal')"
          >
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <create-entity v-if="currentModal === 'createEntity'" />
        <create-entity v-if="currentModal === 'editEntity'" />
        <remove-entity v-else-if="currentModal === 'removeEntity'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useModalStore } from '../../../stores/modal'
import CreateEntity from '../../admin/CreateEntity.vue'
import RemoveEntity from '../../admin/RemoveEntity.vue'

export default {
  components: { CreateEntity, RemoveEntity },
  computed: {
    ...mapState(useModalStore, ['currentModal'])
  },
  methods: {
    ...mapActions(useModalStore, ['showModal', 'hideModal', 'hideModals'])
  }
}
</script>
