<template>
  <div style="height:100%" v-show="islogin">
    <div class="page-wrap">
    <top-nav :role="curUserName" :account="currentAccount" ></top-nav>
    <el-row>
      <el-col :span="menuWidth" style="margin-left:-20px">
        <left-Menu ref="leftMenu" :curUserId="curUserId" :activeItem="activeItem" :collpase="isCollpase"></left-Menu>
      </el-col>
      <el-col :span="contentWidth" style="margin-left:20px">
        <el-breadcrumb style="margin:15px 0" separator="/">
          <el-tooltip effect="dark" :content="tips" placement="bottom">
            <el-breadcrumb-item ><a @click="collpaseMenu">{{collpaseName}}</a></el-breadcrumb-item>        
          </el-tooltip>
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '?list=1001' }">运行总览</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<table-module :fetchObj = "'user'" :JoinOther="['gongsi']"></table-module>-->
        <router-view :fetchObj = "fetchObj"
          :JoinOther="JoinOther"
          :propADUQ="propADUQ"
          :isCollpase="isCollpase"
          style="margin-right:10px"
          ></router-view>
      </el-col>
    </el-row>
    </div>
    <site-footer class="footer"></site-footer>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
import SiteFooter from '../components/SiteFooter.vue'
import {isLoggedIn, fetch} from '../api/api.js'
export default {
  watch: {
    '$route' (to, from) {
      this.getRouterPath(to,from)
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
      collpaseName: '<<',
      isCollpase: false,
      menuWidth: 5,
      contentWidth: 19,
      tips: '收起菜单',
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
    collpaseMenu() {
      this.isCollpase = !this.isCollpase;
      if(this.isCollpase){
        this.menuWidth = 1;
        this.contentWidth = 23;
        this.collpaseName = '>>';
        this.tips= '展开菜单';
        this.$refs.leftMenu.openedMenu = [];
      } else {
        this.menuWidth = 5;
        this.contentWidth = 19;
        this.collpaseName = '<<';
        this.tips= '收起菜单';
        this.$refs.leftMenu.openedMenu = this.$route.query.item.split(',');
      }
    },
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
    getRouterPath (route,from = null) {
      let path = route.path.split('/')
      let index = path[path.length - 1]
      if(from){
        let f_path = from.path.split('/')
        let f_index = f_path[f_path.length - 1]
        if(f_index === index) return
      }
      this.fetchObj = ''
      this.JoinOther = {}
      this.propADUQ = true
      switch (index) {
        case 'userManager':
          this.fetchObj = 'user'
          this.JoinOther.gongsi = {}
          break
        case 'partnerManager':
          this.fetchObj = 'gongsi'
          this.JoinOther.mugongsi = {}
          break
        case 'deviceManager':
          this.fetchObj = 'shebei'
          this.JoinOther.shebeibianhao = {}
          this.JoinOther.taocanzu = {}
          this.JoinOther.gongsi = {}
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
          this.JoinOther.dingdan = { guke: {} }
          break
        case 'performance':
          this.propADUQ = false
          this.fetchObj = 'gongsi'
          this.JoinOther.gongsi = {}
          break
        case 'comboGroup':
          this.fetchObj = 'taocanzu'
          this.JoinOther.gongsi = {}
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
    LeftMenu,
    SiteFooter
  }
}
</script>
<style>
.page-wrap {
  height: 100%;
  margin-bottom: -34px;
}
.page-wrap:after {
  content: "";
  display: block;
}
.footer, .page-wrap:after {
  height: 34px; 
  position: relative;
  z-index: -1;
}
</style>
