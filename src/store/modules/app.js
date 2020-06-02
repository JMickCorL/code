// Dependencies
import moment from 'moment';

const initialState = {
  lastSearch: '',
  language: '',
  typeSearch: '',
  loginDate: '',
};

const mutations = {
  SET_LAST_SEARCH: (state, lastSearch) => {
    state.lastSearch = lastSearch;
  },
  SET_TYPE_SEARCH: (state, typeSearch) => {
    state.typeSearch = typeSearch;
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language;
  },
  SET_LOGIN_DATE: (state, date) => {
    state.loginDate = date;
  },
};

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setLastSearch({ commit }, lastSearch) {
    commit('SET_LAST_SEARCH', lastSearch);
  },
  setTypeSearch({ commit }, typeSearch) {
    commit('SET_TYPE_SEARCH', typeSearch);
  },
  setLoginDate({ commit }) {
    const loginDate = moment().format();
    commit('SET_LOGIN_DATE', loginDate);
  },
};

const getters = {
  language: (state) => state.language,
  lastSearch: (state) => state.lastSearch,
  typeSearch: (state) => state.typeSearch,
};

export default {
  state: initialState,
  mutations,
  actions,
  getters,
  namespaced: true,
};
