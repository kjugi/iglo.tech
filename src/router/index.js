import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../main'
import Backend from '../../config/backend'

import Post from '@/components/Post'
import PostList from '@/components/PostList'
import NotFound from '@/components/404'

Vue.use(Router)

export function createRouter () {
  const router = new Router({
    mode: 'history'
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
      store.dispatch('fetchUrl', to.path)
        .then(response => {
          switch(response.type) {
            case 'home':
            case 'category':
            case 'tag':
            case 'archive':
              router.addRoutes([{path: to.path, component: PostList}])
              break
            case 'single':
            case 'page':
              router.addRoutes([{path: to.path, component: Post}])
              break
            default:
              router.addRoutes([{path: to.path, component: NotFound}])
              break
          }
        })
        .catch(() => {
          router.addRoutes([{path: to.path, component: NotFound}])
        })
    }
    next()
  })

  return router
}


