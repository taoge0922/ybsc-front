<template>
  <el-container style="width: 100%">
    <el-header :height="header_w">
      <div class="head_title" style="margin-right: 10px;">{{title}}</div>
      <div class="meau-item" :class="{active:menus[0]}" @click="menuClick(0)">
        延保模板维护
      </div>
      <div class="meau-item" :class="{active:menus[1]}" @click="menuClick(1)">
        延保商品维护
      </div>
      <div class="meau-item" :class="{active:menus[2]}" @click="menuClick(2)">
        延保购买
      </div>
      <div style="position: absolute;top: 10px;right: 10px;width: 240px;height: 20px;display: flex;align-items: center;justify-content: center;">
        <span style="color: white;"><i class="el-icon-user-solid" >欢迎您：周凯利</i></span>
      </div>
    </el-header>
    <el-main :style="{height: main_w}" class="el_main"><router-view></router-view></el-main>
    <el-footer :height="footer_w">copy right@周凯利</el-footer>
  </el-container>

</template>

<script>

  import Bus from '../../bus';
  export default {
    name: "Home",
    created(){
      this.title = this.baseConfig.appTitle;
    },
    mounted(){
      let _this = this;
      window.onresize = function(){ // 定义窗口大小变更通知事件
        _this.main_w = document.documentElement.clientHeight-100+'px';
      };
    },
    computed: {
    },
    methods: {
      menuClick(index){
        index = index*1;
        let show = this.menus[index];
        if(!show){
          this.menus = [false,false,false];
          this.menus[index] = true;
          this.$router.push({path:this.mes[index]});
        }
      }
    },
    data() {
      return {
        header_w:'40px',
        main_w:document.documentElement.clientHeight-80+'px',
        footer_w:'40px',
        title:'',
        menus:[true,false,false],
        mes:['/Home/ybmb','/Home/ybsp','/Home/ybmb']
      }
    }
  }
</script>

<style>

  .container {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
  }

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .head_title{
    margin-left: 10px;
    font-size: 25px;
    color: white;
  }
  .el-footer{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: white;
  }

  .el_main{
    padding: 0px;
  }

  .meau-item:hover{
    color: white;
  }

  .meau-item{
    border-top-left-radius:10px;
    width: 150px;
    border-top-right-radius:10px;
    text-align: center;
    cursor: pointer;
  }
  .active{
    background-color: lightgrey;
    color: white;
  }
  .meau-item :hover{
    background-color: black;
    color: white;
  }

  .con_main{
    width: 99%;
    height: 99%;
    margin-left: 8px;
    margin-top: 5px;
    box-sizing:border-box;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: white;
  }
  .con_sear{
    width: 100%;
    padding-left: 14px;
    padding-top: 10px;
    box-sizing:border-box;
    border-bottom: 4px solid lightgrey;
  }

  .con_breadcrumb{
    height: 30px;
    padding-left: 10px;
    border-bottom: 4px solid lightgrey;
    border-left: 4px solid darkgreen;
    border-top: 4px solid white;
    box-sizing:border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .con_tool{
    margin-left: 14px;
    margin-top: 10px;
  }
  .con_container{
    margin-left: 14px;
    margin-top: 10px;
    width: 98%;
  }
  .simpleDrawer .el-drawer__header{
    margin-bottom: 0px;
    border-bottom: 1px solid gainsboro;
    padding:10px 10px;
    font-weight: bold;
    font-size: 13px;
    color: black;
  }

  .simpleDrawer .simpleTab .el-tabs__nav-scroll{
    background-color: ghostwhite;
  }

  .simpleDrawer .simpleTab .el-tabs__item{
    font-size: 13px;
  }
</style>
