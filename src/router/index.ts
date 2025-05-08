import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'admin', component: () => import('../views/AdminView.vue') },
//   { path: '/login', name: 'Login', component: () => import('../views/Login.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
