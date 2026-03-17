import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import ConcertInfoView from '@/views/ConcertInfoView.vue'
import PaymentView from '@/views/PaymentView.vue'
import SuccessView from '@/views/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/info',
      name: 'concert-info',
      component: ConcertInfoView,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
