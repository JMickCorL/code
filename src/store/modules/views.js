const initialState = {
  currentView: null,
  preview: null,
};

const mutations = {
  currentView(state, to) {
    Object.assign(state, {
      currentView: to,
    });
  },
  preview(state, from) {
    Object.assign(state, {
      preview: from,
    });
  },
};

const actions = {};

const getters = {
  view: (state) => state.currentView,
};

export default {
  state: initialState,
  mutations,
  actions,
  getters,
  namespaced: true,
};
