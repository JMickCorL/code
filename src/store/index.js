/**
 * Vuex main config file
 */
// Dependencies
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      paths: [
        'auth.token',
        'auth.user',
        'app.loginDate',
      ],
    }),
  ],
});
