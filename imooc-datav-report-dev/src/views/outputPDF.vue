<template>
  <div class="outputpdf-body">
    <el-button @click="handleOutput">测试导出</el-button>
    <div class="ctn">
      <div class="pdf-ctn">
        <div class="pdf-panel">
          <el-descriptions title="自定义样式列表" :column="1" border v-for="item in 3" :key="item">
            <el-descriptions-item label="S/N" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">M2000001</el-descriptions-item>
            <el-descriptions-item label="型号" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">M2000001</el-descriptions-item>
            <el-descriptions-item label="现场使用环境" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="减速机速比" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="电机转速(rpm)" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
              <el-tag size="small">1500</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="减速机工作状态" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="减速机运行速度" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">恒速</el-descriptions-item>
            <el-descriptions-item label="减速机负载类型" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="联系地址" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>

          <el-descriptions title="2-02号岸桥小车行走减速机-正常" :column="1" border>
            <el-descriptions-item label="S/N" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">25950-</el-descriptions-item>
            <el-descriptions-item label="型号" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">FH1060.27.A2B-00</el-descriptions-item>
            <el-descriptions-item label="现场使用环境" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="减速机速比" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="电机转速(rpm)" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
              <el-tag size="small">1500</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="减速机工作状态" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="减速机运行速度" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="减速机负载类型" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="联系地址" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>

          <el-descriptions title="1. M2000001" :column="1" border>
            <el-descriptions-item label="告警序号" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">1</el-descriptions-item>
            <el-descriptions-item label="监测名称" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">润滑油时间-运行时长</el-descriptions-item>
            <el-descriptions-item label="告警状态" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">预警</el-descriptions-item>
            <el-descriptions-item label="告警时间" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">2023-11-28 15:23:38</el-descriptions-item>
            <el-descriptions-item label="解除时间" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}"></el-descriptions-item>
            <el-descriptions-item label="告警次数" :labelStyle="{'text-align': 'center'}" :contentStyle="{'text-align': 'center'}">
              <el-tag size="small">26</el-tag>
            </el-descriptions-item>
          </el-descriptions>
    <!--      <ImageComponent v-for="(item,index) in 3" :key="index + 6"></ImageComponent>-->
          <div class="descriptions-echarts">
            <total-orders style="width: 100%"></total-orders>
          </div>
          <div class="descriptions-echarts">
            <today-users style="width: 100%"></today-users>
          </div>
          <div class="descriptions-echarts">
            <total-users style="width: 100%"></total-users>
          </div>
    <!--      <div class="descriptions-echarts">-->
    <!--        <bottom-view style="width: 100%"></bottom-view>-->
    <!--      </div>-->
          <div class="descriptions-echarts" v-for="item in 10" :key="item">
            <category-options></category-options>
          </div>
          <div class="descriptions-echarts" v-for="item in 5" :key="item">
            <image-component></image-component>
          </div>
        </div>
      </div>
    </div>
<!--    <total-sales></total-sales>-->

    <div class="pdf-header"
         style="font-weight: bold; padding:15px 8px; width: 100%; border-bottom: 1px solid rgba(0, 0, 0, 0.85); color: rgba(0, 0, 0, 0.85); position: fixed; top: -100vh;">
      页头
    </div>
    <div class="pdf-footer"
         style="font-weight: bold; padding: 15px 8px; width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.85); position: fixed; top: -100vh;">
      <div style="display: flex; justify-content: center; align-items: center; padding-top: 5px;">
        我是页尾
      </div>
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
        第<div class="pdf-footer-page"></div>页 / 第<div class="pdf-footer-page-count"></div>页
      </div>
    </div>
  </div>
</template>

<script>
import totalSales from "@/components/TopView/components/TotalSales/index.vue";
import totalOrders from "@/components/TopView/components/TotalOrders/index.vue";
import todayUsers from "@/components/TopView/components/TodayUsers/index.vue";
import totalUsers from "@/components/TopView/components/TotalUsers/index.vue";
import bottomView from "@/components/BottomView/index.vue";
import { outputPDF } from '@/utils/outputPDF'
import ImageComponent from '@/views/ImageComponent.vue'
import CategoryOptions from '@/views/categoryOptions.vue'

export default {
  name: "outputPDF",
  components: {
    CategoryOptions,
    ImageComponent,
    totalSales,
    totalOrders,
    todayUsers,
    totalUsers,
    bottomView
  },
  methods:{
    async handleOutput() {
      const element = document.querySelector('.pdf-panel');
      const header = document.querySelector('.pdf-header');
      const footer = document.querySelector('.pdf-footer');
      try {
        await outputPDF({
          element: element,
          footer: footer,
          header: header,
          contentWidth: 560
        })
      } catch (error) {
        console.log(error,"error")
        // message.error(typeof error === 'string' ? error : JSON.stringify(error))
      }

    }
  }
}
</script>

<style scoped lang="scss">
.outputpdf-body{
  margin: 50px;
}

.ctn {
  .pdf-ctn {
    width: 1300px;
    .pdf-panel {
      position: relative;
      padding-top: 100px;
    }
  }
}

.text-align-center {
  text-align: center;
}

.descriptions-echarts{
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 10px 30px;
  border: 1px #ebeef5 solid;
}

::v-deep .el-descriptions__header {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 10px;
  border: 1px #ebeef5 solid;
  background-color: #fafafa;
}

::v-deep .el-descriptions-item__label{
  width: 15vw;
}
</style>
