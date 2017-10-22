<template>
  <div class="fdsds">
    <page-header>
      <header-title>预警响应设置</header-title>
      <header-link></header-link>
    </page-header>
    <page-content>
      <div class="set-property">
        <p>
          <div class="le-te pull-left">报警频率：</div> <span>0</span><input type="range" v-model="senVal" name="range"   step="1" value="" /><span>100</span>
          <p><span >{{senVal}}</span></p>
        </p>
        <p>
          <div class="le-te pull-left">是否轰鸣声报警：</div> <switcher></switcher>
        </p>
         <p>
          <div class="le-te pull-left">是否记录：</div> <switcher></switcher>
        </p>
        <p>
          <button type="button" class="btn btn-default">开启</button> <button type="button" class="btn btn-info">关闭</button>
        </p>
      </div>
    </page-content>
  </div>
</template>
<script>
import $ from '../assets/js/jquery.min.js'
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Switcher from '../components/switcher'
export default {
  components: {
    'page-header': Header,
    HeaderLink,
    List,
    ListItem,
    HeaderTitle,
    Switcher,
    'page-content': Content
  },
  data () {
    return {
      getFlag: true,
      positions: [32, 32, 434, 4, 34, 545, 3, 443]
    }
  },
  mounted () {
    // window.setInterval(() => {
    //   window.plus.device.beep(3)
    // }, 1000)
    document.addEventListener('plusready', onPlusReady, false)
    function onPlusReady () {
      document.addEventListener('background', onAppBackground, false)
    }
    function onAppBackground () {
      window.setInterval(() => {
        window.plus.device.beep(3)
      }, 1000)
    }
    // document.addEventListener('background', () => {
    //   window.plus.device.beep(3)
    // }, false)
    // this.getPosation()
  },
  methods: {
    getingDate (flag) {
      this.getFlag = flag
    },
    getPosation () {
      var tempfoo = this
      var tempPosations = [1.323, 3.43434, 5.65656]
      window.plus.accelerometer.watchAcceleration(function (a) {
        var t = getMainValue(a)
        if (!tempfoo.getFlag) {
          tempfoo.positions.push(t)
          $('#main-table').scrollTop(100 * tempfoo.positions.length)
        }
      }, function (e) {
        window.alert('Acceleration error: ' + e.message)
      }, {frequency: 1})
      function getMainValue (a) {
        var y = Math.floor(a.yAxis * 100000000)
        var x = Math.floor(a.xAxis * 100000000)
        var z = Math.floor(a.zAxis * 100000000)
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
      height:100%;
      text-align: center;
      color:black;
      font-size:15px;
      overflow-y:hidden;
      padding: 0 20px;
      background-color:rgba(75, 255, 0, 0.19);
      p{
        margin:20px 0;
      }
      span{
        width:90px;
        margin-left: 10px;
        margin-right: 10px;
        text-align:center;
        padding:0 10px;
      }
      button{
        width: 30%;
        margin: 5px 10px;
      }
      input{
        width:40%;
      }
    }
    #main-table{
      overflow-y: auto;
      height:calc(~"100% - 300px");
      pdding:100px;
      .fuck-td{
        margin:20px 0;
        width:100%;
        text-align: center;
      }
      li{
        list-style:none;
      }
    }
</style>
