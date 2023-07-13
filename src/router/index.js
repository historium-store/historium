import { createRouter, createWebHistory } from 'vue-router'
import { useSidebarStore } from '../stores/sidebar'
import { useUserStore } from '../stores/user'

// function prefixRoutes(prefix, routes) {
//   return routes.map((route) => (route.path = prefix + '/' + route.path))
// }

const NoAccess = { template: '<h2>No Access</h2>' }

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
      component: () => import('../views/admin/EntityActionsPage.vue'),
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
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundPage.vue')
    }
  ]
})

const secureRoutes = ['admin']
router.beforeEach(async (to, from) => {
  // const authStore = useAuthStore()
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()
  // console.log('to', to)
  // console.log('from', from)
  sidebarStore.closeSidebar('cart')
  sidebarStore.closeSidebar('main')
  sidebarStore.closeSidebar('profile')

  if (secureRoutes.includes(to.name) && userStore?.user?.role !== 'admin') {
    return { name: 'NotFound' }
  }
})

export default router
