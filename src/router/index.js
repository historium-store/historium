import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useSidebarStore } from '../stores/sidebar'
import { useUserStore } from '../stores/user'
import adminRoutes from './routes/admin.routes'
import productRoutes from './routes/product.routes'
import userRoutes from './routes/user.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => {
    return { top: 0 }
  },
  routes: [
    ...userRoutes,
    ...adminRoutes,
    ...productRoutes,
    {
      path: '/',
      name: 'general',
      component: () => import('../views/GeneralPage.vue')
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsPage.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/user/CheckoutPage.vue')
    },
    {
      path: '/submit-order/:orderNumber',
      name: 'submit-order',
      component: () => import('../views/user/SubmitOrderPage.vue'),
      props: true
    }
  ]
})

const secureRoutes = ['admin']
const authRoutes = userRoutes.map((route) => route.name)
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()

  sidebarStore.closeSidebar('cart')
  sidebarStore.closeSidebar('main')
  sidebarStore.closeSidebar('profile')

  if (secureRoutes.includes(to.name) && userStore?.user?.role !== 'admin') {
    return { name: 'NotFound' }
  } else if (authRoutes.includes(to.name) && !authStore.isAuthenticated) {
    return { name: 'general' }
  }
})


export default router
