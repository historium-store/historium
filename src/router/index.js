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
      path: '/books',
      name: 'books',
      component: () => import('../views/product/ProductShowcaseView.vue')
    },
    // {
    //   path: '/:id',
    //   name: 'product',
    //   component: () => import('../views/product/ProductPageView.vue'),
    //   props: true
    // },
    {
      path: '/:type/:id',
      name: 'product',
      component: () => import('../views/product/ProductPageView.vue'),
      props: true
    },
    // {
    //   path: '/section',
    //   name: 'sectionAll',
    //   component: () => import('../views/section/SectionPageView.vue')
    // },
    {
      path: '/section/:sectionId+',
      name: 'section',
      component: () => import('../views/section/SectionPageView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPanelView.vue')
    },
    {
      path: '/admin/:instance+',
      name: 'instance',
      component: () => import('../views/admin/ItemActionsView.vue'),
      props: true
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/order/CheckoutPageView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/SearchPageView.vue')
    },
    {
      path: '/user/orders',
      name: 'orders',
      component: () => import('../views/order/Orders.vue')
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
