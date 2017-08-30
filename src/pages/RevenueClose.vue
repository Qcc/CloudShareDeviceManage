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
				<a @click="handleFencheng">{{fenchengbili}}%</a>
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
			<div>
				<table-module
					:fetchObj = "fetchObj"
          :JoinOther="JoinOther"
          :propADUQ="false"
          :propSearch="false"
					:selection="false"
					:autoLoad="false"
					:filterObj="filters"
          style="margin-right:10px">
				</table-module>
			</div>
  </div>
</template>
<script>
import {setCookie, getCookie,checkResults,getFristLastDay} from '../utils/utils.js'
import TableModule from '../components/TableModule.vue'
import {chartUrl,fencheng, fetch2} from '../api/api.js'
export default {
  data(){
      return{
        monthValue:new Date(),
				currentMonth:getFristLastDay('/',this.monthValue)+' - '+getFristLastDay('/',this.monthValue,true),
				// 显示月份或编辑月份
				monthEdit:false,
				monthVisible:true,
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
				//gongsi
				gongsiValue:2,
      }
  },
	props:{
		rolId:{type:Number,required:true}
	},
	mounted:function(){
		this.getMonthData();
	},
	methods:{
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
		handleMonthExpend(){
			console.log('当月应付');			
		},
		handleMonthIncome(){
			console.log('当月应收');
		},
		handleFencheng(){
			console.log('分成比例');			
		},
		handleQrMoney(){
			console.log('系统收款');
			this.filters='111';
			// zhifushijian 
			// zhifuleixing  weixin 2  gongsi 3  jifen 1 			
		},
		handleCashMoney(){
			console.log('现金收款');
			this.filters='333';
		},
		handleAllMoney(){
			console.log('营业额');
		},
		editDate(e){
			this.monthVisible = this.monthEdit;
			this.monthEdit = !this.monthVisible;
			if(typeof(e) === 'string'){
				let d = new Date(e);
				this.currentMonth =getFristLastDay('/',d) +' - '+getFristLastDay('/',d,true);
				this.getMonthData(d);
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
		getMonthData(d = new Date()){
			let params = {};
			params.fromDate = getFristLastDay('-',d);
			params.toDate = getFristLastDay('-',d,true);
			params.type = 4;
			params.gongsi = null;				
			fetch2(chartUrl,this.onAllMoneyComplate,params,'allMoney');
			// weixin pay
			params.zhifuleixing = 2;
			fetch2(chartUrl,this.onAllMoneyComplate,params,'qrMoney');
			// gongsi pay
			params.zhifuleixing = 3;
			fetch2(chartUrl,this.onAllMoneyComplate,params,'cashMoney');
			let gongsi 
			if(this.gongsiValue !== null){
				gongsi = this.gongsiValue;
			}
			fetch2(fencheng,this.onAllMoneyComplate,gongsi,'gongsi');			
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
</style>
