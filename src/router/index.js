import { createRouter, createWebHistory } from 'vue-router'
import { useSidebarStore } from '../stores/sidebar'

// function prefixRoutes(prefix, routes) {
//   return routes.map((route) => (route.path = prefix + '/' + route.path))
// }

const NotFound = { template: '<h2>Page Not Found</h2>' }
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'general',
      component: () => import('../views/GeneralPage.vue')
    },
    {
      path: '/:type',
      name: 'AllProducts',
      component: () => import('../views/product/ProductShowcasePage.vue'),
      props: true
    },
    {
      path: '/:type/:id',
      name: 'product',
      component: () => import('../views/product/ProductPage.vue'),
      props: true
    },
    {
      path: '/section/:sectionId+',
      name: 'section',
      component: () => import('../views/product/SectionPage.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPanelPage.vue')
    },
    {
      path: '/admin/:instance+',
      name: 'instance',
      component: () => import('../views/admin/InstanceActionsPage.vue'),
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/user/CheckoutPage.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/product/SearchPage.vue'),
      props: true
    },
    {
      path: '/user/orders',
      name: 'orders',
      component: () => import('../views/user/OrdersPage.vue')
    },
    {
      path: '/user/wishlist',
      name: 'wishlist',
      component: () => import('../views/user/WishlistPage.vue')
    },
    {
      path: '/user/waitlist',
      name: 'waitlist',
      component: () => import('../views/user/WaitlistPage.vue')
    },
    {
      path: '/user/account',
      name: 'account',
      component: () => import('../views/user/AccountPage.vue')
    },
    {
      path: '/user/library',
      name: 'library',
      component: () => import('../views/user/LibraryPage.vue')
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach(() => {
  const sidebarStore = useSidebarStore()
  sidebarStore.closeSidebar('cart')
  sidebarStore.closeSidebar('main')
  sidebarStore.closeSidebar('profile')
})

export default router
