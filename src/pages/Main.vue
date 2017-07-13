<template>
  <div v-show="islogin">
    <top-nav :role="currentUser"></top-nav>
    <el-row>
      <el-col :span="5" style="margin-left:-20px">
        <left-Menu :manager="true" activeItem="main">
        </left-Menu>
      </el-col>
      <el-col :span="19" style="margin-left:20px">  
        <el-breadcrumb style="margin:15px 0" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '?list=1001' }">运行总览</el-breadcrumb-item>
        </el-breadcrumb>
        <table-module :fetchObj = "'user'" :JoinOther="['company']"></table-module>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
import TableModule from '../components/TableModule.vue'
import {isLoggedIn, fetch} from '../api/api.js'
export default {
  data () {
    return {
      islogin: false,
      currentUser: ''
    }
  },
  created: function () {
    fetch(isLoggedIn, this.isLoggedInCompalte, {})
    console.log('routerID', this.$route.params, 'routerQuery', this.$route.query)
  },
  watch: {
    '$route' (to, from) {
      console.log('to', to, 'from', from)
    }
  },
  methods: {
    isLoggedInCompalte (data) {
      if (data === null) return false
      if (data.errorCode !== 0) return false
      if (data.entity) {
        this.islogin = true
        this.currentUser = this.connverRole(data.entity)
      } else {
        this.$alert('您还未登录，请点击按钮返回重试！', '错误提示', {
          confirmButtonText: '知道了。',
          type: 'error',
          callback: action => {
            this.$router.push('/')
          }
        })
      }
    },
    connverRole (id) {
      switch (id) {
        case 2026226681: return '云享管理员'
        case 2031278906: return '云享运维员'
        case -2139060392: return '伙伴管理员'
        case -2134008167: return '伙伴运维员'
        case 1233636: return '顾客'
      }
    }
  },
  components: {
    TopNav,
    LeftMenu,
    TableModule
  }
}
</script>
<style>

</style>
