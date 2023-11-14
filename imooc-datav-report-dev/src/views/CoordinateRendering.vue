<template>
  <div class="home">
    <div class="base-map">
<!--      <div ref="superBaseMap" id="superBaseMap"></div>-->
<!--      <v-chart :option="getOptions()"/>-->
      <canvas
        ref="canvas"
        id="tutorial"
        class="superBaseMap"
        width="1980"
        height="1080"
        @mousedown="canvasMouseDown"
        @mousemove="canvasMouseMove"
        @mouseup="canvasMouseUp"
      ></canvas>
    </div>
  </div>
</template>

<script>

export default {
  name: "CoordinateRendering",
  data() {
    return {
      //判断鼠标是否点击
      isClick: false,
      // 获取canvas标签
      canvas: null,
      // 创建画布
      ctx: null,
      sensorImgList: [],
      backgroundImg: {
        // url: "https://img2.baidu.com/it/u=3823882177,3352315913&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        url: require("@/assets/UAV.png"),
        x: 1000,
        y: 100,
        width: 46,
        height: 46,
      },
      canvasSensorImg: [
        {
          channelId: 12,
          height: 46,
          url: require("@/assets/UAV.png"),
          width: 46,
          x: 247,
          y: 233,
        },
        {
          channelId: 13,
          height: 46,
          url: require("@/assets/UAV.png"),
          width: 46,
          x: 400,
          y: 400,
        },
      ],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.plottingPoint();
    this.plottingLine();
    this.plottingRectangles();
    this.plottingOrbicular();
    this.plottingImg();
    // 刷新画布
    // this.dataRefreh();
  },
  methods: {
    // 绘制点
    plottingPoint() {
      this.ctx.beginPath();//开始绘制
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'red';
      this.ctx.moveTo(300, 200);//坐标起点
      this.ctx.lineTo(301, 204);//终点,或者理解为下一个点
      this.ctx.stroke();//进行绘制
    },

    // 绘制线
    plottingLine() {
      this.ctx.beginPath();//开始绘制
      this.ctx.lineWidth = 6;
      this.ctx.strokeStyle = 'blue';
      this.ctx.moveTo(400, 200);//坐标起点
      //线的端点是圆，还可以是butt(正方)，square(正方，但是追加一段长为线段厚度一半的矩形区域)
      this.ctx.lineCap = 'round';
      this.ctx.lineTo(500, 100);//终点,或者理解为下一个点
      this.ctx.stroke();//进行绘制，这里也是打断上下文渲染，这样下面重新赋值的线段宽度和颜色才会生效
      //this.ctx.closePath();这个是关闭路径绘制，大家放开这行代码看效果就知道，如果还不想明白，请继续放开下一行代码
      //this.ctx.moveTo(400, 200);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'red';
      this.ctx.lineJoin = 'bevel'//连接时候的样式，另外2个值miter，round
      this.ctx.lineTo(600, 200);
      this.ctx.stroke();//进行绘制
    },

    // 绘制矩形
    plottingRectangles() {
      this.ctx.fillStyle = 'red';//填充红色
      this.ctx.fillRect(700, 100, 100, 100);//绘制区域坐标（x轴起点，y轴起点，宽度，高度）
      this.ctx.clearRect(750, 150, 20, 20)//清空这个区域（x轴起点，y轴起点，宽度，高度）
    },

    // 绘制圆形
    plottingOrbicular() {
      // 开始绘制，是为了说明这是一个与上面无关的新绘制
      // 这样才能保证，线不连接，上一个的样式对后面的无影响
      this.ctx.beginPath();
      this.ctx.lineWidth = 0;
      this.ctx.strokeStyle = 'black';
      this.ctx.fillStyle = 'red';
      //(x,y,半径,开始角度，结束角度)，通过这个可以绘制出曲线
      this.ctx.arc(900, 150, 10, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
    },

    // 定时器刷新画布
    dataRefreh() {
      if (this.intervalId != null) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.plottingImg();
      }, this.frameNumber);
    },

    // 绘制图片
    plottingImg() {
      let img = new Image();
      let bgImg = this.backgroundImg;
      img.src = bgImg.url;
      img.onload = () => {
        // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.drawImage(img, bgImg.x, bgImg.y, bgImg.width, bgImg.height);
        this.drawCanvasSensorImg();
        this.loadSensorImg();
      };
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

    //鼠标抬起触发事件
    canvasMouseUp(e) {
      console.log("执行了");
      this.isClick = false;
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

  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #eee;
  box-sizing: border-box;
}
.base-map {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/wallhaven-nkmddd.jpg");
  background-size: cover;
}
.superBaseMap {
  width: 100%;
  height: 100%;
  color: #01d4f9;
}
</style>
