<!--  销售趋势组件容器  -->
<template>
  <div class="sale-view">
    <el-card shadow="hover" :body-style="{ padding: '0 0 20px 0' }">
      <!-- 头部 -->
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            class="sale-view-menu"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radio">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="small"
              unlink-panels
              :picker-options="pickerOptions"
              class="sale-view-date-picker"
            />
          </div>
        </div>
      </template>

      <!--  图标和列表  -->
      <template>
        <div class="sales-view-chart-wrapper">
          <v-chart :options="chartOption"/>
          <div class="sale-view-list">
            <div class="sale-view-title">排行榜</div>
            <div class="list-item-wrapper">
              <div class="list-item" v-for="(item, index) in rankData" :key="item.no">
                <div :class="['list-item-no',index < 3 ? 'top-no' : '']">{{ item.no }}</div>
                <div class="list-item-name">{{ item.name }}</div>
                <div class="list-item-money">{{ item.money }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      radio: '今日',
      date: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      // 销售额图表
      chartOption: {},
      // 销售排行榜
      rankData: [
        {
          no: 1,
          name: '小米',
          money: '123',
        },
        {
          no: 2,
          name: '华为',
          money: '123',
        },
        {
          no: 3,
          name: 'oppo',
          money: '123',
        },
        {
          no: 4,
          name: 'vivo',
          money: '123',
        },
        {
          no: 5,
          name: '苹果',
          money: '123',
        },
        {
          no: 6,
          name: '摩托罗拉',
          money: '123',
        },
        {
          no: 7,
          name: '黑莓',
          money: '123',
        }
      ]
    }
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      console.log(this.activeIndex);

    }
  }
};
</script>

<style lang="scss" scoped>
.sale-view {
  margin-top: 20px;

  .menu-wrapper {
    position: relative;
    display: flex;

    .sale-view-menu {
      width: 100%;
      padding-left: 20px;

      .el-menu-item {
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
      }
    }

    .menu-right {
      position: absolute;
      top: 0;
      right: 20px;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .sale-view-date-picker {
        margin-left: 20px;
      }
    }
  }

  // 销售排行榜
  .sales-view-chart-wrapper {
    display: flex;
    height: 270px;

    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }

    .sale-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      //margin-top: 15px;

      .sale-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666666;
        font-weight: 500;
      }

      .list-item-wrapper {
        margin-top: 15px;
        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding: 6px 20px 6px 0;

          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;
            &.top-no {
              background: black;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }

          .list-item-name {
            margin-left: 10px;
            color: #333;
          }

          .list-item-money {
            flex: 1;
            text-align: right;
          }

        }
      }
    }
  }

}

::v-deep .el-card__header {
  border-bottom: none;
  padding: 0;
}
</style>
