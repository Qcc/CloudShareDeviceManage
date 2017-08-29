<template>
  <div class="revenue-box">
			<h4>2017 年 8 月 份 营 收 对 账 单</h4>
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
				<a @click="handleAllMoney">¥ {{allMoney}}</a>
			</div>
      <div class="list">
				<el-tooltip effect="dark" content="为客户手动开启设备，收取的现金累计" placement="bottom">
					<span>现金收款</span>
    		</el-tooltip>
				<a @click="handleCashMoney">¥ {{cashMoney}}</a>
      	<el-tooltip effect="dark" content="客户扫描二维码支付累计收款累计" placement="bottom">
					<span class="seconds">系统收款</span>
    		</el-tooltip>
				<a @click="handleQrMoney">¥ {{qrMoney}}</a>
			</div>
      <div class="list">
				<el-tooltip effect="dark" content="合同约定合作商分成比例" placement="bottom">
					<span>分成比例</span>
    		</el-tooltip>
				<a @click="handleFencheng">{{fencheng}}%</a>
			</div>      
      <div class="list">
				<el-tooltip effect="dark" content="现金收款未达到分成比例金额" placement="bottom">
					<span>当月应收</span>
    		</el-tooltip>
				<a @click="handleMonthIncome">¥ {{monthIncome}}</a>
				<el-tooltip effect="dark" content="现金收款大于分成比例金额" placement="bottom">
      		<span class="seconds">当月应付</span>
    		</el-tooltip>
				<a @click="handleMonthExpend">¥ {{monthExpend}}</a>
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
import {chartUrl, fetch2} from '../api/api.js'
export default {
  data(){
      return{
        monthValue:new Date(),
				currentMonth:getFristLastDay('/',this.monthValue)+' - '+getFristLastDay('/',this.monthValue,true),
				// 显示月份或编辑月份
				monthEdit:false,
				monthVisible:true,
				// 营业额
				allMoney:'0.00',
				// 现金收款
				cashMoney:'0.00',
				// 系统收款
				qrMoney:'0.00',
				// 分成比例
				fencheng:0,
				// 当月应收
				monthIncome:'0.00',
				// 当月应付
				monthExpend:'0.00',
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
      }
  },
	mounted:function(){
		this.getMonthData();
	},
	methods:{
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
		onAllMoneyComplate(data){
			console.log('data',data);
		},
		getMonthData(d = new Date()){
			let params = {};
			params.fromDate = getFristLastDay('-',d);
			params.toDate = getFristLastDay('-',d,true);
			params.type = 4;
			params.gongsi = null;				
			fetch2(chartUrl,this.onAllMoneyComplate,params);
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
