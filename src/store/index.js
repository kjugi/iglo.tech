import Vue from 'vue'
import Vuex from 'vuex'
import { fetchContentByUrl } from '../api';

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      routes: {},
      posts: {},
    },
    actions: {
      fetchUrl ({ commit }, url) {
        return fetchContentByUrl(url)
          .then(response => {
            commit('saveRoute', {
              url,
              ids: response.posts.map(post => post.id)
            })
            response.posts.forEach(post => {
              commit('savePost', post)
            })
            return response
          })
      }
    },
    getters: {
      activeContent: state => {
        const ids = state.routes[state.route.fullPath];
        if (ids) {
          return ids.map(id => state.posts[id])
        }
      }
    },
    mutations: {
      savePost (state, post) {
        Vue.set(state.posts, post.id, post)
      },
      saveRoute (state, { url, ids }) {
        Vue.set(state.routes, url, ids)
      }
    }
  })
}
