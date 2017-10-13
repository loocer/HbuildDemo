<template>
  <div class="my-page">
    <page-header>
      <header-title>显示屏</header-title>
    </page-header>
    <page-content>
      <div class="set-property">
      <p>
        <span class="le-te">灵敏度：</span> <span>低</span><input type="range" v-model="senVal" name="range"   step="0.1" value="" /><span>高</span>
      </p>
      <p>
        <span class="le-te">监测频率：</span> <span>慢</span><input type="range"  v-model="freVal" name="range" step="10" value="" /><span>快</span>
      </p>
      </div>
      <canvas id="myCanvas" width="500" height="700" >
      Your browser does not support the canvas element.
      </canvas>
    </page-content>
  </div>
</template>
<script>
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'
export default {
  components: {
    'page-header': Header,
    HeaderLink,
    HeaderTitle,
    'page-content': Content
  },
  data () {
    return {
      getVibration: {
        range: 20
      },
      senVal: 2,
      freVal: 100
    }
  },
  methods: {
    draw () {
      var c = document.getElementById('myCanvas')
      var cxt = c.getContext('2d')
      var getVibration = {
        range: 20
      }
      var tempPosations = [1.323, 3.43434, 5.65656]
      getVibration.calculation = function ({ value1, value2 }) {
        let r = this.range
        return Math.abs(value2 - value1).toFixed(r)
      }
      var xPosation = 0
      window.mingan = this.senVal
      var yInit = 500
      window.time = 101 - this.freVal
      var time = 0
    // var lastPoint = {x:0, y:200}
      var points = []
      function doing () {
        document.addEventListener('plusready', function () {
        // 扩展API加载完毕，现在可以正常调用扩展API
        // var tempPosations = [1.323,3.43434,5.65656]
          window.plus.accelerometer.watchAcceleration(function (a) {
            time++
            if (time % window.time === 0) {
              mainfoo(a)
            }
          }, function (e) {
            window.alert('Acceleration error: ' + e.message)
          }, {frequency: 1})
        }, false)
      }
      function mainfoo (a) {
        xPosation = xPosation + 5
        var y = Math.floor(a.yAxis * 10000)
        var x = Math.floor(a.xAxis * 10000)
        var z = Math.floor(a.zAxis * 10000)
        var pos = [x, y, z]
        var pArray = []
        for (let p = 0; p < pos.length; p++) {
          let a = Math.abs(pos[p] - tempPosations[p]).toFixed(2)
          pArray.push(a)
        }
        var temp = pArray[0]
        for (let i in pArray) {
          temp = temp > pArray[i] ? temp : pArray[i]
        }
        tempPosations = pos
        var tempy = yInit * (1 - temp / 10000 * window.mingan) > 350 ? yInit * (1 - temp / 10000 * window.mingan) : 350
        if (tempy < 400) {
          // window.plus.device.beep(3)
        }
        if (xPosation < 500) {
          let p = {x: xPosation, y: tempy}
          points.push(p)
        } else {
          let p = {x: xPosation, y: tempy}
          points.push(p)
          let tempp = points.slice(1, points.length)
          for (let t = 0; t < tempp.length; t++) {
            tempp[t].x = t * 5
          }
          points = tempp
        }
        cxt.clearRect(0, 0, 1000, 1000)
        cxt.beginPath()
        cxt.strokeStyle = '#00ff0c'
        for (let i = 1; i < points.length; i++) {
          if (i % 2 === 0) {
            cxt.moveTo(points[i - 1].x, yInit * 2 - points[i - 1].y)
            cxt.lineTo(points[i].x, points[i].y)
            cxt.stroke()
          } else {
            cxt.moveTo(points[i - 1].x, points[i - 1].y)
            cxt.lineTo(points[i].x, yInit * 2 - points[i].y)
            cxt.stroke()
          }
        }
        cxt.closePath()
      }
      doing()
    }
  },
  watch: {
    senVal (val) {
      window.mingan = val === '0' ? 1 : val / 50
    },
    freVal (vall) {
      window.time = (11 - (vall === '0' ? 1 : vall) / 10)
    }
  },
  mounted () {
    this.draw()
    // var c = document.getElementById('myCanvas')
    // var cxt = c.getContext('2d')
    // var getVibration = {
    //   range: 20
    // }
    // var tempPosations = [1.323, 3.43434, 5.65656]
    // getVibration.calculation = function ({ value1, value2 }) {
    //   let r = this.range
    //   return Math.abs(value2 - value1).toFixed(r)
    // }
    // var xPosation = 0
    // var time = 0
    // var yInit = 500
    // // var lastPoint = {x:0, y:200}
    // var points = []
    // function doing () {
    //   document.addEventListener('plusready', function () {
    //     // 扩展API加载完毕，现在可以正常调用扩展API
    //     // var tempPosations = [1.323,3.43434,5.65656]
    //     window.plus.accelerometer.watchAcceleration(function (a) {
    //       time++
    //       if (time % 2 === 0) {
    //         mainfoo(a)
    //       }
    //     }, function (e) {
    //       window.alert('Acceleration error: ' + e.message)
    //     }, {frequency: 2})
    //   }, false)
    // }
    // function mainfoo (a) {
    //   xPosation = xPosation + 5
    //   var y = Math.floor(a.yAxis * 10000)
    //   var x = Math.floor(a.xAxis * 10000)
    //   var z = Math.floor(a.zAxis * 10000)
    //   var pos = [x, y, z]
    //   var pArray = []
    //   for (let p = 0; p < pos.length; p++) {
    //     let a = Math.abs(pos[p] - tempPosations[p]).toFixed(2)
    //     pArray.push(a)
    //   }
    //   var temp = pArray[0]
    //   for (let i in pArray) {
    //     temp = temp > pArray[i] ? temp : pArray[i]
    //   }
    //   tempPosations = pos
    //   var tempy = yInit * (1 - temp / 50000) > 350 ? yInit * (1 - temp / 50000) : 350
    //   if (tempy < 400) {
    //     window.plus.device.beep(3)
    //   }
    //   if (xPosation < 500) {
    //     let p = {x: xPosation, y: tempy}
    //     points.push(p)
    //   } else {
    //     let p = {x: xPosation, y: tempy}
    //     points.push(p)
    //     let tempp = points.slice(1, points.length)
    //     for (let t = 0; t < tempp.length; t++) {
    //       tempp[t].x = t * 5
    //     }
    //     points = tempp
    //   }
    //   cxt.clearRect(0, 0, 1000, 1000)
    //   cxt.beginPath()
    //   cxt.strokeStyle = '#00ff0c'
    //   for (let i = 1; i < points.length; i++) {
    //     if (i % 2 === 0) {
    //       cxt.moveTo(points[i - 1].x, yInit * 2 - points[i - 1].y)
    //       cxt.lineTo(points[i].x, points[i].y)
    //       cxt.stroke()
    //     } else {
    //       cxt.moveTo(points[i - 1].x, points[i - 1].y)
    //       cxt.lineTo(points[i].x, yInit * 2 - points[i].y)
    //       cxt.stroke()
    //     }
    //   }
    //   cxt.closePath()
    // }
    // doing()
  }
}

</script>
<style lang="less" scoped>
    html{
        height: 100%;
        overflow-y:hidden;
    }
    body{
        margin: 0px;
        overflow: hidden;
        height: 100%;
        overflow-y:hidden;
    }
    #myCanvas{
        background-color: #000000;
        overflow:hidden;
        width: 100%;
        height: 100%;
        overflow-y:hidden;
    }
    .set-property{
      width:100%;
      height:100px;
      color:#ffffff;
      font-size:15px;
      overflow-y:hidden;
      position: fixed;
      background-color:rgba(75, 255, 0, 0.19);
      label{
        width:50px;
      }
      .le-te{
        width:90px;
        display: inline-block;
        text-align:center;
      }
    }
    input { font-size: 14px; font-weight: bold;  }
    input[type=range]{
      width:50%;
      margin-left:10px;
      margin-right:10px;
    }
    input[type=range]:before { content: attr(min); padding-right: 5px; }
    input[type=range]:after { content: attr(max); padding-left: 5px;}
    input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 25px;
    width: 25px;
    margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff; 
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
    box-shadow: 0 .125em .125em #3b4547; /*添加底部阴影*/
}
</style>
