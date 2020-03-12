// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

Vue.config.productionTip = false
//Vue.prototype.url = 'http://47.96.117.121:5003';
//axios.defaults.baseURL = 'http://47.96.117.121:5003/api/'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
