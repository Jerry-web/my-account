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
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value9" filterable placeholder="选择成员查询">
        <el-option
          v-for="item in members"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" class="floatright fs15"  icon="plus" @click="editFormVisible=true">新增支出</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="member"
        label="成员">
      </el-table-column>
    </el-table>
    <div class="widget margin-top-20">
      <div class="widget-body" style="height: 360px">
        <div id="myChart" style="width:900px;height:360px"></div>
      </div>
    </div>


    <el-dialog class="add-expend" title="新增支出" v-model="editFormVisible" :close-on-click-modal="false" >
      <el-form :model="editForm" label-width="80px"  ref="editForm" >
        <el-form-item label="支出时间" prop="name" >
          <el-date-picker type="date" placeholder="选择日期"  v-model="editForm.birth"></el-date-picker>

        </el-form-item>
        <el-form-item label="支出类型">
          <el-select v-model="value8" filterable placeholder="选择类型查询">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支出金额">
          <el-input type='number' style="width: 220px" placeholder="请输入内容" v-model="editForm.age">
          </el-input>
        </el-form-item>
        <el-form-item label="支出成员">
          <el-select v-model="value9" filterable placeholder="选择成员查询">
            <el-option
              v-for="item in members"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" >提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          type: '生活用品',
          money: 205,
          member:'本人'
        }, {
          date: '2016-05-02',
          type: '买菜',
          money: 75,
          member:'老婆'
        }, {
          date: '2016-05-02',
          type: '话费',
          money: 100,
          member:'本人'
        }, {
          date: '2016-05-02',
          type: '化妆品',
          money: 300,
          member:'老婆'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        members: [{
          value: '选项1',
          label: '本人'
        }, {
          value: '选项2',
          label: '老婆'
        }, {
          value: '选项3',
          label: '同事'
        }, {
          value: '选项4',
          label: '朋友'
        }],
        value8: '',
        value6: '',
        value9: '',
        labelPosition:'left',
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },
        editFormVisible:false,
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
      };
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
  .add-expend .el-dialog{
    width: 420px;
  }
</style>

