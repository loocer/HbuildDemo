<template>
  <div class="fdsds">
    <page-header>
      <header-title>显示屏</header-title>
      <header-link>设置</header-link>
    </page-header>
    <page-content>
      <div class="set-property">
        <p>
          <button type="button" class="btn btn-primary" v-on:click="positions=[]">清空</button>
          <button v-if="getFlag" type="button" v-on:click="getingDate(false)" class="btn btn-info">开始</button>
          <button v-if="!getFlag" type="button" v-on:click="getingDate(true)" class="btn btn-danger">暂停</button>
        </p>
        <p>
          <button type="button" class="btn btn-info">最大</button> <button type="button" class="btn btn-info">最小</button>
        </p>
      </div>
      <div id="main-table">
        <list-item >
           <div class="fuck-td"  v-for="val in positions"><span>------------------{{val}}</span></div>
        </list-item>
      </div>
     
    </page-content>
  </div>
</template>
<script>
import $ from '../assets/js/jquery.min.js'
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
export default {
  components: {
    'page-header': Header,
    HeaderLink,
    List,
    ListItem,
    HeaderTitle,
    'page-content': Content
  },
  data () {
    return {
      getFlag: true,
      positions: [32, 32, 434, 4, 34, 545, 3, 443]
    }
  },
  mounted () {
    this.getPosation()
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
    #main-table{
      overflow-y: auto;
      height:calc(~"100% - 160px");
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
