import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/messages/:id',
    name: 'MessageDetails',
    component: () => import('../views/MessageDetails.vue'),
    meta: { requiresAuth: true },
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth && !sessionStorage.getItem("user_token")) {
    next({ name: 'Connexion' })

  } else if (to.meta.requiresAuth && sessionStorage.getItem("user_token")) {
    
    try {
      const token = JSON.parse(sessionStorage.getItem("user_token"));
      jwt.verify(token, 'secret_token');
      next()

    } catch(err) {
      sessionStorage.removeItem('user_token');
      next({ name: 'Connexion' })
      throw Error(err)
    }

  } else next()
});

export default router
