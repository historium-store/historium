import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'general',
      component: () => import('../views/GeneralPage.vue')
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import('../components/auth/RestoreView.vue')
    },
    {
      path: '/book',
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
      component: () => import('../views/admin/AdminPanelView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/order/CheckoutPageView.vue')
    }
  ]
})

export default router
