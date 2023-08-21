<template>
  <div class="home">
    report
    <el-button type="primary">primary</el-button>
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from '@/components/TopView/index.vue'
import SalesView from '@/components/SalesView/index.vue'
import BottomView from '@/components/BottomView/index.vue'
import MapView from '@/components/MapView/index.vue'

export default {
  name: 'HomeView',
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView,
  }
}
</script>
<style>
  .home {
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }
</style>
