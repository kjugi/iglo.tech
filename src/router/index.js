import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../main'

import Post from '@/components/Post'
import PostList from '@/components/PostList'
import NotFound from '@/components/404'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history',
    routes: [
      { path: '/', component: PostList },
      { path: '/post/:id', component: Post }
    ]
  })

  // Scroll top on every route change
  router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
  })

  return router
}


