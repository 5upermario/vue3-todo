import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/:listId',
    name: 'TodoList',
    component: () => import('../views/TodoList.vue'),
    props: (route) => ({ listId: route.params.listId }),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
