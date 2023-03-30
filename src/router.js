import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/artist',
        name: 'About',
        component: () => import('./views/artistViews.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;