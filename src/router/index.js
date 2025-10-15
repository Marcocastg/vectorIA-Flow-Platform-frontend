import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/landingPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView,
    },
  ],
})

export default router
