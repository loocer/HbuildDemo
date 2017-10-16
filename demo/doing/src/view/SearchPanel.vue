<template>
  <div class="my-page">
    <page-header>
      <header-title>显示屏</header-title>
      <header-link>设置</header-link>
    </page-header>
    <page-content>
      <div class="set-property">
        <p>
          <span class="le-te">清空</span> <span>暂停</span>
        </p>
        <p>
          <span class="le-te">最大</span> <span>最小</span>
        </p>
      </div>
      
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
  },
  methods: {
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
      height:100px;
      text-align: center;
      color:black;
      font-size:15px;
      overflow-y:hidden;
      position: fixed;
      background-color:rgba(75, 255, 0, 0.19);
      span{
        width:90px;
        margin-left: 50px;
        margin-right: 50px;
        text-align:center;
        padding:0 10px;
      }
    }
    .set-property{
      width: 100%;
      height:300px;
      background-color: #ffffff;
    }
</style>
