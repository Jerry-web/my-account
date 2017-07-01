<template>
  <div >
    <div class="account-left" style="width: 180px;display: inline-block">
      <el-menu mode="accountIndex" default-active="3" class="fs15" @select="handleSelect">
        <el-menu-item-group title="系统管理">
          <el-menu-item index="3"><i class="fa fa-group margin-right-10 fs15"></i>成员管理</el-menu-item>
          <el-menu-item index="4"><i class="fa fa-credit-card margin-right-10 fs15"></i>类型管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="账户信息">
          <el-menu-item index="1"><i class="fa fa-user margin-right-10 fs15"></i>个人信息</el-menu-item>
          <el-menu-item index="2"><i class="fa fa-shield margin-right-10 fs15"></i>账户安全</el-menu-item>
        </el-menu-item-group>

      </el-menu>
    </div>
    <div class="account-right ">
      <div class=" margin-left-20">
        <div v-show="accountIndex==3" class="margin-top-20">
          <el-table
            :data="memberList"
            border
            style="width: 100%">
            <el-table-column
              prop="member_name"
              label="成员名称">
            </el-table-column>

            <el-table-column
              label="操作" >
              <template scope="scope">
                <el-button type="danger" size="small" @click="deleteOption(scope.row.member_id)">删除</el-button>
                <!--<el-button type="info" size="small" @click="editMember(scope.row.member_id)">操作</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="text-right margin-top-5" v-if="currentPageParams.totalResult>0">
            <el-pagination class="no-padding-right"
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPageParams.currentPage"
                           :page-size="currentPageParams.showCount"
                           layout="total, prev, pager, next"
                           :total="currentPageParams.totalResult">
            </el-pagination>
          </div>
        </div>

        <div v-show="accountIndex==4" class="margin-top-20">
          <el-table
            :data="typeList"
            border
            style="width: 100%">
            <el-table-column
              prop="type_name"
              label="类型名称">
            </el-table-column>
            <el-table-column
              label="账务流向">
              <template scope="scope">
                <span v-show="scope.row.type_flow==0" class="danger">支出</span>
                <span v-show="scope.row.type_flow==1" class="success">收入</span>
              </template>
            </el-table-column>

            <el-table-column
              label="操作" >
              <template scope="scope">
                <el-button type="danger" size="small" @click="deleteOption(scope.row.type_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-right margin-top-5" v-if="currentPageParams.totalResult>0">
            <el-pagination class="no-padding-right"
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPageParams.currentPage"
                           :page-size="currentPageParams.showCount"
                           layout="total, prev, pager, next"
                           :total="currentPageParams.totalResult">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        accountIndex:3,
        currentPageParams: {
          currentPage: 1,
          showCount: 10,
          totalResult: 0
        },
        memberList:[],
        typeList:[],
      };
    },
    methods:{
      getMemberList:function () {
        this.$http.get(
          this.config.baseUrl+'member/queryAll',
          {
            params:{
              pageStr:this.currentPageParams
            }
          }
        ).then(response => {
          var result=response.data;
          if(result.code==0){
            this.memberList=result.memberList;
          }
        }, response => {
          this.memberList=[]
        })
      },
      getTypeList:function () {
        this.$http.get(
          this.config.baseUrl+'type/queryAll',
          {
            params:{
              pageStr:this.currentPageParams
            }
          }
        ).then(response => {
          var result=response.data;
          if(result.code==0){
            this.typeList=result.typeList;
            this.currentPageParams=result.page;
          }
        }, response => {
          this.typeList=[]
        })
      },
      deleteOption:function (deleteId) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var url='';
            if(this.accountIndex==3){
                url='member/deleteMember';
            }else if(this.accountIndex==4){
              url='type/deleteType';
            }

          this.$http.get(
            this.config.baseUrl+url,
            {
              params:{id:deleteId}
            }
          ).then(response => {
            var result=response.data;
            if(result.code==0){
              this.$message({type: 'success', message: '删除成功!'});
              if(this.accountIndex==3){
                this.getMemberList();
              }else if(this.accountIndex==4){
                this.getTypeList();
              }

            }
          }, response => {
            this.$message({type: 'danger', message: '删除失败!'});
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSelect(key, keyPath) {
       this.accountIndex=key;
        if(key==3){
          this.currentPageParams= {
            currentPage: 1,
            showCount: 10,
            totalResult: 0
          }
          this.getMemberList();
        }else if(key==4){
          this.currentPageParams= {
            currentPage: 1,
            showCount: 10,
            totalResult: 0
          }
          this.getTypeList();

        }
      },
      handleCurrentChange(val) {
        this.currentPageParams.currentPage=val;
        if(this.accountIndex==3){

          this.getMemberList();
        }else if(this.accountIndex==4){
          this.getTypeList();

        }
      }
    },
    mounted(){
      this.getMemberList();
    }
  }
</script>
<style>
  .account-right {
    width: 800px;
    min-height: 400px;
    display: inline-block;

    vertical-align: top;
    border-left:1px solid #d3d3d3 ;
    margin-left: -3px;
  }
  .account-left .el-menu {
    background-color: #fff;
  }
  .account-left .el-menu-item.is-active {
    border-bottom: none;
  }
  .account-left .el-menu-item-group__title{
    padding-left: 10px!important;
    border-bottom:1px dashed #d3d3d3;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .account-left .el-menu-item, .el-submenu__title {
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
  }


</style>

