// Dependencies
import asyncRoutes from '../../router/asyncRoutes';
import constantRoutes from '../../router/constantRoutes';

/**
 * Use meta.role to determine if the current user has permission
 * @param role
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some((_role) => _role === role);
  }
  return true;
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, role) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role);
      }
      res.push(tmp);
    }
  });
  return res;
}

const initialState = {
  routes: [],
  addRoutes: [],
  filtered: false,
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    Object.assign(state, {
      addRoutes: routes,
      routes: constantRoutes.concat(routes),
    });
  },
  SET_STATUS: (state, payload) => {
    Object.assign(state, {
      filtered: !!payload,
    });
  },
};

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise((resolve, reject) => {
      try {
        let accessedRoutes;
        if (role.toUpperCase() === 'ADMIN') {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, role);
        }
        commit('SET_ROUTES', accessedRoutes);
        commit('SET_STATUS', true);
        resolve(accessedRoutes);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};
