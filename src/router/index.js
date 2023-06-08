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
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/auth/MyAccountView.vue')
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import('../views/auth/RestoreView.vue')
    },
    {
      path: '/book',
      name: 'books',
      component: () => import('../views/product/ProductShowcaseView.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('../views/product/ProductPageView.vue'),
      props: true
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
      path: '/cart',
      name: 'cart',
      component: () => import('../components/cart/TheCartPage.vue')
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
