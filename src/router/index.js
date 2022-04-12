import { createRouter, createWebHashHistory } from 'vue-router'
import catalogApp from '@/views/catalog-app.vue'
import productDetails from '@/views/product-details.vue'
// import productEdit from '@/views/product-edit.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'catalog-app',
      component: catalogApp,
    },
    {
      path: '/:id',
      name: 'product-details',
      component: productDetails,
    }
    // {
    //   path: '/toy/edit/:id?',
    //   name: 'toy-edit',
    //   component: toyEdit,
    // }
  ],
})

export default router
