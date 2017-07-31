<template>
  <div class="top-continner">
    <i class="logo"></i>
    <ul class="top-menu">
      <li class="menu-item">{{role}}</li>
      <li class="menu-item user" ><el-dropdown trigger="click" @command="handleLogout">
      <span class="dropdown-link">
        账户({{account}})<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu  slot="dropdown">
        <el-dropdown-item command="1">修改密码</el-dropdown-item>
        <el-dropdown-item command="2">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown></li>
      <!--<li class="menu-item user" @click="logout">注销</li>            -->
    </ul>
    <el-dialog
      title="修改密码"
      :visible.sync="modPWDVisible">
      <el-form  :rules="rules" ref="pwdForm"  :model="modPwd">
        <el-form-item label="当前密码" prop="pwd">
          <el-input v-model="modPwd.pwd" type="Password" placeholder="请输入当前密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="modPwd.newPwd" type="Password" placeholder="请输入新密码"></el-input>            
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPwd2">
          <el-input v-model="modPwd.newPwd2" type="Password" placeholder="请再次输入新密码"></el-input>            
        </el-form-item>
        <el-form-item v-if="logins > 2" label="验证码" prop="code">
          <el-input style="width:200px" :icon="icon" @change="validChange" v-model="modPwd.code" placeholder="请输入验证码"></el-input>            
          <a @click="refreshValidateCode" style="cursor:pointer">
            <img :src="validateCodeImg" id="validCode" alt="验证码" title="点击重新获取"></img>
          </a>
        </el-form-item>
      </el-form>
      <span slot="footer" >
        <el-button @click="CancelModOwd('pwdForm')">取 消</el-button>
        <el-button type="primary" :loading="modLoading" @click="modPwdSubmit('pwdForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  logoutApi,
  fetch,
  validateCodeImg,
  checkValidateCode,
  modPassword
} from '../api/api.js'
export default {
  props: {
    role: {
      type: String,
      default: ''
    },
    account: {
      type: String,
      default: ''
    }
  },
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modPwd.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      modPWDVisible: false,
      modPwd: {
        pwd: '',
        newPwd: '',
        newPwd2: '',
        code: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入当前密码', trigger: 'change' }
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'change' },
          { min: 6, max: 15, message: '新密码不安全，至少需要6位以上', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请再次输入新密码', trigger: 'change' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' }
        ]
      },
      icon: '',
      validateCodeImg: validateCodeImg,
      logins: 0,
      modLoading: false
    }
  },
  methods: {
    CancelModOwd (pwdForm) {
      this.modPWDVisible = false
      this.$refs[pwdForm].resetFields()
    },
    modPwdSubmit (pwdForm) {
      this.$refs[pwdForm].validate((valid) => {
        if (valid) {
          this.modLoading = true
          this.modPWDVisible = false
          this.logins++
          fetch(modPassword, this.modPwdComplate, {oldPassword: this.modPwd.pwd,
            newPassword: this.modPwd.newPwd2,
            validateCode: this.modPwd.code});
          this.modPwd.pwd = '';
          this.modPwd.newPwd2 = '';
          this.modPwd.newPwd = '';          
          this.modPwd.code = '';
        } else {
          return false
        }
      })
    },
    modPwdComplate (data) {
      this.modLoading = false
      if (data === null) {
          this.$notify.error({
            title: '提示',
            message: '网络错误，请刷新（F5）后重试。'
          })
          return false
        }
        if (data.errorCode !== 0) {
          this.$notify.error({
            title: '错误',
            message: '修改密码时发生错误，' + data.message
          })
        }else{
          this.$notify.success({
            title: '成功',
            message: '修改密码成功，请牢记新密码！'
          })
        }
    },
    handleLogout (command) {
      if (command === '1') {
        this.modPWDVisible = true
      } else {
        this.$confirm('您确定要注销当前用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetch(logoutApi, this.logoutComplate)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    logoutComplate (data) {
      if (data === null) return false
      if (data.errorCode !== 0) return false
      let path = this.$route.path.split('/')
      let login = path[path.length - 2]
      this.$router.push({path: '/idev/' + login + '/login'})
    },
    refreshValidateCode () {
      var img = document.getElementById('validCode')
      if (img) img.src = this.validateCodeImg + '?nocache=' + new Date().getTime()
    },
    validChange (val) {
      if (val.length === 4) {
        fetch(checkValidateCode, this.validComplate, {code: val})
      } else {
        this.icon = null
      }
    },
    validComplate (data) {
      if (data.status === 200 && data.errorCode === 0) {
        if (data.entity === 1) {
          this.icon = 'circle-check'
        } else {
          this.icon = 'circle-cross'
        }
      }
    }
  }
}
</script>
<style>
  .top-continner{
    width:100%;
    height: 60px;
    background-color: #324057;
  }
  .logo{
      float: left;
      margin: 0 40px;
      width: 167px;
      height: 60px;
      background: url('../assets/logo.png') no-repeat center;
  }
  .top-menu{
    list-style: none;
    margin: 0;
    padding:0;
    color:#EFF2F7;
  }
  .menu-item{
    float: left;
    line-height: 60px;
    width: 80px;
  }
  .menu-item:hover{
    background-color: #475669;
  }
  .user{
    width: 120px;
    float:right;
    margin-right: 20px;
  }
  .dropdown-link{
    color:#fff;
  }
</style>
