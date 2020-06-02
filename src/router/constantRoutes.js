// Dependencies
export default [
  {
    path: '/',
    name: 'root',
    hidden: true,
    redirect: '/admin/patient/list',
  },
  {
    path: '/admin',
    redirect: '/admin/appointments/',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    hidden: true,
  },
  // {
  //   path: '/forgotPassword',
  //   name: 'forgotPassword',
  //   component: () => import('../views/login/ForgotPassword.vue'),
  //   hidden: true,
  // },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/404.vue'),
    hidden: true,
  },
];
