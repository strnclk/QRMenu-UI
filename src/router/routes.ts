import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '', component: () => import('pages/Menu.vue') }],
  },
  {
    path: '/menu',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [{ path: '/menu', component: () => import('pages/Menu.vue') }],
  },
  {
    path: '/login',
    component: () => import('src/layouts/LoginLayout.vue'),
    children: [{ path: '/login', component: () => import('pages/Login.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
