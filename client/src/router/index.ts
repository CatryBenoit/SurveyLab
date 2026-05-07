import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      // On peut aussi charger les composants à la demande (Lazy Loading)
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/HomeView.vue') // Placeholder en attendant le vrai Dashboard
    },
    {
  path: '/register',
  name: 'register',
  component: () => import('../views/RegisterView.vue')
    },
    {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('../views/DashboardView.vue')
    },
    {
  path: '/create',
  name: 'create-survey',
  component: () => import('../views/CreateSurveyView.vue')
    },
    {
  // Vérifie si tu as mis /survey/:id ou /surveys/:id
  path: '/survey/:id', 
  name: 'survey-view',
  component: () => import('../views/SurveyView.vue')
}
  ]
}) 

export default router