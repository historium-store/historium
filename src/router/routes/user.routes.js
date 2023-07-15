export default [
  {
    path: '/user/orders',
    name: 'orders',
    component: () => import('../../views/user/OrdersPage.vue')
  },
  {
    path: '/user/wishlist',
    name: 'wishlist',
    component: () => import('../../views/user/WishlistPage.vue')
  },
  {
    path: '/user/waitlist',
    name: 'waitlist',
    component: () => import('../../views/user/WaitlistPage.vue')
  },
  {
    path: '/user/account',
    name: 'account',
    component: () => import('../../views/user/AccountPage.vue')
  },
  {
    path: '/user/library',
    name: 'library',
    component: () => import('../../views/user/LibraryPage.vue')
  },
]
