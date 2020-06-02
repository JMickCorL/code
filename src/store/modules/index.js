/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

import { camelCase } from 'lodash';

const requireModule = require.context('.', false, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  // Don't register this file as a Vuex module
  if (fileName === './index.js') return;

  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''));

  modules[moduleName] = requireModule(fileName).default;
});

export default modules;
