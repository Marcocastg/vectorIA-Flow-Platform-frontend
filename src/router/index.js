import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/landingPageView.vue'
import LandingStreamersView from '@/views/landingStreamersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPageView,
    },
    {
      path: '/streamers',
      name: 'streamersPage',
      component: LandingStreamersView,
    },
  ],
})

export default router
