<template>
  <div class="my-page">
    <page-header>
      <header-title>显示屏</header-title>
      <header-link>设置</header-link>
    </page-header>
    <page-content>
      <div class="set-property">
        <input type="range" value="0">
        <MintRange v-model="val" :end-func="endFn"></MintRange>
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
import MintRange from 'vue-range'
export default {
  components: {
    'page-header': Header,
    HeaderLink,
    HeaderTitle,
    MintRange,
    'page-content': Content
  },
  data () {
    return {
      getVibration: {
        range: 20
      }
    }
  },
  mounted () {
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
    var time = 0
    var yInit = 500
    // var lastPoint = {x:0, y:200}
    var points = []
    function doing () {
      document.addEventListener('plusready', function () {
        // 扩展API加载完毕，现在可以正常调用扩展API
        // var tempPosations = [1.323,3.43434,5.65656]
        window.plus.accelerometer.watchAcceleration(function (a) {
          time++
          if (time % 2 === 0) {
            mainfoo(a)
          }
        }, function (e) {
          window.alert('Acceleration error: ' + e.message)
        }, {frequency: 2})
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
      var tempy = yInit * (1 - temp / 50000) > 350 ? yInit * (1 - temp / 50000) : 350
      if (tempy < 400) {
        window.plus.device.beep(3)
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
}

</script>
<style lang="less" scoped>
    html{
        height: 100%;
    }
    body{
        margin: 0px;
        overflow: hidden;
        height: 100%;
    }
    #myCanvas{
        background-color: #000000;
        overflow:hidden;
        width: 100%;
        height: 100%;
    }
    .set-property{
      width: 100%;
      height:300px;
      background-color: #ffffff;
    }
</style>
