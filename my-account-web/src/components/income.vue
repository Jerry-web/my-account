<template>
  <div >
    <el-row class="margin-bottom-20">
      <el-col :span="12"><h1 class="no-margin-top fs35">收入信息<span class="fs16 margin-left-10 success">( 共计收入：{{accountTotal}} 元 )</span></h1></el-col>
      <el-col :span="12" class="text-right">
        <el-radio-group v-model="expendModel" size="large" change="modelChange">
          <el-radio-button label="day">日</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="margin-bottom-10 block" style="padding: 10px;background: #dedede;">

      <el-date-picker v-show="expendModel=='day'"
                      v-model="searchInfo.date_range"
                      type="daterange"
                      placeholder="选择日期范围查询">
      </el-date-picker>
      <el-date-picker v-show="expendModel=='month'"
                      v-model="searchInfo.date_month"
                      type="month"
                      placeholder="选择月份">
      </el-date-picker>
      <el-date-picker v-show="expendModel=='year'"
                      v-model="searchInfo.date_year"
                      type="year"
                      placeholder="选择年份">
      </el-date-picker>

      <el-select v-model="searchInfo.type_id" clearable filterable placeholder="选择类型查询">
        <el-option
          v-for="type in typeList"
          :key="type.type_id"
          :label="type.type_name"
          :value="type.type_id">
        </el-option>
      </el-select>
      <el-select v-model="searchInfo.member_id" clearable filterable placeholder="选择收入成员查询">
        <el-option
          v-for="member in memberList"
          :key="member.member_id"
          :label="member.member_name"
          :value="member.member_id">
        </el-option>
      </el-select>
      <el-button type="success" class="floatright fs15"  icon="plus" @click="expendFormOpen">新增收入</el-button>

    </div>

    <div v-if="expendModel=='day'">
      <el-table
        :data="expendList"
        border
        style="width: 100%">
        <el-table-column
          prop="account_date"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="account_sum"
          label="金额（元）">
        </el-table-column>
        <el-table-column
          prop="member_name"
          label="收入成员">
        </el-table-column>
      </el-table>
      <div class="text-right margin-top-5" v-show="currentPageParams.totalResult>0">
        <label class="floatleft fs15 margin-top-5">共计收入：<span class="fs18" style="font-weight: bold">{{accountTotal}} 元</span></label>
        <el-pagination class="no-padding-right"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPageParams.currentPage"
                       :page-size="currentPageParams.showCount"
                       layout="total, prev, pager, next"
                       :total="currentPageParams.totalResult">
        </el-pagination>
      </div>
    </div>
    <div v-if="expendModel=='month'||expendModel=='year'" class="widget margin-top-10" >
      <div class="widget-body" style="min-height: 360px">
        <div style="display: inline-block;width: 650px" ng-show="">
          <div id="chartLine" style="width:650px;height:360px"></div>
        </div>
        <div class=" margin-top-10 margin-bottom-10" style="width:300px;display: inline-block;vertical-align: top">
          <el-table
            :data="monthYearExpendList"
            border
            style="width: 100%">
            <el-table-column
              prop="account_date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="account_sum"
              label="收入金额（元）">
            </el-table-column>
          </el-table>
          <div class="text-right margin-top-5" v-show="currentPageParams.totalResult>0">
            <el-pagination class="no-padding-right"
                           @current-change="handleMonthChange"
                           :current-page.sync="currentPageParams.currentPage"
                           :page-size="currentPageParams.showCount"
                           layout="total, prev, pager, next"
                           :total="currentPageParams.totalResult">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="widget margin-top-10 " v-show="accountTypeList&&accountTypeList.length>0">
      <div class="widget-body" style="height: 360px">
        <div style="display: inline-block;width: 650px" ng-show="">
          <div id="myChart" style="width:600px;height:360px"></div>
        </div>
        <div class=" margin-top-10 margin-bottom-10" style="width:300px;display: inline-block;vertical-align: top">
          <el-table
            :data="accountTypeList"
            border
            style="width: 100%">
            <el-table-column
              prop="type_name"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="type_sum"
              label="收入金额（元）">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>





    <el-dialog class="add-expend" title="新增收入" v-model="expendFormVisible" :close-on-click-modal="false" >
      <el-form :model="expendForm" label-width="80px"  ref="editForm" >
        <el-form-item label="收入时间" prop="name" >
          <el-date-picker type="date" placeholder="选择日期"  v-model="expendForm.account_date"></el-date-picker>

        </el-form-item>
        <el-form-item label="收入类型">
          <el-select v-model="expendForm.type_id" filterable placeholder="选择类型查询">
            <el-option
              v-for="type in typeList"
              :key="type.type_id"
              :label="type.type_name"
              :value="type.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额">
          <el-input type='number' style="width: 220px" placeholder="请填写收入金额" v-model="expendForm.account_sum">
          </el-input>
        </el-form-item>
        <el-form-item label="收入成员">
          <el-select v-model="expendForm.member_id" filterable placeholder="选择成员查询">
            <el-option
              v-for="member in memberList"
              :key="member.member_id"
              :label="member.member_name"
              :value="member.member_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="expendFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="expendSubmit" >提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        searchInfo:{
          date_range:[this.$moment(new Date()).subtract(7,'days'), new Date()],
          date_month:new Date(),
          date_year:new Date(),
          type_id:null,
          member_id:null,
          account_flow:1
        },
        expendModel:'day',
        expendFormVisible:false,
        addLoading: false,
        accountTotal:0,
        memberList:[],
        typeList:[],
        expendList:[],
        monthYearExpendList:[],
        accountTypeList:[],
        expendForm:{
          account_date:null,
          type_id:null,
          account_sum:null,
          member_id:null,
        },
        currentPageParams:{
          currentPage:1,
          showCount:10,
          totalResult:0
        }
      };
    },
    methods:{
      getMemberList:function () {
        this.$http.get(
          this.config.baseUrl+'member/queryAll'
        ).then(response => {
          var result=response.data;
          if(result.code==0){
            this.memberList=result.memberList
          }
        }, response => {
          this.memberList=[]
        })
      },
      getTypeList:function () {
        this.$http.get(
          this.config.baseUrl+'type/queryByFlow',{
            params:{
              type_flow:'1'
            }
          }
        ).then(response => {
          var result=response.data;
          if(result.code==0){
            this.typeList=result.typeList
          }
        }, response => {
          this.typeList=[]
        })
      },
      getExpendList:function () {
        var vm=this,dateRange=null,url='account/queryByMonthOrYear';

        if(vm.expendModel=='day'){
          url='account/queryAll'
          dateRange=vm.searchInfo.date_range;
        }else if(vm.expendModel=='month'){
          dateRange=vm.searchInfo.date_month;
          vm.searchInfo.dateType='month'
        }else if(vm.expendModel=='year') {
          dateRange = vm.searchInfo.date_year;
          vm.searchInfo.dateType='year'
        }

        vm.searchInfo.search_range=null;
        if(dateRange&&dateRange.toString().length>0) {
          if(vm.expendModel=='day'){
            if (dateRange[0] != null && dateRange[1] != null) {
              vm.searchInfo.search_range = {
                date_begin: vm.$moment(dateRange[0]).format('YYYY-MM-DD'),
                date_end: vm.$moment(dateRange[1]).add('day', 1).format('YYYY-MM-DD')
              }
            }
          }else if(vm.expendModel=='month'){
            vm.currentPageParams='';
            vm.searchInfo.search_range = {
              date_begin: vm.$moment(dateRange).format('YYYY-MM'),
              date_end: vm.$moment(dateRange).add('month', 1).format('YYYY-MM')
            }
          }else if(vm.expendModel=='year') {
            vm.currentPageParams='';
            vm.searchInfo.search_range = {
              date_begin: vm.$moment(dateRange).format('YYYY'),
              date_end: vm.$moment(dateRange).add('year', 1).format('YYYY')
            }
          }
        }

        vm.$http({
          method: 'GET',
          url: vm.config.baseUrl + url,
          params:{
            accountStr:vm.searchInfo,
            pageStr:vm.currentPageParams
          }
        }).then(response => {
          var result=response.data;
          if(result.code==0){
            if(vm.expendModel=='day'){
              if(result.accountList&&result.accountList.length>0){
                result.accountList.forEach(function (expend) {
                  expend.account_date=vm.$moment(expend.account_date).format('YYYY-MM-DD')
                })
              }
            }

            vm.expendList=result.accountList;
            vm.currentPageParams=result.page;
            vm.accountTotal=result.total;
            vm.accountTypeList=result.accountTypeList;
            vm.setChartsPie(result.accountTypeList);
            if(vm.expendModel!='day'){
              vm.setChartLine(result.accountList);
            }
            if(vm.expendModel=='month'){
              if(result.accountList&&result.accountList.length>0){
                vm.currentPageParams={
                  currentPage:1,
                  showCount:10,
                  totalResult:result.accountList.length
                }
                if(result.accountList.length<=10){
                  vm.monthYearExpendList=result.accountList;
                }else {
                  vm.monthYearExpendList=result.accountList.slice(0,10);
                }
              }else {
                vm.monthYearExpendList=[];
              }
            }else {
              vm.monthYearExpendList=result.accountList;
            }

          }
        }, response => {
          vm.expendList=[]
        })
      },
      expendFormOpen:function () {
        this.expendFormVisible = true;
        this.expendForm= {
          account_date: this.$moment().format('YYYY-MM-DD'),
          type_id: null,
          account_sum: null,
          member_id: null
        }
      },
      expendSubmit:function () {
        var e=this;
        var expendInfo=this.expendForm;
        expendInfo.account_flow=1;
        expendInfo.user_id=1;
        expendInfo.account_date=e.$moment(expendInfo.account_date).format('YYYY-MM-DD')
        e.$http({
          method:'GET',
          url:this.config.baseUrl+'account/addAccount',
          params:expendInfo
        }).then(function(data){
          var result=data.data;
          var response=result.code;
          if(response==0){
            e.expendFormVisible=false;
            e.$message({message: '提交成功！！', type: 'success'});
            e.getExpendList()
          }else {
            e.$message.error( '提交失败！！');
          }
        })
      },
      setChartsPie:function (optionData) {
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

          let myChart = this.$echarts.init(document.getElementById('myChart'))
          var option = {
            title: {
              text: '收入类型统计',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} 元 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: dataNames
            },
            series: [
              {
                name: '类型收入',
                type: 'pie',
                radius: '60%',
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
          myChart.setOption(option)
        }
      },
      setChartLine:function (lineData) {
          var vm=this;
        let chartLine = vm.$echarts.init(document.getElementById('chartLine'))
        var dataNames=[],optData=[],chartType='line';
        if(vm.expendModel=='year'){
          chartType='bar';
        }
        lineData.forEach(function (expend) {

          if(vm.expendModel=='year'){
            dataNames.push(expend.account_date);
          }else  if(vm.expendModel=='month'){
            dataNames.push(vm.$moment(expend.account_date).format('M-D'));
          }
          optData.push(expend.account_sum);
        })
        var option = {
          title:{
            text:'收入金额统计',
            x: 'center'
          },
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
            name:'收入金额',
          },
          series:[{
            name:'金额',
            type:chartType,
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
      handleCurrentChange(val) {
        this.currentPageParams.currentPage=val;
        this.getExpendList()
      },
      handleMonthChange(val){
        this.currentPageParams.currentPage=val;
        this.monthYearExpendList=this.expendList.slice((val-1)*10,val*10)
      }
    },
    watch:{
      searchInfo: {
        handler: function (val, oldVal) {
          this.getExpendList();
        },
        deep: true
      },
      expendModel:function (val) {
        this.currentPageParams= {
          currentPage: 1,
          showCount: 10,
          totalResult: 0
        }
        this.searchInfo= {
          date_range: [this.$moment(new Date()).subtract(7,'days'), new Date()],
          date_month: this.$moment().format('YYYY-MM'),
          date_year:  this.$moment().format('YYYY'),
          type_id: null,
          member_id: null,
          account_flow:1
        }

      }

    },
    mounted(){

      this.getMemberList();
      this.getTypeList();
      this.getExpendList();


    }
  }
</script>
<style>
  .add-expend .el-dialog{
    width: 420px;
  }
</style>

