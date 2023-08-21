<template>
  <div id="common-card">
    <div class="title">1</div>
    <div class="value">2</div>
    <div class="chart">3</div>
    <div class="line"/>
    <div class="total">5</div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #999;
}

.value {
  font-size: 24px;
  color: #000;
  margin-top: 5px;
  letter-spacing: 1px;
}

.chart {
  height: 50px;
}

.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}

.total {
  font-size: 12px;
  color: #666;
}
</style>
