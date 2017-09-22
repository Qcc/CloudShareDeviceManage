<template>
<div>
  <div class="open-logo-box">
    <div class="open-logo"></div>
		<div>
    	<h3>欢迎使用智足宝足部按摩器</h3>
		</div>
  </div><br/>
	<div class="open-form">
		<el-form label-position="top" label-width="80px" :model="formOrder">
		  <el-form-item  label="设备">
				<el-select
					style="width:300px"
				  v-model="formOrder.shebeiid"
				  filterable
					clearable
					@change="changeDevice"
				  remote
					:loading="device.loading"
				  placeholder="请输入房间号"
				  :remote-method="remoteMethod">
				  <el-option
				    v-for="item in device.devices"
				    :key="'ID:' + item.key"
				    :label="'房间 ' + item.label"
				    :value="item.value">
						<span style="float: left">房间 {{ item.label }}</span>
  			    <span style="float: right; color: #8492a6; font-size: 13px">ID：{{ item.key }}</span>
				  </el-option>
					<el-option v-if="device.count > 0" value="0" style="padding:0">
						<a @click.stop="moreData"  class="object-more">还有{{device.count}}条 点击加载...</a>
				  </el-option>
				</el-select>
		  </el-form-item>

		  <el-form-item label="使用时间">
		    <el-select v-model="formOrder.taocanid" 
					clearable style="width:300px"
					@change="changeTaocan" 
					:disabled="taocanDisabled"
					placeholder="请选择使用时间">
  			  <el-option
  			    v-for="item in taocan"
  			    :key="item.key / 100 + ' 元'"
  			    :label="item.label / 60 +' 分钟'"
  			    :value="item.value">
  			    <span style="float: left">{{ item.label / 60 }}分钟</span>
  			    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key/100 }}元</span>
  			  </el-option>
  			</el-select>
		  </el-form-item>
			<el-form-item>
  		  <el-button type="warning" :disabled="submitDisabled" :loading="submiLoading" size="large" @click="onSubmit">打开设备</el-button>
  		</el-form-item>
		</el-form>
	</div>
	<div class="running-device" v-if="tableData.length !== 0">
		<ul class="device-list">
			<li v-for=" item in tableData" :key="item.id">
				<span>{{item.id}}</span>
				<span>{{item.fangjian}}房间</span>
				<span>{{checkStatus(item.status)}}</span>
				<span>{{item.start}}</span>
				<span>{{item.money / 100}} 元</span>
				<span>{{item.end}}</span>
			</li>
			<hr/>
			<li>
				<span>ID</span>
				<span>房间</span>
				<span>状态</span>
				<span>开始时间</span>
				<span>费用</span>
				<span>结束时间</span>
			</li>
		</ul>
	</div>
</div>
</template>
<script>
import {BASICURL, fetch, fetch2} from '../api/api.js'
import {setCookie, getCookie,checkResults} from '../utils/utils.js'
export default {
  data(){
		return{
			formOrder: {
        shebeiid: '',
        taocanid: '',
      },
			deviceData:[],
			device:{
				count:0,
				loading:false,
				devices:[],
				pageNO:1,
				keywords:'',
			},
			taocan:[],
			taocanDisabled:true,
			submitDisabled:true,
			submiLoading:false,
			showHeader:false,
			statusStyle:'status0',
			tableData: []
		}
	},
	mounted:function(){
		let interval;
		this.getActiveDevice();		
		if(interval === undefined)
		interval = setInterval(()=>{
			this.getActiveDevice();
			if(getCookie('activeDevices') === '')
			clearInterval(interval);
		},10000);
		this.remoteMethod ('');
	},
	methods:{
		checkStatus(val) {
			if(val === 0) {
				return ' 离线';
			}
			if(val === 1) {
				return ' 在线';
			}
			if(val === 2) {
				return ' 工作中';
			}			
		},
		changeTaocan(val){
			if(val !== '') this.submitDisabled = false;
		},
		changeDevice(val){
			for (var i in this.deviceData) {
				if(this.deviceData[i].uid === val){
					this.getTaocan(this.deviceData[i].taocanzu.uid);
				}					
			}
			if(val !== '') this.taocanDisabled = false;
		},
		onSubmit(){
			this.$confirm('订单创建成功后会立即开启设备开始计时,并产生费用,请告知客户使用设备，是否继续?', '注意', {
          confirmButtonText: '打开设备',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
						this.submiLoading = true;
						fetch2(BASICURL+'dingdan/companyPay.api',this.createOrder,this.formOrder);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建订单！'
          });          
        });
		},
		createOrder(data){
			let start,end,money,deviceUid,cookie,jishi;
			this.submiLoading = false;
			if (!checkResults(data,this)) return
			this.taocanDisabled = true;
			this.submitDisabled = true;
			this.$message({
        type: 'success',
        message: '设备已经开启，请告知客户!'
      });
			// 将套餐信息存入cookie
			for (var i in this.taocan) {
				if(this.taocan[i].value === this.formOrder.taocanid){
					money = this.taocan[i].key;
					start = this.getDate();
					end = this.getDate(this.taocan[i].label);
					jishi = this.taocan[i].label;
					continue;					
				}
			}
			deviceUid = this.formOrder.shebeiid;
			cookie = getCookie('activeDevices');
			if(cookie === ''){
				cookie = [];
			}else{
				cookie = JSON.parse(cookie);
			}
			cookie.push({deviceUid:deviceUid,start:start,end:end,money:money});
			setCookie('activeDevices',JSON.stringify(cookie),jishi+600,true);
			this.formOrder.shebeiid = '';
			this.formOrder.taocanid = '';
			this.getActiveDevice();
		},
		moreData () {
      this.device.loading = true
      this.device.pageNO++
      this.getServerObj(this.device)
    },
    remoteMethod (keywords) {
			// if(keywords === '') return;
			if(this.device.keywords !== keywords){
				this.device.pageNO = 1;
			}
      this.device.keywords = keywords
      if (this.device.devices.length === 0) {
        this.device.loading = true
        this.getServerObj(this.device)
      } else {
        let flag = true
        for (var key in this.device.devices) {
          if ('房间 '+ this.device.devices[key].label === keywords) {
            flag = false
          }
        }
        if (flag) {
					this.device.pageNO = 1
          this.getServerObj(this.device)
          this.device.loading = true
        }
      }
    },
		// 获取对象类型的更多页
    getServerObj (device) {
      // 传入pagenNO可获取更多数据
      // 默认获取20行
      let params = {ifGetCount: true, ifJoinReference:true, pageSize: 20, pageNO: device.pageNO}
      params.joinCondition={};
			params.joinCondition.gongsi={};
			params.joinCondition.shebeibianhao={};
			params.joinCondition.taocanzu={};
			params.filter = {}
      params.filter.bushufangjian = '%' + device.keywords + '%'
      params.filter.bushufangjianComparisonOperator = 'like'
      fetch2(BASICURL + 'shebei' + '/queryPager.api', this.getServerObjOnComplate, params);
    },
    getServerObjOnComplate (data) {
			this.device.loading = false;
      if (!checkResults(data,this)) return
			this.deviceData = data.entity.list;
			this.device.devices = [];
      for (let i = 0; i < this.deviceData.length; i++) {
				let dev = {}
				dev.label = this.deviceData[i].bushufangjian;
				dev.value = this.deviceData[i].uid;
				dev.key = this.deviceData[i].shebeibianhao.bianhao;
        this.device.devices.push(dev);
      }
      // 未查看的行=当前页码×每页条数 如果大于0说明有剩余行未显示，则可加载
      this.device.count = data.entity.count - this.device.pageNO * 20;
    },
		// 获取套餐组
		getTaocan(uid){
			let params = {ifGetCount: true, ifJoinReference:true, pageSize: 20, pageNO: 1}
			params.condition={};
			params.condition.taocanzu={uid:uid};
      fetch2(BASICURL + 'taocan' + '/getPager.api', this.taocanOnComplate, params);
		},
		taocanOnComplate(data){
			if (!checkResults(data,this)) return
			let taocanData = data.entity.list;
			this.taocan = [];
			for (var i in taocanData) {
				this.taocan.push({key:taocanData[i].feiyong,
					label:taocanData[i].jishi,
					value:taocanData[i].uid});
			}
		},
		//获取所有活动中的手动开启设备
		getActiveDevice(){
			let cookie = getCookie('activeDevices');
			if(cookie !== ''){
				cookie = JSON.parse(cookie);
				let ids = [];
				for (var i in cookie) {
					ids.push(cookie[i].deviceUid)
				}
      	let params = {ifGetCount: true, ifJoinReference:true, pageSize: 100, pageNO: 1};
				params.joinCondition={};
				params.joinCondition.gongsi={};
				params.joinCondition.shebeibianhao={};
				params.joinCondition.taocanzu={};
      	params.filter = {};
      	params.filter.uidList = ids;
      	fetch2(BASICURL + 'shebei' + '/queryPager.api', this.activeOnComplate, params,cookie);
			}else{
				this.tableData = [];
			}
		},
		activeOnComplate(data,state){
      if (!checkResults(data,this)) return
			let device = data.entity.list;
			this.tableData = [];
			for (var i in device) {
				let item={};
				item.id = device[i].shebeibianhao.bianhao;
        item.fangjian = device[i].bushufangjian;
        item.status = device[i].zhuangtai;
				for (var j in state[0]) {
					if(state[0][j].deviceUid === device[i].uid){
						item.start = state[0][j].start;
						item.end = state[0][j].end;
						item.money = state[0][j].money;
					}
				}
				this.tableData.push(item);
			}
		},
		getDate(d = 0){
			let hours,mintus,second;
			let date = new Date().getTime();
			date += d * 1000;
			date = new Date(date);
			hours = date.getHours();
			if(hours < 10) hours = '0' + hours;
			mintus = date.getMinutes();
			if(mintus < 10) mintus = '0' + mintus;
			second = date.getSeconds();
			if(second < 10) second = '0' + second;
			return hours + ':' + mintus + ':' + second;
		}
	}
}
</script>
<style>
.open-logo-box h3{
  color: #d3a243; 
	width: 100%;
  height: 100%;	
}
.open-logo{
  width: 100%;
  height: 52px;
	background: url('../assets/logo-wel.png') no-repeat center;
	background-size: 90px,52px;
}
.open-form{
	width: 300px;
	margin: 0 auto;
}
.object-more{
	display: inline-block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 40px;
}
.running-device{
	margin-top: 10%;
}
.device-list{
	list-style-type:none;
}
.device-list li{
	min-height: 26px;
}
.device-list span{
	display: inline-block;
	min-width: 13%;
}
</style>
