<template>
  <div >
    <el-row class="margin-bottom-20">
      <el-col :span="12"><h1 class="no-margin-top fs35">支出信息</h1></el-col>
      <el-col :span="12" class="text-right">
        <el-radio-group v-model="labelPosition" size="large">
          <el-radio-button label="left">日</el-radio-button>
          <el-radio-button label="right">月</el-radio-button>
          <el-radio-button label="top">年</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="margin-bottom-10" style="padding: 10px;background: #dedede;">
      <el-date-picker
        v-model="value6"
        type="daterange"
        placeholder="选择日期范围查询">
      </el-date-picker>

      <el-select v-model="value8" filterable placeholder="选择类型查询">
        <el-option
          v-for="type in typeList"
          :key="type.type_id"
          :label="type.type_name"
          :value="type.type_id">
        </el-option>
      </el-select>
      <el-select v-model="value9" filterable placeholder="选择支出成员查询">
        <el-option
          v-for="member in memberList"
          :key="member.member_id"
          :label="member.member_name"
          :value="member.member_id">
        </el-option>
      </el-select>
      <el-button type="success" class="floatright fs15"  icon="plus" @click="expendFormOpen">新增支出</el-button>
    </div>
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
    <div class="widget margin-top-20">
      <div class="widget-body" style="height: 360px">
        <div id="myChart" style="width:900px;height:360px"></div>
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
        value8: '',
        value6: '',
        value9: '',
        labelPosition:'left',
        expendFormVisible:false,
        addLoading: false,
        memberList:[],
        typeList:[],
        expendList:[],
        expendForm:{
            account_date:null,
            type_id:null,
            account_sum:null,
           member_id:null,

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
          var e=this;
        this.$http.get(
          this.config.baseUrl+'account/queryAll'
        ).then(response => {
          var result=response.data;
          if(result.code==0){
              if(result.accountList&&result.accountList.length>0){
                  result.accountList.forEach(function (expend) {
                    expend.account_date=e.$moment(expend.account_date).format('YYYY-MM-DD')
                  })
              }
            this.expendList=result.accountList

          }
        }, response => {
          this.expendList=[]
        })
      },
      expendFormOpen:function () {
        this.expendFormVisible = true;
        this.expendForm= {
          account_date: null,
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


      }

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

