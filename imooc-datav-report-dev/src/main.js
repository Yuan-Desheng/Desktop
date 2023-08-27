import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as ECharts from 'echarts';
import VueEcharts from 'vue-echarts';

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts;
Vue.component('v-chart', VueEcharts)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
