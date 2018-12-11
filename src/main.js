// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import materialIcons from 'material-design-icons/iconfont/material-icons.css'
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
import App from './App'
import router from './router'
Vue.use(require('vue-resource'));
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueCordova)
Vue.use(VueHead)
import './assets/stylus-overrides.styl'


import InfiniteLoading from 'vue-infinite-loading';

import loader from './global/loader.vue';
Vue.component('loaderWait',loader);
Vue.component('InfiniteLoading', InfiniteLoading);
// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
