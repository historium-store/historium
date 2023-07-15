export default [
  {
    path: '/:type',
    name: 'AllProducts',
    component: () => import('../../views/product/ProductShowcasePage.vue'),
    props: true
  },
  {
    path: '/:type/:id',
    name: 'product',
    component: () => import('../../views/product/ProductPage.vue'),
    props: true
  },
  {
    path: '/section/:sectionId+',
    name: 'section',
    component: () => import('../../views/product/SectionPage.vue'),
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../../views/product/SearchPage.vue'),
    props: true
  }
]
