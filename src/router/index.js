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
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/auth/SignUpView.vue')
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
      path: '/section/:key',
      name: 'section',
      component: () => import('../views/product/ProductPageView.vue'),
      props: true
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminPanelView.vue')
    }
  ]
})

export default router
