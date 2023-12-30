import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '/feed',
        name: 'Feed',
        component: () => import('../views/Feed.vue')
    },
    {
        path: '/postform',
        name: 'PostForm',
        component: () => import('../views/PostForm.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router