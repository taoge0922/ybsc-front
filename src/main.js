// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Bus from './bus'

Vue.config.productionTip = false
Vue.prototype.axios = axios;
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem("user")){
    Bus.isLogined = true;
    let u = JSON.parse(sessionStorage.getItem("user"));
    Bus.user = u.user;
    Bus.dict = u.dict;
  }
  if (to.path != "/login"&&to.path!='/') {
    if(!Bus.isLogined){
      next({path: "/"});
      return;
    }else{
      next();
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
var context;
axios.get('/static/config.json').then(res=>{
  Vue.prototype.baseConfig = res.data;
  context = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    created(){
      this.axios.defaults.baseURL = Vue.prototype.baseConfig.baseUrl;
      this.axios.defaults.withCredentials = true;
    }
  })
});
