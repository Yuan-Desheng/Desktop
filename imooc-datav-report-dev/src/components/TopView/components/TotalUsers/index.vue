<template>
  <common-card title="累计用户数" value="1,126,560">
    <template>
      <div id="total-users-chart" :style="{ width: '100%',height: '100%'}">
      </div>
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">7.33%</span>
        <div class="increase"/>
        <span class="month">月同比</span>
        <span class="emphasis">8.73%</span>
        <div class="decrease"/>
      </div>
    </template>
  </common-card>
</template>

<script>
import CommonCardMixin from '@/mixins/commonCardMixin'

export default {
  name: 'index',
  mixins: [CommonCardMixin],
  mounted() {
    const chartDom = document.getElementById('total-users-chart')
    const chart = this.$echarts.init(chartDom)
    chart.setOption({
      xAxis: {
        type: 'value',
        show: false
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          type: 'bar',
          stack: '总量',
          data: [200],
          barWidth: 10,
          itemStyle: {
            color: '#45c946'
          }
        },
        {
          type: 'bar',
          stack: '总量',
          data: [250],
          barWidth: 10,
          itemStyle: {
            color: '#eee'
          }
        },
        {
          type: 'custom',
          stack: '总量',
          data: [200],
          renderItem: (params, api) => {
            const value = api.value(0)
            const endPoint = api.coord([value, 0])
            return {
              type: 'group',
              position: endPoint,
              children: [
                {
                  type: 'path',
                  shape: {
                    d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                    x: -11,
                    y: -23,
                    width: 20,
                    height: 20,
                  },
                  style: {
                    fill: '#45c946'
                  }
                },
                {
                  type: 'path',
                  shape: {
                    d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                    x: -11,
                    y: 3,
                    width: 20,
                    height: 20,
                  },
                  style: {
                    fill: '#45c946'
                  }
                }
              ]
            }
          }
        }
      ],
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
.total-users-footer {
  display: flex;
  align-items: center;

  .month {
    margin-left: 10px;
  }
}

</style>
