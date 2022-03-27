import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from "axios"
import "./assets/style/reset.css"

Vue.config.productionTip = false
Vue.use(ElementUI);

axios.defaults.timeout = 30000;
Vue.prototype.$axios = axios

new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
