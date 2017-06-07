<template>
  <div class="header-body">
    <el-row>
      <el-col :span="17" class="header-title">MY ACCOUNT </el-col>
      <el-col :span="7" >
        <el-menu theme="dark" :default-active="activeIndex" style="float: right" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">概览</el-menu-item>
          <el-menu-item index="2">支出</el-menu-item>
          <el-menu-item index="3">收入</el-menu-item>
          <el-menu-item index="4">报表</el-menu-item>
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
        activeIndex: '1'

      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  .header-body{
    width: 1100px;
    margin: 0 auto;
  }
  .header-title{
    color: aliceblue;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
  .el-menu-item.is-active{
    border-bottom: 5px solid #20a0ff;
    font-size: 15px;
  }

</style>
