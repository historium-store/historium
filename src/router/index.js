import { createRouter, createWebHistory } from 'vue-router'
import { useSidebarStore } from '../stores/sidebar'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: '/:id',
      name: 'product',
      component: () => import('../views/product/ProductPageView.vue'),
      props: true
    },
    {
      path: '/section/:sectionId*',
      name: 'section',
      component: () => import('../views/section/SectionPageView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPanelView.vue'),
      childrens: []
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/order/CheckoutPageView.vue')
    }
  ]
})

router.beforeEach(() => {
  const sidebarStore = useSidebarStore()
  sidebarStore.closeSidebars()
})

export default router
