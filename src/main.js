import Vue from 'vue';
import VueAxios from 'vue-axios';
import { mapState } from 'vuex';
import { Notification, Message } from 'element-ui';
import Inputmask from 'inputmask';
import 'normalize.css/normalize.css';
import './styles/index.scss';
import './plugins/element';
import App from './App';
import router from './router';
import store from './store';
import http from './API';
import Avatar from './components/avatar';
import './permission';
import userErrorNotify from './utils/userErrorNotify';
import ageAsWords from './utils/ageAsWords';


Vue.directive('mask', {
  bind(el, binding) {
    Inputmask(binding.value).mask(el.getElementsByTagName('INPUT')[0]);
  },
});
Vue.prototype.$errorNotify = userErrorNotify;
Vue.prototype.$ageAsWords = ageAsWords;
Vue.prototype.$notify = (opt) => {
  Notification.closeAll();
  Notification(opt);
};
Vue.prototype.$message = (opt) => {
  Message.closeAll();
  Message(opt);
};
Vue.prototype.$capitalize = (val) => val.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
Vue.config.errorHandler = () => {};
Vue.component('Avatar', Avatar);
Vue.use(VueAxios, http);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
    }),
  },
  methods: {
    setAxiosToken(val) {
      this.axios.defaults.headers = {
        ...this.axios.defaults.headers,
        token: val,
      };
    },
    async refreshToken() {
      try {
        const response = await store.dispatch('auth/refreshToken', store.state.auth.token);
        if (response.statusText !== 'OK') {
          await store.dispatch('auth/logOut');
          store.dispatch('app/loginDate');
        }
      } catch (err) {
        // eslint-disable-next-line
        location.reload();
      }
    },
  },
  created() {
    this.setAxiosToken(this.token);
    if (this.token) {
      setTimeout(() => {
        this.refreshToken();
      });
    }
    setInterval(() => this.refreshToken, 1000 * 60 * 60);
  },
  watch: {
    token: {
      handler(val) {
        if (val) {
          this.setAxiosToken(val);
        }
      },
      immediate: true,
    },
  },
  render: (h) => h(App),
}).$mount('#app');
