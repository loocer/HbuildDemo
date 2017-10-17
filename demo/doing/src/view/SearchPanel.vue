<template>
  <div class="my-page">
    <page-header>
      <header-title>显示屏</header-title>
      <header-link>设置</header-link>
    </page-header>
    <page-content>
      <div class="set-property">
        <p>
          <button type="button" class="btn btn-primary">清空</button>
          <button v-if="getFlag" type="button" v-on:click="getingDate" class="btn btn-info">开始</button>
          <button v-if="!getFlag" type="button" v-on:click="getFlag=!getFlag" class="btn btn-danger">暂停</button>
        </p>
        <p>
          <button type="button" class="btn btn-info">最大</button> <button type="button" class="btn btn-info">最小</button>
        </p>
      </div>
      <table class="table">
        <caption>最强震动变化值为1000000</caption>
         <!-- <thead>
            <tr>
               <th>名称</th>
               <th>城市</th>
            </tr>
         </thead> -->
         <tbody>
            <tr v-for="val in positions">
               <td>{{val}}</td>
            </tr>
         </tbody>
      </table>
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
      getFlag: true,
      positions: []
    }
  },
  mounted () {
    this.getPosation()
  },
  methods: {
    getingDate () {
      this.getFlag = false
    },
    getPosation () {
      var tempfoo = this
      var tempPosations = [1.323, 3.43434, 5.65656]
      function doing () {
        window.alert(3)
        document.addEventListener('plusready', function () {
          window.plus.accelerometer.watchAcceleration(function (a) {
            window.alert(3)
            var t = getMainValue(a)
            if (!tempfoo.getFlag) {
              tempfoo.positions.push(t)
            }
          }, function (e) {
            window.alert('Acceleration error: ' + e.message)
          }, {frequency: 1000})
        }, false)
      }
      function getMainValue (a) {
        var y = Math.floor(a.yAxis * 1000000)
        var x = Math.floor(a.xAxis * 1000000)
        var z = Math.floor(a.zAxis * 1000000)
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
        return temp
      }
      doing()
    },
    getMainValue () {
    }
  },
  watch: {
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
    .set-property{
      width:100%;
      height:90px;
      text-align: center;
      color:black;
      font-size:15px;
      overflow-y:hidden;
      background-color:rgba(75, 255, 0, 0.19);
      span{
        width:90px;
        margin-left: 50px;
        margin-right: 50px;
        text-align:center;
        padding:0 10px;
      }
      button{
        width: 30%;
        margin: 5px 10px;
      }
    }
</style>
