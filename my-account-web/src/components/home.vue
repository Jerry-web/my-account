<template>
  <div class="home">
    <el-row>
           <el-col :span="8" style="padding-right: 6px" >
             <div  class="main-block" style="background-color:#4CADE9;">
               <div class="main-block-info" >
                 <i class="fa fa-credit-card" ></i>
                 <p class="fs16 margin-top-10" >账户余额</p>
               </div>
               <label class="main-block-money">￥{{accountBalance}}
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
               <label class="main-block-money">￥{{expendTotal}}
                 <span v-show="!expendTotal||expendTotal==0">0</span>
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
               <label class="main-block-money">￥{{incomeTotal}}
                 <span v-show="!incomeTotal||incomeTotal==0">0</span>
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

             <div style="display: inline-block;width: 620px" ng-show="">
               <div id="expendLine" style="width:620px;height:340px"></div>
             </div>
             <div style="display: inline-block;width: 350px" ng-show="">
               <div id="expendPie" style="width:350px;height:340px"></div>
             </div>

           </div><!--Widget Body-->
         </div>
       <div class="widget">
           <div class="widget-header" style="height: 45px">
             <span class="widget-caption fs16 success" style="line-height: 45px;font-weight: bold"><i class="fa fa-line-chart"></i> 本月收入统计</span>

           </div><!--Widget Header-->
           <div class="widget-body" style="height: 360px">

             <div style="display: inline-block;width: 620px" ng-show="">
               <div id="incomeLine" style="width:620px;height:340px"></div>
             </div>
             <div style="display: inline-block;width: 350px" ng-show="">
               <div id="incomePie" style="width:350px;height:340px"></div>
             </div>

           </div><!--Widget Body-->
         </div>

  </div>
</template>

<script>
  import vHeader from './header.vue';
  export default {
    data() {
      return {
        expendTotal:0,
        incomeTotal:0,
        accountBalance:0
      };
    },
    components: {
      vHeader
    },
    methods:{
      getChartsData:function (flow) {
          var vm=this;
       var params={
          search_range : {
            date_begin: vm.$moment().format('YYYY-MM'),
            date_end: vm.$moment().add('month', 1).format('YYYY-MM')
          },
          account_flow:flow,
          dateType:'month'
        }
        vm.$http({
          method: 'GET',
          url: vm.config.baseUrl + 'account/queryByMonthOrYear',
          params:{
            accountStr:params,
            pageStr:''
          }
        }).then(response => {
          var result=response.data;
          if(result.code==0){
            vm.expendList=result.accountList;
            if(result.accountList&&result.accountList.length>0) {
              vm.setChartLine(result.accountList, flow)
            }
            if(flow==0){
              vm.expendTotal=result.total;
            }else if(flow==1){
              vm.incomeTotal=result.total;
            }

            vm.accountTypeList=result.accountTypeList;
            if(result.accountTypeList&&result.accountTypeList.length>0){
              vm.setChartsPie(result.accountTypeList,flow);
            }


          }
        }, response => {
          vm.expendList=[]
        })

      },
      setChartsPie:function (optionData,flow) {
        if(optionData&&optionData.length>0) {
          var dataNames=[],optData=[];
          optionData.forEach(function (expend) {
            dataNames.push(expend.type_name);
            var svalue= {
              value: expend.type_sum,
              name: expend.type_name
            }
            optData.push(svalue);

          })
          let chartPie =null;
          var title='';
          if(flow==0) {
//            title='支出类型'
            chartPie = this.$echarts.init(document.getElementById('expendPie'))
          }else if(flow==1){
//            title='收入类型'
            chartPie = this.$echarts.init(document.getElementById('incomePie'))
          }
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            series: [
              {
                name: '类型支出',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: optData,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          chartPie.setOption(option)
        }
      },
      setChartLine:function (lineData,flow) {
          var vm=this,ytitle='';
        let chartLine =null;
        if(flow==0) {
          ytitle='支出金额';
          chartLine = this.$echarts.init(document.getElementById('expendLine'))
        }else if(flow==1){
          ytitle='收入金额';
          chartLine = this.$echarts.init(document.getElementById('incomeLine'))
        }

        var dataNames=[],optData=[];
        lineData.forEach(function (expend) {
          dataNames.push(vm.$moment(expend.account_date).format('M-D'));
          optData.push(expend.account_sum);
        })
        var option = {
          tooltip : {
            trigger: 'item',
            formatter:'{b} <br/>{a} : {c} 元'
          },
          xAxis: {
            name:'日期',
            type:"category",
            axisLabel:{
              interval:0,
              rotate:45
            },
            data:dataNames,
          },
          yAxis: {
            name:ytitle,
          },
          series:[{
            name:'金额',
            type:'line',
            barMaxWidth:50,
            data:optData,
            itemStyle: {
              normal: {
                color:'#2ec7c9',
              }
            }
          }]
        };
        chartLine.setOption(option)
      },
      getAccountBalance:function () {
          var vm=this;
        vm.$http({
          method: 'GET',
          url: vm.config.baseUrl + 'account/getAccountBalance'
        }).then(response => {
          var result=response.data;
          if(result.code==0){
              vm.accountBalance=result.accountBalance;
          }
        })
      }
    },
    mounted(){

      this.getChartsData(0);
      this.getChartsData(1);
      this.getAccountBalance();


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
