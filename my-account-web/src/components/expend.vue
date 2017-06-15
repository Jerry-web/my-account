<template>
  <div >
    <el-row class="margin-bottom-20">
      <el-col :span="12"><h1 class="no-margin-top fs35">支出信息</h1></el-col>
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
      <el-select v-model="searchInfo.member_id" clearable filterable placeholder="选择支出成员查询">
        <el-option
          v-for="member in memberList"
          :key="member.member_id"
          :label="member.member_name"
          :value="member.member_id">
        </el-option>
      </el-select>
      <el-button type="success" class="floatright fs15"  icon="plus" @click="expendFormOpen">新增支出</el-button>

    </div>

    <div >
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
          label="支出成员">
        </el-table-column>
      </el-table>
      <div class="text-right margin-top-5" v-show="currentPageParams.totalResult>0">
        <label class="floatleft fs15 margin-top-5">共计支出：<span class="fs18" style="font-weight: bold">{{accountTotal}} 元</span></label>
        <el-pagination class="no-padding-right"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPageParams.currentPage"
                       :page-size="currentPageParams.showCount"
                       layout="total, prev, pager, next"
                       :total="currentPageParams.totalResult">
        </el-pagination>
      </div>
      <div class="widget margin-top-10" v-show="accountTypeList&&accountTypeList.length>0">
        <div class="widget-body" style="height: 360px">
          <div style="display: inline-block;width: 650px" ng-show="">
            <div id="myChart" style="width:600px;height:360px"></div>
          </div>
          <div class=" margin-top-10" style="width:300px;display: inline-block;vertical-align: top">
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
                label="支出金额（元）">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>




    <el-dialog class="add-expend" title="新增支出" v-model="expendFormVisible" :close-on-click-modal="false" >
      <el-form :model="expendForm" label-width="80px"  ref="editForm" >
        <el-form-item label="支出时间" prop="name" >
          <el-date-picker type="date" placeholder="选择日期"  v-model="expendForm.account_date"></el-date-picker>

        </el-form-item>
        <el-form-item label="支出类型">
          <el-select v-model="expendForm.type_id" filterable placeholder="选择类型查询">
            <el-option
              v-for="type in typeList"
              :key="type.type_id"
              :label="type.type_name"
              :value="type.type_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出金额">
          <el-input type='number' style="width: 220px" placeholder="请填写支出金额" v-model="expendForm.account_sum">
          </el-input>
        </el-form-item>
        <el-form-item label="支出成员">
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
          member_id:null
        },
        expendModel:'day',
        expendFormVisible:false,
        addLoading: false,
        accountTotal:0,
        memberList:[],
        typeList:[],
        expendList:[],
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
                type_flow:'0'
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
        var vm=this;
        var dateRange=vm.searchInfo.date_range;
        vm.searchInfo.search_range=null;
        if(dateRange&&dateRange.length>0) {
          if (dateRange[0] != null && dateRange[1] != null) {
            vm.searchInfo.search_range = {
              date_begin: vm.$moment(dateRange[0]).format('YYYY-MM-DD'),
              date_end: vm.$moment(dateRange[1]).add('day', 1).format('YYYY-MM-DD')
            }
          }
        }

        vm.$http({
          method: 'GET',
          url: vm.config.baseUrl + 'account/queryAll',
          params:{
              accountStr:vm.searchInfo,
              pageStr:vm.currentPageParams
          }
        }).then(response => {
          var result=response.data;
          if(result.code==0){
              if(result.accountList&&result.accountList.length>0){
                  result.accountList.forEach(function (expend) {
                    expend.account_date=vm.$moment(expend.account_date).format('YYYY-MM-DD')
                  })
              }
            vm.expendList=result.accountList;
            vm.currentPageParams=result.page;
            vm.accountTotal=result.total;
            vm.accountTypeList=result.accountTypeList;
            vm.setCharts(result.accountTypeList)

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
        expendInfo.account_flow=0;
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
            e.getExpendList()
          }
        })
      },
      setCharts:function (optionData) {
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
              text: '支出类型统计',
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
                name: '类型支出',
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
      handleCurrentChange(val) {
        this.currentPageParams.currentPage=val;
        this.getExpendList()
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

        this.searchInfo= {
          date_range: [this.$moment(new Date()).subtract(7,'days'), new Date()],
          date_month: new Date(),
          date_year: new Date(),
          type_id: null,
          member_id: null
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

