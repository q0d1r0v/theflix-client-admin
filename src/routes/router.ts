// imports
import {createRouter, createWebHistory} from 'vue-router'

// layouts
const AuthLayout = () => import('../layouts/auth.vue')
const DefaultLayout = () => import('../layouts/default.vue')
const NotFoundLayout = () => import('../layouts/404.vue')

// pages
const HomePage = () => import('../pages/HomePage.vue')
const AboutPage = () => import('../pages/AboutPage.vue')
const LoginPage = () => import('../pages/LoginPage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')
const AccountPage = () => import('../pages/AccountPage.vue')
const CreatePostPage = () => import('../pages/CreatePostPage.vue')
const UsersPage = () => import('../pages/UsersPage.vue')

// router
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: '/',
                    name: 'HomePage',
                    component: HomePage,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: '/create-post',
                    name: 'CreatePostPage',
                    component: CreatePostPage,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: '/users',
                    name: 'UsersPage',
                    component: UsersPage,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: '/account',
                    name: 'AccountPage',
                    component: AccountPage,
                    meta: {
                        auth: true
                    }
                },
                {
                    path: '/about',
                    name: 'AboutPage',
                    component: AboutPage,
                    meta: {
                        auth: true
                    }
                },
            ]
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                {
                    path: '/auth/login',
                    name: 'LoginPage',
                    component: LoginPage
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundLayout,
            children: [
                {
                    path: '/:pathMatch(.*)*',
                    name: 'NotFoundPage',
                    component: NotFoundPage
                }
            ]
        },
    ]
})

// router middleware
router.beforeEach((to, from, next) => {
    if (to.meta.auth == true && !localStorage.getItem('access_token')) {
        next('/auth/login')
    }
    next()
})