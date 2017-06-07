<template>
  <div class="index">

    <div class="header">
      <v-header></v-header>
    </div>
    <div class="line"></div>
    <div style="margin:60px auto;width: 1100px">

        <el-row class="" style="margin-top: 70px">
          <el-col :span="8" style="padding-right: 6px" >
            <div class="bg-azure" style="height: 120px;">

            </div>

          </el-col>
          <el-col :span="8" style="padding-right: 3px" >
            <div class="bg-palegreen" style="height: 120px;">

            </div>

          </el-col>
          <el-col :span="8" style="padding-left: 3px" >
            <div class="bg-orange" style="background-color: #8a6d3b;height: 120px;">

            </div>
          </el-col>
        </el-row>
      <div class="margin-top-20">
        <div class="widget">
          <div class="widget-header" style="height: 45px">
            <span class="widget-caption fs16 warning" style="line-height: 45px;">本月支出统计</span>

          </div><!--Widget Header-->
          <div class="widget-body" style="height: 260px">

            <p>
              暂无数据
            </p>

          </div><!--Widget Body-->
        </div><!--Widget-->
      </div>
      <div >
        <div class="widget">
          <div class="widget-header" style="height: 45px">
            <span class="widget-caption fs16 success" style="line-height: 45px;font-weight: bold">本月收入统计</span>

          </div><!--Widget Header-->
          <div class="widget-body" style="height: 260px">

            <p>
              暂无数据
            </p>

          </div><!--Widget Body-->
        </div><!--Widget-->
      </div>




    </div>

  </div>
</template>

<script>
  import vHeader from '../index/header.vue';
  export default {
    data() {
      return {
        activeIndex: '1',
        balance:'abcd'
      };
    },
    components: {
      vHeader
    }
  }
</script>
<style>
  .header{
    position: fixed;
    top:0;
    width: 100%;
    background-color: #324157;
    z-index: 10000;
  }

</style>
