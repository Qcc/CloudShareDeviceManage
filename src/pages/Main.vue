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
        <router-view :fetchObj = "fetchObj"
          :JoinOther="JoinOther"
          :propADUQ="propADUQ"></router-view>
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
      this.getRouterPath(to)
    }
  },
  data () {
    return {
      islogin: false,
      // 顶部导航栏组件 props
      curUserName: '',
      curUserId: 0,
      activeItem: 'deviceManager',
      // 表格组件props
      fetchObj: '',
      JoinOther: [],
      propADUQ: true
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
        this.$router.push('/')
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
      this.propADUQ = true
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
          this.propADUQ = false
          main = 'dingdan'
          join.push('guke', 'shebei', 'taocan', 'weixindingdan')
          break
        case 'point':
          this.propADUQ = false
          main = 'jifenmingxi'
          join.push('dingdan')
          break
        case 'performance':
          this.propADUQ = false
          main = 'company'
          join.push('company')
          break
        case 'comboGroup':
          main = 'taocanzu'
          join.push('company')
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
