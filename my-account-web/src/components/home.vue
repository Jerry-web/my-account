<template>
  <div class="home">
    <el-row>
           <el-col :span="8" style="padding-right: 6px" >
             <div  class="main-block" style="background-color:#4CADE9;">
               <div class="main-block-info" >
                 <i class="fa fa-credit-card" ></i>
                 <p class="fs16 margin-top-10" >账户余额</p>
               </div>
               <label class="main-block-money">￥3040085.00
                 <span class="fs16">元</span>
               </label>

             </div>

           </el-col>
           <el-col :span="8" style="padding-right: 3px" >
             <div class="main-block " style="background-color: #F0BB4A;">
               <div class="main-block-info" >
                 <i class="fa fa-coffee" ></i>
                 <p class="fs16 margin-top-10" >本月支出</p>
               </div>
               <label class="main-block-money">￥4085.00
                 <span class="fs16">元</span>
               </label>
             </div>

           </el-col>
           <el-col :span="8" style="padding-left: 3px" >
             <div class="main-block" style="background-color: #87B54D;">
               <div class="main-block-info" >
                 <i class="fa fa-pagelines" ></i>
                 <p class="fs16 margin-top-10" >本月收入</p>
               </div>
               <label class="main-block-money">￥10085.00
                 <span class="fs16">元</span>
               </label>
             </div>
           </el-col>
         </el-row>
       <div class="widget margin-top-20">
           <div class="widget-header" style="height: 45px">
             <span class="widget-caption fs16 warning" style="line-height: 45px;"><i class="fa fa-bar-chart"></i> 本月支出统计</span>

           </div><!--Widget Header-->
           <div class="widget-body" style="height: 360px">

             <div id="myChart" style="width:600px;height:360px"></div>

           </div><!--Widget Body-->
         </div>
       <div class="widget">
           <div class="widget-header" style="height: 45px">
             <span class="widget-caption fs16 success" style="line-height: 45px;font-weight: bold"><i class="fa fa-line-chart"></i> 本月收入统计</span>

           </div><!--Widget Header-->
           <div class="widget-body" style="height: 260px">

             <p>
               暂无数据
             </p>

           </div><!--Widget Body-->
         </div>

  </div>
</template>

<script>
  import vHeader from './header.vue';
  export default {
    data() {
      return {
        activeIndex: '1',
        balance:'abcd'
      };
    },
    components: {
      vHeader
    },
    mounted(){
      let myChart = this.$echarts.init(document.getElementById('myChart'))
     var options = {
        title : {
          text: '某地区蒸发量和降水量',
          subtext: '纯属虚构'
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          data:['蒸发量','降水量']
        },
        toolbox: {
          show : true,
          feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name: '平均值'}
              ]
            }
          },
          {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
              data : [
                {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
              ]
            },
            markLine : {
              data : [
                {type : 'average', name : '平均值'}
              ]
            }
          }
        ]
      };
      myChart.setOption(options)
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
  .main-block {
    height: 120px;
    position: relative;
    padding: 20px
  }
 .main-block .main-block-info{
    text-align: center;
    width: 70px;
   color: #f5f2f2;
  }
  .main-block-info i{
    font-size: 55px;
    color: #e5fbb9;
  }
  .main-block-money {
    position: absolute;
    right: 20px;
    top: 35px;
    font-size: 30px;
    color: white
  }

</style>
