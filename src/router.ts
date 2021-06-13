import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import Stack from '@/views/Stack.vue'
// import Cards from '@/views/Cards.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/stack'
  },
  {
    path: '/stack/:username?/:gist?',
    component: Stack
  }
  // {
  //   path: '/cards',
  //   component: Cards
  // }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
