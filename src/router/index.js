import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'auth',
    component: HomeView
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import('../views/AnalyticsView.vue'),
  }
]



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach(function (to, from, next) {
//   const auth = localStorage.getItem('leadhit-site-id')
//   if (auth == null) {
//     router.push({name: 'auth'})
//   }
//   next();
// })

export default router
