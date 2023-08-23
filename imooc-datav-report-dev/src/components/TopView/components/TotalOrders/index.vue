<template>
  <common-card title="累计订单量" value="¥ 126,560">
    <template>
      <div id="total-orders-chart" :style="{ width: '100%',height: '100%'}">
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额 </span>
      <span class="emphasis">¥ 1,200</span>
    </template>
  </common-card>
</template>

<script>
import CommonCardMixin from '@/mixins/commonCardMixin'

export default {
  name: 'index',
  mixins: [CommonCardMixin],
  mounted() {
    const chartDom = document.getElementById('total-orders-chart')
    const chart = this.$echarts.init(chartDom)
    chart.setOption({
      xAxis: {
        // 展示离散的分类数据
        type: 'category',
        show: false,
        // 不留边界空白
        boundaryGap: false
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
        areaStyle: {
          color: 'purple'
        },
        lineStyle: {
          width: 0
        },
        itemStyle: {
          opacity: 0
        },
        smooth: true
      }],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    })
  }
}
</script>

<style scoped>

</style>
