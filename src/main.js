import Vue from 'vue'
import App from './App.vue'
import './index.css'

import Vuex from 'vuex'
import Toasted from 'vue-toasted';
import store from './store';

Vue.config.productionTip = false
Vue.use(Toasted)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
