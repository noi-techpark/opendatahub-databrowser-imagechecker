/*

SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./layout/homePage.vue'),
      name: 'app',
    }, 
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
