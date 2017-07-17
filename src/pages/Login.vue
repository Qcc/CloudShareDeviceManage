<template>
<div class="login-continner">
  <h2 style="color:#8492A6">云享智能后台管理系统</h2>
  <el-form :model="loginForm" ref="loginForm" class="loginform">
    <el-form-item
      prop="user"
      :rules="[{ required: true, message: '请输入用户名', trigger: 'change' }]">
      <el-input autofocus v-model="loginForm.user" placeholder="请输入用户名">
        <template slot="prepend">账户</template>
      </el-input>
    </el-form-item>
    <el-form-item
      :prop="'passwd'"
      :rules="[{ required: true, message: '请输入密码', trigger: 'change' }]">
      <el-input @keyup.enter.native = "submitForm('loginForm')" v-model="loginForm.passwd" type='password' placeholder="请输入密码">
        <template slot="prepend">密码</template>
      </el-input>
    </el-form-item>

    <el-form-item v-if="logins > 2">
      <el-col :span="15">
        <el-form-item
          :prop="'validateCode'"
          :rules="[{ required: true, message: '请输入验证码', trigger: 'change' }]">
          <el-input :icon="icon" @keyup.enter.native = "submitForm('loginForm')" v-model="loginForm.validateCode" @change="validChange" placeholder="请输入验证码">
            <template slot="prepend">验证码</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="9">
        <el-form-item>
          <a @click="refreshValidateCode" style="cursor:pointer">
            <img :src="validateCodeImg" id="validCode" alt="验证码" title="点击重新获取"></img>
          </a>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
        style="width:120px"
        :loading="loading"
        v-on:click="submitForm('loginForm')">登 录</el-button>
    </el-form-item>
  </el-form>
  <h6 style="color:#D3DCE6"> copyright@cloudshare-v1.0-20170707</h6>
</div>
</template>
<script>
import {
  login,
  validateCodeImg,
  checkValidateCode,
  fetch
} from '../api/api.js'
export default {
  data () {
    return {
      loginForm: {
        user: '',
        passwd: '',
        validateCode: ''
      },
      loading: false,
      // 登录错误次数 超过3次需要验证码
      logins: 0,
      icon: '',
      validateCodeImg: validateCodeImg
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          fetch(login, this.loginComplate, this.loginForm)
        } else {
          return false
        }
      })
    },
    loginComplate (data) {
      this.loading = false
      if (data === null) {
        this.$alert('网络错误，请刷新（F5）后重试。', '错误提示', {
          confirmButtonText: '知道了。',
          type: 'error'
        })
        return false
      }
      if (data.errorCode !== 0) {
        this.logins++
        this.refreshValidateCode()
        this.$alert('登录错误，' + data.message, '错误提示', {
          confirmButtonText: '知道了。',
          type: 'error'
        })
        return false
      }
      let item = 0
      switch (data.entity) {
        case 2026226681:
          item = 101
          break
        case 2031278906:
          item = 201
          break
        case -2139060392:
          item = 301
          break
        case -2134008167:
          item = 401
          break
      }
      this.$router.push(data.entity + '/default?item=' + item)
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
.loginform{
  width:300px;
  margin: 0 auto;
  padding: 50px 50px 0;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
}
.login-continner{
  position: relative;
  top: 200px;
  margin: 0 auto;
}
</style>
