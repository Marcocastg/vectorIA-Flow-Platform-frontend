import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/landingPageView.vue'
import LandingStreamersView from '@/views/landingStreamersView.vue'
import LandingModelsView from '@/views/landingModelsView.vue'
import LandingAboutView from '@/views/landingAboutView.vue'
import LoginRegisterView from '@/views/loginRegisterView.vue'

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
    {
      path: '/models',
      name: 'modelsPage',
      component: LandingModelsView,
    },
    {
      path: '/about',
      name: 'aboutPage',
      component: LandingAboutView,
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginRegisterView,
    },
  ],
})

export default router
