<template>
    <v-chart :option="categoryOptions" style="height: 700px"/>
</template>

<script>
export default {
  name: 'categoryOptions',
  data() {
    return {
      categoryOptions: {}
    }
  },
  mounted() {
    this.renderPieChart();
  },
  methods:{
    renderPieChart() {
      const mockData = [
        {
          legendname: '粉面粥店',
          value: 67,
          percent: '15.40%',
        },
        {
          legendname: '简易便当',
          value: 97,
          percent: '22.30%',
        },
        {
          legendname: '汉堡披萨',
          value: 92,
          percent: '21.15%',
        },
      ];
      this.categoryOptions = {
        title: [{
          text: '品类分布',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20,
        }],
        series: [{
          type: 'pie',
          data: mockData,
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
