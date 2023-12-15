import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CoordinateRendering from "@/views/CoordinateRendering.vue";
import myEcharts from "@/views/myEcharts.vue";
import outputPDF from "@/views/outputPDF.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/myEcharts',
    name: 'myEcharts',
    // component: myEcharts,
    component: CoordinateRendering
  },
  {
    path: '/outputPDF',
    name: 'outputPDF',
    // component: myEcharts,
    component: outputPDF
  }
];

const router = new VueRouter({
  routes
})

export default router
