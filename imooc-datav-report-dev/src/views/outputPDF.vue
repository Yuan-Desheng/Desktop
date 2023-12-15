<template>
  <div>
    <total-sales></total-sales>
    <total-orders></total-orders>
    <today-users></today-users>
    <total-users></total-users>
    <bottom-view></bottom-view>
  </div>
</template>

<script>
import totalSales from "@/components/TopView/components/TotalSales/index.vue";
import totalOrders from "@/components/TopView/components/TotalOrders/index.vue";
import todayUsers from "@/components/TopView/components/TodayUsers/index.vue";
import totalUsers from "@/components/TopView/components/TotalUsers/index.vue";
import bottomView from "@/components/BottomView/index.vue";

export default {
  name: "outputPDF",
  components: {
    totalSales,
    totalOrders,
    todayUsers,
    totalUsers,
    bottomView
  }
}
</script>

<style scoped>

</style>
