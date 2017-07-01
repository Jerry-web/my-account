<template>
  <div class="header-body">
    <el-row>
      <el-col :span="12" class="header-title">ACCOUNT BOOK </el-col>
      <el-col :span="12" >
        <label  class=" hearder-info" style="">{{loginUser.user_name}} | <a class="warning hearder-logout" @click="logout()">注销</a></label>
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
        loginUser:JSON.parse(localStorage.getItem('user')),
        activeIndex: this.$route.path

      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout:function () {
        this.$http.get(
          this.config.baseUrl+'user/logout').then(response => {
          var result=response.data;
          if(result.code==0){
            this.$router.push('/login');
          }
        })
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
  .hearder-info {
    float: right;
    height: 55px;
    line-height: 60px;
    margin-left:10px;
    font-size: 15px;
    color: white;
  }
  .hearder-logout{
    cursor: pointer;
  }

</style>
