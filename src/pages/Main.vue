<template>
  <div style="height:100%" v-show="islogin">
    <div class="page-wrap">
    <top-nav :role="curUserName" :account="currentAccount" ></top-nav>
    <el-row>
      <el-col :span="menuWidth" style="margin-left:-20px">
        <left-Menu ref="leftMenu" :curUserId="curUserId" :collpase="isCollpase"></left-Menu>
      </el-col>
      <el-col :span="contentWidth" style="margin-left:20px">
        <el-breadcrumb style="margin:15px 0" separator="/">
          <el-tooltip effect="dark" :content="tips" placement="bottom">
            <el-breadcrumb-item ><a @click="collpaseMenu">{{collpaseName}}</a></el-breadcrumb-item>        
          </el-tooltip>
          <el-breadcrumb-item :to="{ path: `default?item=101` }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `${nav}`}">{{navName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!--<table-module :fetchObj = "'user'" :JoinOther="['gongsi']"></table-module>-->
        <router-view :fetchObj = "fetchObj"
          :JoinOther="JoinOther"
          :propADUQ="tableADUQ"
          :isCollpase="isCollpase"
          :rolId="curUserId"
          :createbale="createbale"
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
import PersonnelChart from '../components/personnelChart.vue'
import DeviceChart from '../components/deviceChart.vue'
import OrderChart from '../components/orderChart.vue'
import {isLoggedIn, fetch} from '../api/api.js'
import {setCookie, getCookie} from '../utils/utils.js'
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
      nav:'2',
      navName:'3',
      tips: '收起菜单',
      // 表格组件props
      fetchObj: '',
      JoinOther: {},
      tableADUQ: true,
      createbale: true
    }
  },
  created: function () {
    fetch(isLoggedIn, this.isLoggedInCompalte, {})
    this.getRouterPath(this.$route)
  },
  mounted: function (){
    this.init();
  },
  methods: {
    init(){
      if(getCookie('menuWidth') !== '')
      this.menuWidth = +getCookie('menuWidth');

      if(getCookie('contentWidth') !== '')
      this.contentWidth = +getCookie('contentWidth');

      if(getCookie('collpaseName') !== '')
      this.collpaseName = getCookie('collpaseName');

      if(getCookie('tips') !== '')      
      this.tips= decodeURI(getCookie('tips'));

      if(getCookie('collpaseName') !== '')      
      this.collpaseName = getCookie('collpaseName');
      if(getCookie('isCollpase') !== ''){
        if(getCookie('isCollpase')==='true'){
          this.isCollpase = true;
        }else{
          this.isCollpase = false;
        }
      }
      if(getCookie('openedMenu') !== ''){        
        this.$refs.leftMenu.openedMenu = getCookie('openedMenu').split(',');
      }else{
        this.$refs.leftMenu.openedMenu = [];               
      }
    },
    collpaseMenu() {
      this.isCollpase = !this.isCollpase;
      setCookie('isCollpase',this.isCollpase,365);                    
      if(this.isCollpase){
        let tips = encodeURI('展开菜单');
        setCookie('menuWidth',1,365);
        setCookie('contentWidth',23,365);    
        setCookie('collpaseName','>>',365);
        setCookie('tips',tips,365);
        setCookie('openedMenu',[],365);
        this.menuWidth = 1;
        this.contentWidth = 23;
        this.collpaseName = '>>';
        this.tips= '展开菜单';
        this.$refs.leftMenu.openedMenu = [];
      } else {
        let tips = encodeURI('收起菜单');        
        setCookie('menuWidth',5,365);
        setCookie('contentWidth',19,365);
        setCookie('collpaseName','<<',365);
        setCookie('tips',tips,365);
        setCookie('openedMenu',this.$route.query.item,365);
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
        // 伙伴管理员
		    if(this.curUserId === -2139060392 || this.curUserId ===-2134008167){
		    	this.tableADUQ = false;
		    }
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
      this.createbale = true
      switch (index) {
        case 'default':
          this.navName = '运行总览'
          this.nav = this.$route.fullPath
          break
        case 'userManager':
          this.fetchObj = 'user'
          this.JoinOther.gongsi = {}
          this.navName = '用户管理'
          this.nav = this.$route.fullPath
          break
        case 'partnerManager':
          this.fetchObj = 'gongsi'
          this.JoinOther.mugongsi = {}
          this.navName = '伙伴管理'
          this.nav = this.$route.fullPath
          break
        case 'deviceManager':
          this.fetchObj = 'shebei'
          this.JoinOther.shebeibianhao = {}
          this.JoinOther.taocanzu = {}
          this.JoinOther.gongsi = {}
          this.navName = '设备管理'
          this.nav = this.$route.fullPath
          break
        case 'deviceId':
          this.fetchObj = 'shebeibianhao'
          this.navName = '设备编号'
          this.nav = this.$route.fullPath
          break
        case 'combo':
          this.fetchObj = 'taocan'
          this.JoinOther.taocanzu = {}
          this.navName = '套餐配置'
          this.nav = this.$route.fullPath
          break
        case 'orderManager':
          this.propADUQ = false
          this.fetchObj = 'dingdan'
          this.JoinOther.user = {}
          this.JoinOther.guke = {}
          this.JoinOther.weixindingdan = {}
          this.JoinOther.shebei = {gongsi: {},shebeibianhao: {}}
          this.JoinOther.taocan = {taocanzu: {}}
          this.navName = '订单管理'
          this.nav = this.$route.fullPath
          break
        case 'point':
          this.propADUQ = false
          this.fetchObj = 'jifenmingxi'
          this.JoinOther.dingdan = { guke: {} }
          this.navName = '积分管理'
          this.nav = this.$route.fullPath
          break
        case 'comboGroup':
          this.fetchObj = 'taocanzu'
          this.JoinOther.gongsi = {}
          this.navName = '套餐组配置'
          this.nav = this.$route.fullPath
          break
        case 'guke':
          this.propADUQ = false
          this.fetchObj = 'guke'
          this.navName = '消费者'
          this.nav = this.$route.fullPath
          break
        case 'personnelChart':
          this.navName = '消费习惯'
          this.nav = this.$route.fullPath
          break
        case 'deviceChart':
          this.navName = '设备使用'
          this.nav = this.$route.fullPath
          break
        case 'orderChart':
          this.navName = '订单套餐'
          this.nav = this.$route.fullPath
          break
        case 'openDevice':
          this.navName = '打开设备'
          this.nav = this.$route.fullPath
          break
        case 'revenueClose':
          this.navName = '营收结算'
          this.nav = this.$route.fullPath
          break
        case 'systemBug':
          this.createbale = false
          this.fetchObj = 'guzhangshenbao'
          this.JoinOther.dingdan = {sheibei:{},taocan:{},guke:{},weixindingdan:{},user:{}}          
          this.navName = '故障反馈'
          this.nav = this.$route.fullPath
          break 
      }
    }
  },
  components: {
    TopNav,
    LeftMenu,
    SiteFooter,
    PersonnelChart,
    DeviceChart,
    OrderChart
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
