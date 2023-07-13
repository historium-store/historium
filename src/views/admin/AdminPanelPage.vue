<template>
  <div class="w-3/4 mx-auto my-6">
    <h1 class="text-center text-3xl my-5">Admin Panel</h1>
    <div class="[&>div]:hover:cursor-pointer grid grid-cols-2 gap-5 w-11/12 mx-auto mt-4">
      <admin-panel-tile
        title="Товари"
        icon="book"
        :link="{ name: 'instance', params: { instance: ['product'] } }"
      />
      <admin-panel-tile title="Категорії" icon="list" link="/admin/section" />
      <hr class="col-span-2 my-4 border-[1.5px] rounded mx-3" />
      <admin-panel-tile title="Автори" icon="users" link="/admin/author" />
      <admin-panel-tile title="Видавництва" icon="gear" link="/admin/publisher" />
      <admin-panel-tile title="Ілюстратори" icon="image" link="/admin/illustrator" />
      <admin-panel-tile title="Перекладачі" icon="language" link="/admin/translator" />
      <admin-panel-tile title="Редактори" icon="pen" link="/admin/editor" />
      <admin-panel-tile title="Компонувальники" icon="clipboard" link="/admin/compiler" />
      <hr class="col-span-2 my-4 border-[1.5px] rounded mx-3" />
      <admin-panel-tile class="col-span-2" title="Клієнти" icon="user" link="/admin/user" />
      <admin-panel-tile
        class="col-span-2"
        title="Замовлення"
        icon="shopping-cart"
        link="/admin/order"
      />
    </div>
  </div>
</template>

<script>
import AdminPanelTile from '../../components/admin/AdminPanelTile.vue'
export default {
  components: { AdminPanelTile }
}
</script>

<style></style>
