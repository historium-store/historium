export default [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../../views/admin/AdminPanelPage.vue')
  },
  {
    path: '/admin/:entity+',
    name: 'entity',
    component: () => import('../../views/admin/EntityActionsPage.vue'),
    props: true
  }
]
