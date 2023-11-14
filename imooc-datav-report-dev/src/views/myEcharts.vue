<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <el-row :gutter="20">
      <!-- 树结构 -->
      <el-col :xs="24" :sm="4" :lg="4">
        <div class="grid-left">
          <!-- 筛选框 -->
          <el-input
            class="searchinput"
            placeholder="请搜索楼层"
            suffix-icon="el-input__icon el-icon-search"
            v-model="treeinput"
            clearable
            size="small"
          ></el-input>
          <!-- 树结构 -->
          <el-tree
            :data="treedata"
            :props="defaultProps"
            @node-click="handleNodeClick"
            ref="menuTree"
            node-key="id"
            default-expand-all
            :filter-node-method="filterNode"
          ></el-tree>
        </div>
      </el-col>
      <!-- 点位模块 -->
      <el-col :xs="24" :sm="15" :lg="15">
        <div class="grid-right">
          <!-- 点位标题 -->
          <div class="grid-top"></div>
          <!-- 图片展示 -->
          <img class="bigImg" :src="backpicture" v-if="backpicture" />
          <!-- 生成画布模块 -->
          <div class="canvas-box" v-show="this.canvasinit">
            <!-- 表头 -->
            <div class="canvas-title">
              <div class="zuo">
                请拖动图标到安装位置-<i>厂家平面图 平面图</i>
              </div>
            </div>
            <!-- 画布 -->
            <canvas
              ref="canvas"
              width="970"
              height="500"
              @mousedown="canvasMouseDown"
              @mousemove="canvasMouseMove"
              @mouseup="canvasMouseUp"
            ></canvas>
          </div>
          <!-- 保存平面图 -->
          <div class="bottom" v-if="!this.canvasinit">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
          <!-- 图标提示信息 -->
          <el-popover
            placement="top"
            id="popovercan"
            width="200"
            v-model="canvasvisible"
          >
            <div class="popover-top">
              <i>传感器设备</i>
            </div>
            <p>序列号:sjhdkjshkj</p>
            <p>设备类型：是给大家灰色轨迹</p>
            <p></p>
          </el-popover>
        </div>
      </el-col>
      <!-- 设备信息 -->
      <el-col :xs="24" :sm="5" :lg="5">
        <div class="grid-table">
          <!-- 标题 -->
          <div class="grid-top">
            <i></i>
            <p>配置资源点-点击图标加载到画布中</p>
          </div>
          <!-- 表格数据 -->
          <div class="newtable">
            <div
              class="new-item"
              v-for="item in tableData"
              :key="item.id"
              @click="handleClick(item)"
            >
              <img :src="item.img" alt="" />
              <div class="newconter">
                <p>序列号码:{{ item.phone }}</p>
                <p>设备类型:{{ item.newtype }}</p>
                <p>详细位置:{{ item.sys }}</p>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination
              small
              :page-size="pageInfo.pageSize"
              layout="prev, pager, next"
              :total="pageInfo.total"
            >
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Ceshi",
  watch: {
    treeinput(val) {
      this.$refs.menuTree.filter(val);
    },
  },
  data() {
    return {
      // 树结构筛选框
      treeinput: "",
      // 树结构数据
      treedata: [
        {
          id: 1,
          name: "中国",
          children: [
            {
              id: 1,
              name: "广东",
              children: [
                {
                  id: 4,
                  name: "惠州",
                },
                {
                  id: 5,
                  name: "深圳",
                },
                {
                  id: 6,
                  name: "广州",
                },
              ],
            },
            {
              id: 2,
              name: "湖北",
              children: [
                {
                  id: 7,
                  name: "武汉",
                },
              ],
            },
            {
              id: 3,
              name: "北京",
            },
          ],
        },
      ],
      // 树结构配置
      // 树形数据分析
      defaultProps: {
        id: "id",
        label: "name",
        children: "children",
      },
      // 获取canvas标签
      canvas: null,
      // 创建画布
      ctx: null,
      // 画布大小
      canvasWidth: 970,
      canvasHeight: 500,
      //定时器
      intervalId: null,
      //判断鼠标是否点击
      isClick: false,
      //记录需要移动的图片的开光
      index: -1,
      frameNumber: 20,
      sensorImgList: [],
      backgroundImg: {
        url: "https://img2.baidu.com/it/u=2832413337,2216208892&fm=253&fmt=auto&app=138&f=JPEG?w=544&h=500",
        x: 0,
        y: 0,
        width: 970,
        height: 500,
      },
      // 图片
      canvasSensorImg: [
        {
          channelId: 12,
          height: 46,
          url: "https://img2.baidu.com/it/u=3823882177,3352315913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          width: 46,
          x: 247,
          y: 233,
        },
        {
          channelId: 13,
          height: 46,
          url: "https://img2.baidu.com/it/u=3823882177,3352315913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          width: 46,
          x: 400,
          y: 400,
        },
      ],
      tableData: [
        {
          id: 1,
          img: "https://img2.baidu.com/it/u=3823882177,3352315913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          phone: "865566043823044",
          newtype: "NP-FDY100-N",
          sys: "中国北京市北京人名大会堂侧门旁边",
        },
      ],
      // 图标数据
      Icondata:
        "https://img2.baidu.com/it/u=3823882177,3352315913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      // 背景图图片
      backpicture:
        "https://img2.baidu.com/it/u=2832413337,2216208892&fm=253&fmt=auto&app=138&f=JPEG?w=544&h=500",
      // 画布开关
      canvasinit: false,
      // 设备抱紧查询
      pageInfo: {
        // 总条数
        total: 17,
        // 当前页
        pageNo: 1,
        // 每页条数
        pageSize: 10,
      },
      clickicon: {},
      canvasvisible: false,
    };
  },
  created() {},
  methods: {
    // 树结构点击事件
    handleNodeClick(data) {
      if (data.children.length !== 0) {
        return;
      }
      console.log("树形结构", data);
      console.log(data.id);
      // 楼层id
      this.page.floorId = data.id;
    },
    // 树节点搜索
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 确认保存按钮
    save() {
      this.canvasinit = true;
      this.init();
    },
    // 创建画布
    init() {
      // 找到画布标签
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      // 创建背景，图标，移动图标
      this.loadBgImg();
      // 刷新画布
      this.dataRefreh();
    },
    loadBgImg() {
      let img = new Image();
      let bgImg = this.backgroundImg;
      img.src = bgImg.url;
      img.onload = () => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(img, bgImg.x, bgImg.y, bgImg.width, bgImg.height);
        this.drawCanvasSensorImg();
        this.loadSensorImg();
      };
    },
    //加载图标
    loadSensorImg() {
      let imgList = [];
      for (let i = 0; i < this.sensorImgList.length; i++) {
        let img = new Image();
        let sensorImg = this.sensorImgList[i];
        img.src = sensorImg.url;
        let imgs = {};
        imgs.img = img;
        imgs.x = sensorImg.x;
        imgs.y = sensorImg.y;
        imgs.width = sensorImg.width;
        imgs.height = sensorImg.height;
        // console.log(imgs)
        imgList.push(imgs);
      }
      this.drawImg(imgList);
    },
    //绘制图片方法
    drawImg(imgList) {
      console.log(imgList,"imgList")
      for (let i = 0; i < imgList.length; i++) {
        this.ctx.drawImage(
          imgList[i].img,
          imgList[i].x,
          imgList[i].y,
          imgList[i].width,
          imgList[i].height
        );
      }
    },
    // 绘制移动的图片
    drawCanvasSensorImg() {
      let imgList = [];
      for (let i = 0; i < this.canvasSensorImg.length; i++) {
        let img = new Image();
        let sensorImg = this.canvasSensorImg[i];
        img.src = sensorImg.url;
        let imgs = {};
        imgs.img = img;
        imgs.x = sensorImg.x;
        imgs.y = sensorImg.y;
        imgs.width = sensorImg.width;
        imgs.height = sensorImg.height;
        imgList.push(imgs);
      }
      this.drawImg(imgList);
    },
    //判断鼠标是否在图标范围内,并返回下标
    isMouseInIcon(e, imgList) {
      let x = e.offsetX;
      let y = e.offsetY;
      for (let i = 0; i < imgList.length; i++) {
        let imgX = imgList[i].x;
        let imgY = imgList[i].y;
        let imgWidth = imgList[i].width;
        let imgHeight = imgList[i].height;
        if (
          x > imgX &&
          x < imgX + imgWidth &&
          y > imgY &&
          y < imgY + imgHeight
        ) {
          return i;
        }
      }
      return -1;
    },
    // 定时器刷新画布
    dataRefreh() {
      if (this.intervalId != null) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.loadBgImg();
      }, this.frameNumber);
    },
    //鼠标点击触发事件
    canvasMouseDown(e) {
      console.log("鼠标点击", e);
      this.isClick = true;
      this.index = this.isMouseInIcon(e, this.canvasSensorImg);
      if (this.index == -1) {
        console.log("没选中");
        return;
      }
      this.$nextTick(() => {
        console.log("top");
        const canpro = document.getElementById("popovercan");
        canpro.style.position = "absolute";
        canpro.style.top = this.canvasSensorImg[this.index].y + 40 + "px";
        canpro.style.left = this.canvasSensorImg[this.index].x - 60 + "px";
        this.canvasvisible = !this.canvasvisible;
      });
    },
    //鼠标移动触发事件
    canvasMouseMove(e) {
      if (!this.isClick) {
        return;
      }
      if (this.index != -1) {
        this.canvasvisible = false;
        let x = e.offsetX;
        let y = e.offsetY;
        this.canvasSensorImg[this.index].x =
          this.canvasSensorImg[this.index].x < 0
            ? 0
            : x - this.canvasSensorImg[this.index].width / 2;
        this.canvasSensorImg[this.index].y =
          this.canvasSensorImg[this.index].y < 0
            ? 0
            : y - this.canvasSensorImg[this.index].height / 2;
      }
    },
    //鼠标抬起触发事件
    canvasMouseUp(e) {
      console.log("执行了");
      this.isClick = false;
    },
    handleClick(item) {
      // 判断是否上传楼层图片
      // 创建点位
      let imgs = {};
      imgs.url = this.Icondata;
      imgs.x = 0;
      imgs.y = 0;
      imgs.width = 46;
      imgs.height = 46;
      // 加载点位图标
      this.canvasSensorImg.push(imgs);
      this.$message.success("请拖动图标到指定点位");
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  height: 815px;
  .grid-left {
    padding: 30px 20px 20px;
    min-height: 815px;
    border: 1px solid #ccc;
    // 输入框
    .searchinput {
      margin-bottom: 20px;
    }
  }
  .grid-right {
    // width: 1363px;
    width: 100%;
    height: 815px;
    padding: 30px 20px 20px;
    border: 1px solid #ccc;
    position: relative;
    // 标题
    .grid-top {
      width: 100%;
    }
    // 图片展示
    .bigImg {
      display: block;
      width: 970px;
      height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -54%);
    }
    // 画布模块
    .canvas-box {
      width: 1000px;
      height: 620px;
      padding: 10px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -55%);
      cursor: pointer;
      .canvas-title {
        display: flex;
        // background-color: skyblue;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
    }
    // 保存平面图
    .bottom {
      width: 95%;
      height: 100px;
      border-top: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: skyblue;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
    }
    // 设备弹出框
    ::v-deep .el-popover {
      // background-color: skyblue;
      padding: 0;
      .popover-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .popover-title {
          width: 30px;
          height: 35px;
          cursor: pointer;
          background-color: #e72528;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 5px 0 0;
          i {
            font-size: 25px;
          }
        }
        i {
          font-style: normal;
          // font-size: 20px;
        }
      }
      p {
        margin: 3px 0;
      }
    }
  }
  .grid-table {
    padding: 30px 5px 5px;
    height: 815px;
    border: 1px solid #ccc;
    .grid-top {
      display: flex;
      align-items: center;
      // background-color: skyblue;
      i {
        display: block;
        width: 3px;
        height: 19px;
        background-color: #409eff;
        // border-radius: 2px;
        margin-right: 5px;
      }
      p {
        // font-size: 17px;
        // font-weight: 700;
        color: rgb(36, 37, 37);
      }
    }
    // 设备列表
    .newtable {
      background-color: #fff;
      .new-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        padding: 0 5px;
        cursor: pointer;
        // background-color: skyblue;
        border-top: 2px solid #c8c8c8;
        // border-bottom: 2px solid #c8c8c8;
        &:last-child {
          border-bottom: 2px solid #c8c8c8;
        }
        img {
          width: 45px;
          height: 45px;
        }
        .newconter {
          margin-left: 10px;
          font-size: 12px;
          p {
            padding: 0;
            margin: 2px 0;
          }
        }
      }
    }
    .pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>
