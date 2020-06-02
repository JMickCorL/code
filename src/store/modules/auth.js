// Dependencies
import Vue from 'vue';
import DeviceUUID from 'device-uuid';
import { Notification } from 'element-ui';
import { resetRouter } from '../../router';
import http from '../../API';

// State
const initialState = {
  token: null,
  user: {},
};

// Mutations
const mutations = {
  async logout(state, url) {
    return new Promise((resolve, reject) => {
      http
        .post(url, null, {
          token: state.token,
        })
        .then(() => {
          resolve(true);
        })
        .catch((e) => reject(e));
    });
  },
  update(state, current) {
    return Object.assign(state, current);
  },
  refreshToken(state, token) {
    return Object.assign(state, {
      token,
    });
  },
  updateUser(state, payload) {
    return Object.assign(state.user, { ...payload });
  },
};

// Actions
const actions = {
  async login({ commit }, payload) {
    try {
      const { email, password } = payload;
      const uuid = DeviceUUID.DeviceUUID().get();
      const data = {
        email,
        password,
        deviceUUID: uuid,
      };
      const response = await http.post('auth/signIn', data);
      if (response.status === 200) {
        const { token, user } = response.data;
        const current = {
          token,
          user,
        };
        commit('update', current);
        Notification({
          type: 'success',
          title: '¡Éxito!',
          message: 'Has iniciado sesión.',
        });
      } else {
        Notification({
          type: 'warning',
          title: 'Error.',
          message: 'Algo salió mal. No se pudo iniciar sesión.',
        });
      }
    } catch (error) {
      Vue.config.errorHandler(error);
      throw error;
    }
  },
  async logOut({ commit }) {
    try {
      const url = 'auth/signout';
      await commit('logout', url);
      const rstObj = {
        token: null,
        user: {},
      };
      resetRouter();
      commit('update', rstObj);
    } catch (e) {
      Vue.config.errorHandler(e);
    }
  },
  async refreshToken({ commit }, token) {
    try {
      const uuid = DeviceUUID.DeviceUUID().get();
      const payload = {
        deviceUUID: uuid,
      };
      const response = await http.post('auth/refreshtoken', payload, {
        headers: {
          token,
        },
      });
      const { data } = response;
      if (data) {
        const { refreshToken } = data;
        commit('refreshToken', refreshToken);
      }
      return response;
    } catch (e) {
      if (e.response) {
        return e.response;
      }
      return e;
    }
  },
  updateUser({ commit }, payload) {
    if (payload) {
      commit('updateUser', payload);
    }
  },
};

export default {
  state: initialState,
  mutations,
  actions,
  namespaced: true,
};
