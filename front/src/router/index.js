import { createRouter, createWebHashHistory } from 'vue-router'
import Home        from '../views/Home.vue'
import Signup      from '../views/Signup.vue'
import Login       from '../views/Login.vue'
import PostDetails from '../views/posts/PostDetails.vue'
import Posts       from '../views/posts/Posts.vue'
import User        from '../views/User.vue'
// import NotFound    from '../views/NotFound.vue'
import  store  from '../store'

const routes = [
  {// Home
    path: '/',
    name: 'Home',
    component: Home
  },
  { // Users
    path: '/users/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/users/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/users/:id",
    name: "User",
    component: User, meta: { requiresAuth: true }
  },
  { // Posts
    path: '/posts',
    name: 'Posts',
    component: Posts, meta: { requiresAuth: true }
  },
  {
    path: '/posts/:id',
    name: 'PostDetails',
    component: PostDetails, meta: { requiresAuth: true },
    props: true
  },
  // {
  //   path: '/404',
  //   alias: '*',
  //   name: 'notFound',
  //   component: NotFound
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user) {
    next({ name: 'Login' })
  }
  else next()
});

export default router
