<template>
  <div class="header-body">
    <el-row>
      <el-col :span="17" class="header-title">ACCOUNT BOOK </el-col>
      <el-col :span="7" >
        <el-menu theme="dark" :default-active="activeIndex" router style="float: right" class="el-menu-demo" mode="horizontal" >
          <el-menu-item index="/index/home">概览</el-menu-item>
          <el-menu-item index="/index/expend">支出</el-menu-item>
          <el-menu-item index="/index/income">收入</el-menu-item>
          <el-menu-item index="/index/account">账户</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <div class="line"></div>

  </div>
</template>

<script>
  export default {
    name: 'v-header',
    data() {
      return {
        activeIndex: this.$route.path

      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
    }
  }
</script>
<style>
  .header-body{
    width: 1000px;
    margin: 0 auto;
  }
  .header-title{
    color: aliceblue;
    height: 60px;
    line-height: 60px;
    font-size: 23px;
  }
  .el-menu-item.is-active{
    border-bottom: 5px solid #20a0ff;
    font-size: 15px;
  }

</style>
