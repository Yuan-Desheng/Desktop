<template>
  <common-card title="今日交易用户数" value="81,014">
    <template>
      <v-chart :option="getOptions()"/>
    </template>
    <template v-slot:footer>
      <span>退货率 </span>
      <span class="emphasis">5.14%</span>
    </template>
  </common-card>
</template>

<script>
import CommonCardMixin from "@/mixins/commonCardMixin";

export default {
  name: "index",
  mixins: [CommonCardMixin],
  methods: {
    getOptions() {
      return {
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          show: false,
          barwidth: '60%',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'bar',
          data: [410, 82, 200, 334, 390, 220, 150, 82, 200, 134, 510, 520, 530],
        }],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      };
    },
  },
}
</script>

<style scoped>

</style>
