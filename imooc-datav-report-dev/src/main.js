import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as ECharts from 'echarts';
import VueEcharts from 'vue-echarts';
import VeLine from 'v-charts/lib/line.common'

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts;
Vue.component('v-chart', VueEcharts)
Vue.component(VeLine.name, VeLine)
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
