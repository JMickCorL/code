// Dependencies
import { Notification } from 'element-ui';
import Vue from 'vue';

export default (error) => {
  let message = 'Algo salió mal';
  if (error && error.response) {
    const { data } = error.response;
    if (typeof data === 'object' && data.error) {
      message = data.error;
    }
  }
  Notification.closeAll();
  Notification({
    type: 'warning',
    title: 'Error.',
    message,
  });
  Vue.config.errorHandler(error);
};
