import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./components/pages/homePage.vue'),
      name: 'app',
    },
    {
      path: '/card',
      component: () => import('./components/card/CardContainer.vue'),
      name: 'card',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
