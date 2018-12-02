import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import apiUrl from '@/api/url'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      posts: {}
    },
    actions: {
      getPost ({ commit }, id) {
        return axios.get(`${apiUrl}/collection/post?items=${id}`)
          .then(response => response.data)
          .then(response => {
            commit('savePost', response[0].content)
          })
      },
      getHome({ commit }) {
        return axios.get(`${apiUrl}/entity/home`)
          .then(response => response.data)
          .then(response => {
            response.posts.forEach(post => {
              commit('savePost', post.content)
            })
          })
      }
    },
    mutations: {
      savePost (state, post) {
        Vue.set(state.posts, post.slug, post)
      }
    }
  })
}
