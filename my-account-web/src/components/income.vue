<template>
  <div >
    <el-row class="margin-bottom-20">
      <el-col :span="12"><h1 class="no-margin-top fs35">收入信息<span class="fs16 margin-left-10 success">( 共计收入：{{accountTotal}} 元 )</span></h1></el-col>
      <el-col :span="12" class="text-right">
        <el-radio-group v-model="incomedModel" size="large" change="modelChange">
          <el-radio-button label="day">日</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
          <el-radio-button label="year">年</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class=" block" style="padding: 10px;background: #dedede;">

      <el-date-picker v-show="incomedModel=='day'"
                      v-model="searchInfo.date_range"
                      type="daterange"
                      placeholder="选择日期范围查询">
      </el-date-picker>
      <el-date-picker v-show="incomedModel=='month'"
                      v-model="searchInfo.date_month"
                      type="month"
                      placeholder="选择月份">
      </el-date-picker>
      <el-date-picker v-show="incomedModel=='year'"
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
      <el-button type="success" v-show="!addIncomeFormVisible" class="floatright fs15"  icon="plus" @click="incomeFormOpen">新增收入</el-button>
      <el-button type="warning" v-show="addIncomeFormVisible" class="floatright fs15"  icon="close" @click="addIncomeFormVisible=!addIncomeFormVisible">取消新增</el-button>
    </div>
    <div v-show="addIncomeFormVisible" style="border: 1px solid #d5d5d5;padding:20px 10px 0 10px">
      <el-form :model="incomeForm" label-width="80px" :rules="incomeRules" :inline="true"  ref="incomeForm" >
        <el-form-item label="收入日期" prop="account_date" class="margin-bottom-10">
          <el-date-picker type="date" placeholder="选择日期"  v-model="incomeForm.account_date"></el-date-picker>
        </el-form-item>
        <el-form-item label="收入类型" prop="type_id" class="margin-bottom-10">
          <el-select v-model="incomeForm.type_id" filterable placeholder="选择类型查询">
            <el-option
              v-for="type in typeList"
              :key="type.type_id"
              :label="type.type_name"
              :value="type.type_id">
            </el-option>
          </el-select>
          <el-button @click="typeFormOpen" style="margin-left:-5px;border-bottom-left-radius: 0;border-top-left-radius: 0" class="padding-left-10 padding-right-10 "  icon="plus"></el-button>
        </el-form-item>

        <el-form-item label="收入成员" class="no-margin-bottom">
          <el-select v-model="incomeForm.member_id"  filterable placeholder="选择成员查询">
            <el-option
              v-for="member in memberList"
              :key="member.member_id"
              :label="member.member_name"
              :value="member.member_id">
            </el-option>
          </el-select>
          <el-button @click="memberFormOpen" style="margin-left:-5px;border-bottom-left-radius: 0;border-top-left-radius: 0" class="padding-left-10 padding-right-10 "  icon="plus"></el-button>
        </el-form-item>
        <el-form-item label="收入金额" prop="account_sum" class="margin-bottom-10">
          <el-input type='number' style="width: 194px" placeholder="请填写支出金额" v-model="incomeForm.account_sum">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click.native="incomeSubmit" class="margin-left-10">提交收入</el-button>
          <!--<el-button @click.native="addExpendFormVisible = false">取消</el-button>-->
        </el-form-item>
      </el-form>

    </div>
    <div v-if="incomedModel=='day'" class="margin-top-20">
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
      <div class="text-right margin-top-5" v-if="currentPageParams.totalResult>0">
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
    <div v-if="incomedModel=='month'||incomedModel=='year'" class="widget margin-top-20" >
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
          <div class="text-right margin-top-5" v-if="currentPageParams.totalResult>0">
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
      <div class="widget-body" style="min-height: 360px">
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





    <!--<el-dialog class="add-expend" title="新增收入" v-model="incomeFormVisible" :close-on-click-modal="false" >
      <el-form :model="incomeForm" label-width="80px"  ref="editForm" >
        <el-form-item label="收入时间" prop="name" >
          <el-date-picker type="date" placeholder="选择日期"  v-model="incomeForm.account_date"></el-date-picker>

        </el-form-item>
        <el-form-item label="收入类型">
          <el-select v-model="incomeForm.type_id" filterable placeholder="选择类型查询">
            <el-option
              v-for="type in typeList"
              :key="type.type_id"
              :label="type.type_name"
              :value="type.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入金额">
          <el-input type='number' style="width: 220px" placeholder="请填写收入金额" v-model="incomeForm.account_sum">
          </el-input>
        </el-form-item>
        <el-form-item label="收入成员">
          <el-select v-model="incomeForm.member_id" filterable placeholder="选择成员查询">
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
        <el-button @click.native="incomeFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="expendSubmit" >提交</el-button>
      </div>
    </el-dialog>-->
    <el-dialog class="add-type" title="新增类型" v-model="typeFormVisible" :close-on-click-modal="false"  >
      <el-form :model="typeForm" :rules="typeRules" label-width="80px"  ref="typeForm" >
        <el-form-item label="支出类型" prop="type_name">
          <el-input style="width: 260px" placeholder="请填写支出类型" v-model="typeForm.type_name">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="typeFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="typeSubmit" >提交</el-button>
      </div>
    </el-dialog>
    <el-dialog class="add-member" title="新增成员" v-model="memberFormVisible" :close-on-click-modal="false"  >
      <el-form :model="memberForm" :rules="memberRules" label-width="80px"  ref="memberForm" >
        <el-form-item label="支出成员" prop="member_name">
          <el-input style="width: 260px" placeholder="请填写支出成员" v-model="memberForm.member_name">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="memberFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="memberSubmit" >提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        searchInfo:{
          date_range:[this.$moment(new Date()).format('YYYY-MM'), new Date()],
          date_month:new Date(),
          date_year:new Date(),
          type_id:null,
          member_id:null,
          account_flow:1
        },
        incomedModel:'day',
        incomeFormVisible:false,
        addIncomeFormVisible:false,
        typeFormVisible:false,
        memberFormVisible:false,
        addLoading: false,
        accountTotal:0,
        memberList:[],
        typeList:[],
        expendList:[],
        monthYearExpendList:[],
        accountTypeList:[],
        incomeForm:{
          account_date:null,
          type_id:null,
          account_sum:null,
          member_id:null,
        },
        incomeRules:{
          account_date:[
            {  required: true, message: '请选择日期', trigger: 'change' }
          ],
          type_id:[
            { type:'number',required: true, message: '请选择收入类型', trigger: 'change' }
          ],
          account_sum:[
            { required: true, message: '请输入收入金额', trigger: 'change' },
          ]
        },
        typeForm:{
          type_name:'',
          type_flow:0
        },
        memberForm:{
          member_name:''
        },
        typeRules: {
          type_name: [
            {required: true, message: '请填写类型名称', trigger: 'change'},
          ]
        },
        memberRules: {
          member_name: [
            {required: true, message: '请填写成员名称', trigger: 'change'},
          ]
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
          this.config.baseUrl+'member/queryAll',
          {
            params:{
              memberStr:{
                user_id:1
              },
              pageStr:''
            }
          }
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
      getIncomeList:function () {
        var vm=this,dateRange=null,url='account/queryByMonthOrYear';

        if(vm.incomedModel=='day'){
          url='account/queryAll'
          dateRange=vm.searchInfo.date_range;
        }else if(vm.incomedModel=='month'){
          dateRange=vm.searchInfo.date_month;
          vm.searchInfo.dateType='month'
        }else if(vm.incomedModel=='year') {
          dateRange = vm.searchInfo.date_year;
          vm.searchInfo.dateType='year'
        }

        vm.searchInfo.search_range=null;
        if(dateRange&&dateRange.toString().length>0) {
          if(vm.incomedModel=='day'){
            if (dateRange[0] != null && dateRange[1] != null) {
              vm.searchInfo.search_range = {
                date_begin: vm.$moment(dateRange[0]).format('YYYY-MM-DD'),
                date_end: vm.$moment(dateRange[1]).add('day', 1).format('YYYY-MM-DD')
              }
            }
          }else if(vm.incomedModel=='month'){
            vm.currentPageParams='';
            vm.searchInfo.search_range = {
              date_begin: vm.$moment(dateRange).format('YYYY-MM'),
              date_end: vm.$moment(dateRange).add('month', 1).format('YYYY-MM')
            }
          }else if(vm.incomedModel=='year') {
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
            if(vm.incomedModel=='day'){
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
            if(vm.incomedModel!='day'){
              vm.setChartLine(result.accountList);
            }
            if(vm.incomedModel=='month'){
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
      incomeFormOpen:function () {
        this.addIncomeFormVisible = true;
        this.$refs['incomeForm'].resetFields();
        this.incomeForm= {
          account_date: this.$moment().format('YYYY-MM-DD'),
          type_id: null,
          account_sum: null,
          member_id: null
        }
      },
      typeFormOpen:function () {
        this.typeFormVisible = true;
        this.$refs['typeForm'].resetFields();
        this.typeForm.type_name=null;
      },
      memberFormOpen:function () {
        this.memberFormVisible = true;
        this.$refs['memberForm'].resetFields();
        this.memberForm.member_name=null;
      },
      incomeSubmit:function () {
        var e=this;
        e.$refs['incomeForm'].validate((valid) => {
          if (valid) {
            var incomeInfo = this.incomeForm;
            incomeInfo.account_flow = 1;
            incomeInfo.user_id = 1;
            incomeInfo.account_date = e.$moment(incomeInfo.account_date).format('YYYY-MM-DD')
            e.$http({
              method: 'GET',
              url: this.config.baseUrl + 'account/addAccount',
              params: incomeInfo
            }).then(function (data) {
              var result = data.data;
              var response = result.code;
              if (response == 0) {
                e.$message({message: '提交成功！！', type: 'success'});
                e.$refs['incomeForm'].resetFields();
                e.incomeForm = {
                  account_date: e.$moment().format('YYYY-MM-DD'),
                  type_id: null,
                  account_sum: null,
                  member_id: null
                }
                e.getIncomeList()
              } else {
                e.$message.error('提交失败！！');
              }
            })
          }
        })
      },
      typeSubmit:function () {
        var e=this;
        e.$refs['typeForm'].validate((valid) => {
          if (valid) {
            var typeInfo = this.typeForm;
            typeInfo.type_flow = 1;
            typeInfo.user_id = 1;
            e.$http({
              method: 'GET',
              url: this.config.baseUrl + 'type/addType',
              params: typeInfo
            }).then(function (data) {
              var result = data.data;
              var response = result.code;
              if (response == 0) {
                e.typeFormVisible = false;
                e.$refs['typeForm'].resetFields();
                e.$message({message: '提交成功！！', type: 'success'});

                e.getTypeList()
              } else {
                e.$message.error('提交失败！！');
              }
            })
          }
        })
      },
      memberSubmit:function () {
        var e=this;
        e.$refs['memberForm'].validate((valid) => {
          if (valid) {
            var expendInfo = this.memberForm;
            expendInfo.user_id=1;
            e.$http({
              method: 'GET',
              url: this.config.baseUrl + 'member/addMember',
              params: expendInfo
            }).then(function (data) {
              var result = data.data;
              var response = result.code;
              if (response == 0) {
                e.memberFormVisible = false;
                e.$refs['memberForm'].resetFields();
                e.$message({message: '提交成功！！', type: 'success'});

                e.getMemberList()
              } else {
                e.$message.error('提交失败！！');
              }
            })
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
        if(vm.incomedModel=='year'){
          chartType='bar';
        }
        lineData.forEach(function (expend) {

          if(vm.incomedModel=='year'){
            dataNames.push(expend.account_date);
          }else  if(vm.incomedModel=='month'){
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
        this.getIncomeList()
      },
      handleMonthChange(val){
        this.currentPageParams.currentPage=val;
        this.monthYearExpendList=this.expendList.slice((val-1)*10,val*10)
      }
    },
    watch:{
      searchInfo: {
        handler: function (val, oldVal) {
          this.getIncomeList();
        },
        deep: true
      },
      incomedModel:function (val) {
        this.currentPageParams= {
          currentPage: 1,
          showCount: 10,
          totalResult: 0
        }
        this.searchInfo= {
          date_range: [this.$moment(new Date()).format('YYYY-MM'), new Date()],
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
      this.getIncomeList();


    }
  }
</script>
<style>
  .add-expend .el-dialog,.add-type .el-dialog,.add-member .el-dialog{
    width: 420px;
  }
</style>

