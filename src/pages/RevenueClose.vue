<template>
  <div class="revenue-box">
			<h4>{{getYearMonth()}} 营 收 对 账 单</h4>
			<a v-if="monthVisible" @click="editDate">{{currentMonth}}</a>
			<el-date-picker
				@change="editDate"
				v-if="monthEdit"
        v-model="monthValue"
        clearable
        type="month"
        placeholder="请选择结算月份">
      </el-date-picker>
			<div class="list">
				<el-tooltip effect="dark" content="所有订单收款累计" placement="bottom">
      		<span>合作商</span>
    		</el-tooltip>
				<a v-show="selectParnter === false" @click="changeParnter">{{currentParnter}}</a>
				<el-select
					v-show="selectParnter === true"
					style="width:300px"
				  v-model="parnter.parnterValue"
				  filterable
					clearable
					@change="selectedParnter"
				  remote
					:loading="parnter.loading"
				  placeholder="请输入伙伴公司名称"
				  :remote-method="remoteMethod">
				  <el-option
				    v-for="item in parnter.parnters"
						:key="item.value"
				    :label="item.label"
				    :value="item.value">
				  </el-option>
					<el-option v-if="parnter.count > 0" value="0" style="padding:0">
						<a @click.stop="moreData"  class="object-more">还有{{parnter.count}}条 点击加载...</a>
				  </el-option>
				</el-select>
			</div>
      <div class="list">
				<el-tooltip effect="dark" content="所有订单收款累计" placement="bottom">
      		<span>营业额</span>
    		</el-tooltip>
				<a @click="handleAllMoney">¥ {{(allMoney/100).toFixed(2)}}</a>
			</div>
      <div class="list">
				<el-tooltip effect="dark" content="为客户手动开启设备，收取的现金累计" placement="bottom">
					<span>现金收款</span>
    		</el-tooltip>
				<a @click="handleCashMoney">¥ {{(cashMoney/100).toFixed(2)}}</a>
      	<el-tooltip effect="dark" content="客户扫描二维码支付累计收款累计" placement="bottom">
					<span class="seconds">系统收款</span>
    		</el-tooltip>
				<a @click="handleQrMoney">¥ {{(qrMoney/100).toFixed(2)}}</a>
			</div>
      <div class="list">
				<el-tooltip effect="dark" content="合同约定合作商分成比例" placement="bottom">
					<span>分成比例</span>
    		</el-tooltip>
				<a>{{fenchengbili}}%</a>
			</div>      
      <div class="list">
				<el-tooltip effect="dark" content="现金收款未达到分成比例金额" placement="bottom">
					<span>当月应收</span>
    		</el-tooltip>
				<a @click="handleMonthIncome">¥ {{MonthIncome(allMoney)}}</a>
				<el-tooltip effect="dark" content="现金收款大于分成比例金额" placement="bottom">
      		<span class="seconds">当月应付</span>
    		</el-tooltip>
				<a @click="handleMonthExpend">¥ {{MonthExpend(allMoney)}}</a>
			</div>
			<div v-if="tableVisible">
				<table-module
					:fetchObj = "fetchObj"
          :JoinOther="JoinOther"
          :propADUQ="false"
          :propSearch="false"
					:selection="false"
					:autoLoad="autoLoad"
					:filterObj="filters"
          style="margin-right:10px">
				</table-module>
			</div>
  		<div class="revenue-discrtion" v-if="revenueVisible">
				<h5>收付款结算计算方式</h5>
				<span>{{shoufukuan}}</span>
			</div>
  </div>
</template>
<script>
import {setCookie, getCookie,checkResults,getFristLastDay} from '../utils/utils.js'
import TableModule from '../components/TableModule.vue'
import {chartUrl,fencheng,BASICURL, fetch2} from '../api/api.js'
export default {
  data(){
      return{
        monthValue:new Date(),
				currentMonth:getFristLastDay('/',this.monthValue)+' - '+getFristLastDay('/',this.monthValue,true),
				// 显示月份或编辑月份
				monthEdit:false,
				monthVisible:true,
				// 自动显示数据内容
				autoLoad:false,
				tableVisible:false,
				role:this.rolId,
				// 营业额
				allMoney:0,
				// 现金收款
				cashMoney:0,
				// 系统收款
				qrMoney:0,
				// 分成比例
				fenchengbili:0,
				// 获取主要数据表名称
				fetchObj:'dingdan',
				// 联合查询包含的对象
				JoinOther:{
					user: {},
          guke: {},
          weixindingdan :{},
          shebei: {gongsi: {},shebeibianhao: {}},
          taocan :{taocanzu: {}}
				},
				// columns过滤对象
				filters:'',
				shoufukuan:'',
				revenueVisible:false,
				//绑定伙伴查询
				parInit:false,
				selectParnter:false,
				currentParnter:'',
				currentUid:null,
				parnter:{
					parnterValue:null,
					loading:false,
					pageNO:1,
					keywords:'',
					parnters:[],
					count:0
				}
			}
  },
	props:{
		rolId:{type:Number,required:true,default:0}
	},
	watch:{
		'rolId':function(val,oldVal){
				// 云享管理员
			if(this.rolId === 2026226681){
				this.getServerObj(this.parnter);
			// 伙伴管理员
			}else if(this.rolId === -2139060392){
				this.getMonthData(this.monthValue)
			}
		},
		'parInit':function(val,oldVal){
			let cookie = getCookie('huobanduizhangdan');
			if(cookie !== ''){
				cookie = JSON.parse(cookie);
				if(cookie.parnterName){
					this.currentParnter = decodeURI(cookie.parnterName);
				}else{
					this.currentParnter = this.parnter.parnters[0].label;
				}

				if(cookie.parnterUid){
					this.currentUid = cookie.parnterUid;
				}else{
					this.currentUid = this.parnter.parnters[0].value;
				}

				if(cookie.defaultMonth){
					this.getMonthData(new Date(cookie.defaultMonth),cookie.parnterUid); 
					this.currentMonth = cookie.defaultCurrentM;
					this.monthValue = new Date(cookie.defaultMonth);
				}else{
					this.getMonthData(this.monthValue,this.parnter.parnters[0].value);					
				}

			}else{
				this.currentParnter = this.parnter.parnters[0].label;
				this.getMonthData(this.monthValue,this.parnter.parnters[0].value);
			}
		}
	},
	mounted:function(){
		// 云享管理员
		if(this.rolId === 2026226681 || this.rolId === 2031278906){
			this.getServerObj(this.parnter);
		// 伙伴管理员
		}else if(this.rolId === -2139060392){
			this.getMonthData(this.monthValue)
		}
	},
	methods:{
		changeParnter(val){
			this.selectParnter = !this.selectParnter;
			this.parnter.parnterValue='';
		},
		selectedParnter(val){
			if(val !== '') {
				this.selectParnter = !this.selectParnter;
				for (var i in this.parnter.parnters) {
					if (this.parnter.parnters[i].value === val) {
						this.currentParnter = this.parnter.parnters[i].label;
						this.currentUid = this.parnter.parnters[i].value;			
					}
				}
				let cookie = getCookie('huobanduizhangdan');
				if(cookie !== ''){
					cookie = JSON.parse(cookie);
				}else{
					cookie = {}
				}
				cookie.parnterUid = val;
				cookie.parnterName = encodeURI(this.currentParnter);
				setCookie('huobanduizhangdan',JSON.stringify(cookie),365);
				this.getMonthData(this.monthValue)
			}
		},
		moreData () {
      this.parnter.loading = true
      this.parnter.pageNO++
      this.getServerObj(this.parnter)
    },
    remoteMethod (keywords) {
			if(keywords === '') return;
			if(this.parnter.keywords !== keywords){
				this.parnter.pageNO = 1;
			}
      this.keywords = keywords
      if (this.parnter.parnters.length === 0) {
        this.parnter.loading = true
        this.getServerObj(this.parnter)
      } else {
        let flag = true
        for (var key in this.parnter.parnters) {
          if (this.parnter.parnters[key].label === keywords) {
            flag = false
          }
        }
        if (flag) {
					this.parnter.pageNO = 1
          this.getServerObj(this.parnter)
          this.parnter.loading = true
        }
      }
    },
		// 获取对象类型的更多页
    getServerObj (parnter) {
      // 传入pagenNO可获取更多数据
      // 默认获取20行
      let params = {ifGetCount: true, ifJoinReference:true, pageSize: 20, pageNO: parnter.pageNO}
      params.joinCondition={};
			params.joinCondition.mugongsi={};
			params.filter = {}
      params.filter.mingcheng = '%' + parnter.keywords + '%'
      params.filter.mingchengComparisonOperator = 'like'
      fetch2(BASICURL + 'gongsi' + '/queryPager.api', this.getServerObjOnComplate, params);
    },
    getServerObjOnComplate (data) {
			this.parnter.loading = false;
      if (!checkResults(data,this)) return
			let tData = data.entity.list;
			this.parnter.parnters = [];
      for (let i = 0; i < tData.length; i++) {
				if(tData[i].uid === 1) continue;
				let par = {}
				par.label = tData[i].mingcheng;
				par.value = tData[i].uid;
        this.parnter.parnters.push(par);
      }
			this.parInit = true
      // 未查看的行=当前页码×每页条数 如果大于0说明有剩余行未显示，则可加载
      this.parnter.count = data.entity.count - this.parnter.pageNO * 20;
    },
		getYearMonth(){
			let y = this.monthValue.getFullYear();
			let m = this.monthValue.getMonth() + 1;
			return y+' 年 '+m+' 月 份 ';
		},
		 // 当月应付 
		MonthExpend(money){
			// 云享管理员
			if(this.rolId === 2026226681){
				let m = ((this.fenchengbili/100) * money) - this.cashMoney;
				if(m < 0){
					m = 0;
				}
				return (m/100).toFixed(2);
				// 伙伴管理员
			}else if(this.rolId === -2139060392){
				let m = this.cashMoney - ((this.fenchengbili/100) * money);
				if(m < 0){
					m = 0;
				}
				return (m/100).toFixed(2);
			}
			
		},
		// 当月应收
		MonthIncome(money){
			// 云享管理员
			if(this.rolId === 2026226681){
				let m = this.cashMoney - ((this.fenchengbili/100) * money);
				if(m < 0){
					m = 0;
				}
				return (m/100).toFixed(2);
				// 伙伴管理员
			}else if(this.rolId === -2139060392){
				let m = ((this.fenchengbili/100) * money) - this.cashMoney;
				if(m < 0){
					m = 0;
				}
				return (m/100).toFixed(2);
			}
		},
		// 当月应付
		handleMonthExpend(){
			this.tableVisible = false;
			this.revenueVisible = true;
				// 云享管理员
			if(this.rolId === 2026226681){
				this.shoufukuan = '当月应付 = 现金收款 -（营业额 X 分成比例)';
				// 伙伴管理员
			}else if(this.rolId === -2139060392){
				this.shoufukuan = '当月应付 =（营业额 X 分成比例) - 现金收款';				
			}		
		},
		// 当月应收
		handleMonthIncome(){
			this.tableVisible = false;
			this.revenueVisible = true;
				// 云享管理员
			if(this.rolId === 2026226681){
				this.shoufukuan = '当月应收 = 现金收款 -（营业额 X 分成比例)';
				// 伙伴管理员
			}else if(this.rolId === -2139060392){
				this.shoufukuan = '当月应收 =（营业额 X 分成比例) - 现金收款';				
			}	
		},
		// 系统收款
		handleQrMoney(){
			this.revenueVisible = false;			
			this.tableVisible = true;
			let filter ={}
			filter.uid = this.currentUid;
			filter.fromDate = getFristLastDay('-',this.monthValue);
			filter.toDate = getFristLastDay('-',this.monthValue,true);
			filter.zhifuleixing = 2;
			this.filters = JSON.stringify(filter);
		},
		// 现金收款
		handleCashMoney(){
			this.revenueVisible = false;					
			this.tableVisible = true;
			let filter ={}
			filter.uid = this.currentUid;
			filter.fromDate = getFristLastDay('-',this.monthValue);
			filter.toDate = getFristLastDay('-',this.monthValue,true);
			filter.zhifuleixing = 3;
			this.filters = JSON.stringify(filter);
		},
		// 营业额
		handleAllMoney(){
			this.revenueVisible = false;					
			this.tableVisible = true;	
			this.autoLoad = true;
		},
		editDate(e){
			this.monthVisible = this.monthEdit;
			this.monthEdit = !this.monthVisible;
			if(typeof(e) === 'string'){
				let d = new Date(e);
				this.currentMonth =getFristLastDay('/',d) +' - '+getFristLastDay('/',d,true);
				this.getMonthData(d);
				let cookie = getCookie('huobanduizhangdan');
				if(cookie !== ''){
					cookie = JSON.parse(cookie);
				}else{
					cookie = {}
				}
				cookie.defaultMonth = d;
				cookie.defaultCurrentM = this.currentMonth;				
				setCookie('huobanduizhangdan',JSON.stringify(cookie),15);
			}
		},
		onAllMoneyComplate(data,...state){
			if(!checkResults(data,this)) return;
			if(data.entity[0] === null)
				data.entity[0] = {money:0};
			if(state[0][0] === 'allMoney'){	
				this.allMoney = data.entity[0].money;
			}else if(state[0][0] === 'qrMoney'){
				this.qrMoney = data.entity[0].money;
			}else if(state[0][0] === 'cashMoney'){
				this.cashMoney = data.entity[0].money;				
			}else if(state[0][0] === 'gongsi'){
				this.fenchengbili = data.entity;				
			}
		},
		getMonthData(d = new Date(),uid=null){
			let params = {};
			params.fromDate = getFristLastDay('-',d);
			params.toDate = getFristLastDay('-',d,true);
			params.type = 4;
			params.gongsi = uid;		
			if(this.parnter.parnters.length > 0){
				params.gongsi = this.parnter.parnters[0].value
			}
			if(this.currentUid !== null){
				params.gongsi = this.currentUid;
			}
			fetch2(chartUrl,this.onAllMoneyComplate,params,'allMoney');
			// weixin pay
			params.zhifuleixing = 2;
			fetch2(chartUrl,this.onAllMoneyComplate,params,'qrMoney');
			// gongsi pay
			params.zhifuleixing = 3;
			fetch2(chartUrl,this.onAllMoneyComplate,params,'cashMoney');
			if(!params.gongsi){
				params.gongsi ='0'
			}
			fetch2(fencheng,this.onAllMoneyComplate,params.gongsi,'gongsi');			
		}
	},
	components:{
		TableModule
	}
}
</script>
<style>
.revenue-box>.list{
  height: 40px;
	line-height: 40px;
  font-size: 14px;
	text-align: left;
	border-bottom: 1px solid #E5E9F2;
}
.revenue-box>h4{
	margin: 5px 0 3px 0;
}
.seconds{
	margin-left: 20%;
}
.revenue-box a{
	margin-left: 10px;
  font-size: 14px;
  color: #108ee9;
  cursor: pointer;
}
a:link {
  color: #108ee9;
}
a:visited {
  color: #108ee9;
}
a:hover {
  color: #ff9900;
}
a:active {
  color: #ff9900;
}
.revenue-discrtion{
	text-align: left;
}
</style>
