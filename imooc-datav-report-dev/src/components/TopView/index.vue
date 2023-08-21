<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <total-sales />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <total-orders />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <today-users />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <total-users />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSales from "@/components/TopView/components/TotalSales/index.vue";
import TotalOrders from "@/components/TopView/components/TotalOrders/index.vue";
import TotalUsers from "@/components/TopView/components/TotalUsers/index.vue";
import TodayUsers from "@/components/TopView/components/TodayUsers/index.vue";
export default {
  name: "index",
  components: {
    TotalSales,
    TotalOrders,
    TotalUsers,
    TodayUsers
  }
}
</script>

<style scoped>

</style>
