// Dependencies
import NProgress from 'nprogress'; // progress bar
// import moment from 'moment';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css'; // progress bar style

// Helpers
const isAuthenticated = () => {
  try {
    return !!store.state.auth.token;
  } catch (error) {
    return false;
  }
};

const getRole = () => {
  try {
    const { user } = store.state.auth;
    return Object.keys(user).length > 0 ? user.roleId : false;
  } catch (error) {
    return false;
  }
};

const getPageTitle = (title) => {
  let base = 'Focus';
  if (title) {
    base += ` - ${title}`;
  }
  return base;
};

const hasRoutes = () => {
  try {
    const { filtered } = store.state.permission;
    return !!filtered;
  } catch (error) {
    return false;
  }
};

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login', '/forgotpassword']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // normalize route
  const route = to.path.toLowerCase();

  // determine whether the user has logged in
  const isLoggedIn = isAuthenticated();
  if (isLoggedIn) {
    // has token
    if (whiteList.includes(route)) {
      return next({ path: '/' });
    }
    try {
      const role = getRole();
      // generate accessible routes map based on roles
      if (!hasRoutes()) {
        const accessRoutes = await store.dispatch('permission/generateRoutes', role);
        router.addRoutes(accessRoutes);
        return next({ path: to.path, replace: true });
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log({ err });
    }
    return next();
  }
  // has no token
  if (whiteList.includes(route)) {
    // in the free login whitelist, go directly
    return next();
  }
  // other pages that do not have permission to access are redirected to the login page.
  return next(`/login?redirect=${route}`);
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
