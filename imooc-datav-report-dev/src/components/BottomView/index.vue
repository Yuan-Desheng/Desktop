<template>
  <div class="bottom-view">
    <!-- 关键词搜索 -->
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <!-- 搜索框 -->
          <div class="chart-wrapper">
            <!-- 搜索用户数量 -->
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数量</div>
                <div class="chart-data">93,634</div>
                <v-chart :option="searchUserOption"/>
              </div>
              <!-- 搜索量 -->
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">198,782</div>
                <v-chart :option="searchNumberOption"/>
              </div>
            </div>
          </div>
          <!-- 搜索框 -->
          <div class="table-wrapper">
            <el-table :data="tableData">
              <el-table-column/>
            </el-table>
            <el-pagination/>
          </div>

        </template>
      </el-card>
    </div>
    <!-- 分类销售排行 -->
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" size="small">
                <el-radio-button label="品类"/>
                <el-radio-button label="商品"/>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <v-chart :options="categoryOptions"/>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boudaryGap: false
        },
        yAxis: {
          show: false,
        },
        series: [{
          type: 'line',
          data: [100, 150, 200, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          areaStyle: {
            color: 'rgba(95, 187, 255, 0.5)',
          },
          lineStyle: {
            color: 'rgba(95, 187, 255, 1)',
          },
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
        }],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      },
      searchNumberOption: {},
      tableData: [],
      radioSelect: '品类',
      categoryOptions: {},
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-card__header {
  border-bottom: none;
  padding: 0;
}

.bottom-view {
  display: flex;
  margin-top: 20px;

  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;

    &:first-child {
      padding: 0 10px 0 0;
    }

    &:last-child {
      padding: 0 0 0 10px;
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;

      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }

    }

    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;
      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;
        .chart {
          flex: 1;
          padding: 0 10px;
          .chart-title {
            color: #999999;
            font-size: 14px;
          }
          .chart-data {
            font-size: 22px;
            color: #333333;
            font-weight: 500;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
    }

  }
}
</style>
