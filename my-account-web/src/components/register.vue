<template>
  <el-form :model="registerForm" :rules="rules" ref="registerForm" label-position="right"  label-width="80px" class="demo-ruleForm register-container">
    <h3 class="title">用户注册 <router-link to="/login" class="floatright fs15 warning" style="margin-right:-30px;margin-top:-20px">登录<i class="fa fa-chevron-circle-right margin-left-5 fs17"></i></router-link> </h3>

    <el-form-item prop="user_name" label="用户名" >
      <el-input type="text" v-model="registerForm.user_name" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="user_phone" label="手机号">
      <el-input type="text" v-model="registerForm.user_phone" auto-complete="off" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="user_email" label="邮箱">
      <el-input type="email" v-model="registerForm.user_email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="user_age" label="年龄">
      <el-input type="number" v-model="registerForm.user_age" auto-complete="off" placeholder="年龄"></el-input>
    </el-form-item>
    <el-form-item prop="user_password" label="密码">
      <el-input type="password" v-model="registerForm.user_password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="check_password" label="确认密码">
      <el-input type="password" v-model="registerForm.check_password" auto-complete="off" placeholder="确认密码"></el-input>
    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click="registerSubmit()" :loading="registering">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.check_password !== '') {
            this.$refs['registerForm'].validateField('check_password');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.user_password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          user_name: '',
          user_email:'',
          user_phone:'',
          user_age:'',
          user_password: '',
          check_password:''
        },
        rules: {
          user_name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          user_email:[
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          user_password: [
            { required: true, validator: validatePass, trigger: 'blur,,change' }
          ],
          check_password: [
            {required: true, validator: validatePass2, trigger: 'blur,change' }
          ],
        },
        registering:false
      };
    },
    methods: {
      registerSubmit(ev) {
        var _this = this;
        _this.$refs['registerForm'].validate((valid) => {
          if (valid) {
            _this.registering = true;
            _this.$http({
              method: 'POST',
              url: _this.config.baseUrl + 'user/register',
              data: _this.registerForm
            }).then(function (data) {
              var result = data.data;
              var response = result.code;
              _this.registering = false;
              if (response == 0) {
                _this.$message({message: '注册成功！！', type: 'success'});
                  _this.$router.push('/login');
                  localStorage.setItem('user',JSON.stringify(_this.registerForm))
              } else {
                _this.$message.error('注册失败！！');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(){
        this.$refs['registerForm'].resetFields();
      }
    },
    mounted(){

    }
  }

</script>

<style >
  .register-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 50px auto;
    width: 450px;
    padding: 35px 50px 10px 40px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>
