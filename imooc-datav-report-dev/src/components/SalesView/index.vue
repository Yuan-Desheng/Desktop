<template>
  <div class="sale-view">
    <el-card shadow="hover">
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
      <template>

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
      }
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
.sale-view{
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
}

::v-deep .el-card__header {
  border-bottom: none;
  padding: 0;
}
</style>
