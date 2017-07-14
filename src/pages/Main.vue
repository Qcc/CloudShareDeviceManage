<template>
  <div v-show="islogin">
    <top-nav :role="curUserName"></top-nav>
    <el-row>
      <el-col :span="5" style="margin-left:-20px">
        <left-Menu :curUserId="curUserId" :activeItem="activeItem">
        </left-Menu>
      </el-col>
      <el-col :span="19" style="margin-left:20px">  
        <el-breadcrumb style="margin:15px 0" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '?list=1001' }">运行总览</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<table-module :fetchObj = "'user'" :JoinOther="['company']"></table-module>-->
        <router-view :fetchObj = "fetchObj" :JoinOther="JoinOther"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
// import TableModule from '../components/TableModule.vue'
import {isLoggedIn, fetch} from '../api/api.js'
export default {
  watch: {
    '$route' (to, from) {
      let path = to.path.split('/')
      let index = path[path.length - 1]
      this.activeItem = index
      let main = ''
      let join = []
      switch (index) {
        case 'userManager':
          main = 'user'
          join.push('company')
          break
        case 'partnerManager':
          main = 'company'
          join.push('company')
          break
        case 'deviceManager':
          main = 'shebei'
          join.push('company')
          break
        case 'combo':
          main = 'taocan'
          join.push('company')
          break
        case 'orderManager':
          main = 'dingdan'
          join.push('guke', 'shebei', 'taocan', 'weixindingdan')
          break
        case 'point':
          main = 'jifenmingxi'
          join.push('dingdan')
          break
      }
      this.fetchObj = main
      this.JoinOther = join
    }
  },
  data () {
    return {
      islogin: false,
      curUserName: '',
      curUserId: 0,
      activeItem: 'deviceManager',
      fetchObj: '',
      JoinOther: []
    }
  },
  created: function () {
    fetch(isLoggedIn, this.isLoggedInCompalte, {})
    this.getRouterPath(this.$route)
  },
  methods: {
    isLoggedInCompalte (data) {
      if (data === null) return false
      if (data.errorCode !== 0) return false
      if (data.entity) {
        this.islogin = true
        this.curUserId = data.entity
        this.curUserName = this.connverRole(data.entity)
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
    },
    getRouterPath (route) {
      let path = route.path.split('/')
      let index = path[path.length - 1]
      let main = ''
      let join = []
      switch (index) {
        case 'userManager':
          main = 'user'
          join.push('company')
          break
        case 'partnerManager':
          main = 'company'
          join.push('company')
          break
        case 'deviceManager':
          main = 'shebei'
          join.push('company')
          break
        case 'combo':
          main = 'taocan'
          join.push('company')
          break
        case 'orderManager':
          main = 'dingdan'
          join.push('guke', 'shebei', 'taocan', 'weixindingdan')
          break
        case 'point':
          main = 'jifenmingxi'
          join.push('dingdan')
          break
      }
      this.fetchObj = main
      this.JoinOther = join
      this.activeItem = index
    }
  },
  components: {
    TopNav,
    LeftMenu
    // TableModule
  }
}
</script>
<style>

</style>
