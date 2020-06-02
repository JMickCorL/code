import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './constantRoutes';

Vue.use(VueRouter);

const createRouter = () => new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
