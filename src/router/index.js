import { createRouter, createWebHistory } from 'vue-router'
import FormView from '@/views/FormView.vue'
import InvoiceView from '@/views/InvoiceView.vue'
import HomeView from '@/views/HomeView.vue'
const routes = [
  {

    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/doc/:documentId?',
    name: 'doc-view',
    component: FormView
  },
  {
    path: '/invoice',
    name: 'invoice',
    component: InvoiceView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
