// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Resource from 'vue-resource'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.use(Resource)

export const store = createStore();
const router = createRouter();

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
