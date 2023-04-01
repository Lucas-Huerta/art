import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: { requireVisitor: true },
        component: () => import('./views/Home.vue')
    },
    {
        path: '/artist/:id',
        name: 'Artist',
        params: {id: true},
        meta: { requireVisitor: true },
        component: () => import('./views/artistViews.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;