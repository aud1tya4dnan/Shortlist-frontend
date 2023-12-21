import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Nav from '../components/navbar.vue'
import Notfound from '../views/Notfound.vue'
import Listpage from '../views/Listpage.vue'
import Redirect from '../views/Redirect.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component:() => import('../views/Loginpage.vue'),
      meta: {
        hideNavbar: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component:() => import('../views/RegisterView.vue'),
      meta: {
        hideNavbar: true
      }
    },
    {
      path: '/shorten',
      name: 'shorten',
      component: HomeView,
    },
    {
      path: '/list',
      name: 'list',
      component: Listpage,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: Notfound,
      meta: {
        hideNavbar: true
      }
    },
    {
      path: '/:slink',
      name: 'slink',
      component: Redirect,
      meta: {
        hideNavbar: true,
      }
    },
    

  ]
})

export default router
