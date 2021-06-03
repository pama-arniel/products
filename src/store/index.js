import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        products
    },
    plugins: [createPersistedState()]
});

export default store