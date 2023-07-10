<template>
  <aside
    id="navigation-sidebar"
    :class="
      'fixed top-0 left-0 z-20 w-full sm:w-44  h-screen transition-transform hidden xl:flex ' +
      getStyle
    "
  >
    <div class="w-full mt-48 mb-auto flex overflow-y-auto ml-14">
      <div class="border-[3px] rounded-full px-5 py-20 mx-auto bg-background">
        <ul class="space-y-10 [&>li]:mx-auto">
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'list']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'book-open']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'cloud-arrow-down']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'headphones']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'pencil']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'puzzle-piece']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'book-bookmark']"
              style="color: #ffffff"
            />
          </li>
          <li>
            <font-awesome-icon
              class="w-6"
              size="lg"
              :icon="['fas', 'gift']"
              style="color: #ffffff"
            />
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {}
</script>

<style></style>
