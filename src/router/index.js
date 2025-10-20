import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '@/views/landingPageView.vue'
import LandingStreamersView from '@/views/landingStreamersView.vue'
import LandingModelsView from '@/views/landingModelsView.vue'
import LandingAboutView from '@/views/landingAboutView.vue'
import LoginRegisterView from '@/views/loginRegisterView.vue'
import DashboardLayout from '@/layout/dashboardLayout.vue'
import DashboardHome from '@/components/dashboard/dashboardHome.vue'
import DefaultLayout from '@/layout/defaultLayout.vue'
import DashboardStreamers from '@/components/dashboard/streamers/dashboardStreamers.vue'
import DashboardPredictions from '@/components/dashboard/predictions/dashboardPredictions.vue'
import DashboardReports from '@/components/dashboard/reports/dashboardReports.vue'
import Report from '@/components/dashboard/reports/report/report.vue'
import ReportsIndex from '@/components/dashboard/reports/reportsIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultLayout',
      component: DefaultLayout,
      children: [
          {
            path: '',
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
    },
    {
      path: '/dashboard',
      name: 'dashboardLayout',
      component: DashboardLayout,
      meta: { requiresAuth: true},
      children:[
        {
          path: '', // Cuando la ruta es exactamente '/dashboard'
          name: 'dashboardHome',
          component: DashboardHome // Muestra el componente Home
        },
        {
          path: 'streamers', // Cuando la ruta es exactamente '/dashboard'
          name: 'dashboardStreamers',
          component: LandingStreamersView // Muestra el componente Home
        },
        {
          path: 'predictions', // Cuando la ruta es exactamente '/dashboard'
          name: 'dashboardPredictions',
          component: DashboardPredictions // Muestra el componente Home
        },
        {
          path: 'reports', // Cuando la ruta es exactamente '/dashboard'
          name: 'dashboardReports',
          component: DashboardReports, // Muestra el componente Home
          children: [
            {
              path: '', // Cuando la ruta es exactamente '/dashboard'
              name: 'reportsList',
              component: ReportsIndex,
            },
            {
              path: 'uuidejemplo', // Cuando la ruta es exactamente '/dashboard'
              name: 'reportsReport',
              component: Report,
            }
          ]
        },

        
      ],
    },
  ],
})

export default router
