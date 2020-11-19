import Vue from 'vue'
// import App from './App.vue'
import App from './Home.vue'
import qs from 'qs'
// import App from './Container.vue'
// import App from './UserNews.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import router from "./router";

import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.prototype.$qs = qs;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
