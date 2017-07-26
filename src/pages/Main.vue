<template>
  <div v-show="islogin">
    <top-nav :role="curUserName" :account="currentAccount"></top-nav>
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
          :propADUQ="propADUQ"
          style="margin-right:10px"
          ></router-view>
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
      // 是否登录
      islogin: false,
      // 是否不活动
      isActive: null,
      // 顶部导航栏组件 props
      curUserName: '',
      currentAccount: '',
      curUserId: 0,
      activeItem: 'deviceManager',
      // 表格组件props
      fetchObj: '',
      JoinOther: {},
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
        this.currentAccount = data.entity.account
        this.curUserId = data.entity.role
        this.curUserName = this.connverRole(data.entity.role)
      } else {
        let path = this.$route.path.split('/')
        let login = path[path.length - 2]
        this.$router.push({path: '/idev/' + login + '/login'})
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
      this.propADUQ = true
      switch (index) {
        case 'userManager':
          this.fetchObj = 'user'
          this.JoinOther.company = {}
          break
        case 'partnerManager':
          this.fetchObj = 'company'
          this.JoinOther.company = {}
          break
        case 'deviceManager':
          this.fetchObj = 'shebei'
          this.JoinOther.shebeibianhao = {}
          this.JoinOther.taocanzu = {}
          this.JoinOther.company = {}
          break
        case 'deviceId':
          this.fetchObj = 'shebeibianhao'
          break
        case 'combo':
          this.fetchObj = 'taocan'
          this.JoinOther.taocanzu = {}
          break
        case 'orderManager':
          this.propADUQ = false
          this.fetchObj = 'dingdan'
          this.JoinOther.guke = {}
          this.JoinOther.weixindingdan = {}
          this.JoinOther.shebei = {gongsi: {},shebeibianhao: {}}
          this.JoinOther.taocan = {taocanzu: {}}
          break
        case 'point':
          this.propADUQ = false
          this.fetchObj = 'jifenmingxi'
          this.JoinOther.dingdan = {}
          break
        case 'performance':
          this.propADUQ = false
          this.fetchObj = 'company'
          this.JoinOther.company = {}
          break
        case 'comboGroup':
          this.fetchObj = 'taocanzu'
          this.JoinOther.company = {}
          break
        case 'guke':
          this.propADUQ = false
          this.fetchObj = 'guke'
          break
      }
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
