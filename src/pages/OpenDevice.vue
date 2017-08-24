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
				    :key="item.key"
				    :label="item.label"
				    :value="item.value">
						<span style="float: left">{{ item.label }}</span>
  			    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
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
					placeholder="请选择使用时间">
  			  <el-option
  			    v-for="item in taocan"
  			    :key="item.key"
  			    :label="item.label"
  			    :value="item.value">
  			    <span style="float: left">{{ item.label }}</span>
  			    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
  			  </el-option>
  			</el-select>
		  </el-form-item>
			<el-form-item>
  		  <el-button type="warning" size="large" @click="onSubmit">打开设备</el-button>
  		</el-form-item>
		</el-form>
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
			taocan:[]
		}
	},
	methods:{
		changeTaocan(val){
			console.log('taocan',val);
		},
		changeDevice(val){
			console.log('shebei',val);
			for (var i in this.deviceData) {
				if(this.deviceData[i].shebeibianhao.uid === val){
			console.log('val',this.deviceData[i].shebeibianhao.bianhao,val);
					this.getTaocan(this.deviceData[i].taocanzu.uid);
				}					
			}
			// getActiveDevice(val)
		},
		onSubmit(){
			console.log('open',this.formOrder);
			fetch2(BASICURL+'dingdan/companyPay.api',this.createOrder,this.formOrder);
		},
		createOrder(data){
			console.log('创建订单',data);
		},
		moreData () {
      this.device.loading = true
      this.device.pageNO++
			console.log(111);
      // this.getServerObj(this.device)
    },
    remoteMethod (keywords) {
			if(keywords === '') return;
			console.log('remoteMethod');			
      this.device.keywords = keywords
      if (this.device.devices.length === 0) {
        this.device.loading = true
        this.getServerObj(this.device)
      } else {
        let flag = true
        for (var key in this.device.devices) {
          if (this.device.devices[key].text === keywords) {
            flag = false
          }
        }
        if (flag) {
          this.device.loading = true
          this.getServerObj(this.device)
        }
      }
    },
		// 获取对象类型的更多页
    getServerObj (device) {
			console.log('getServerObj');
      // 传入pagenNO可获取更多数据
      // 默认获取20行
      let params = {ifGetCount: true, ifJoinReference:true, pageSize: 3, pageNO: device.pageNO}
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
			console.log('getServerObjOnComplate')
			this.device.loading = false;
      if (!checkResults(data,this)) return
			this.deviceData = data.entity.list;
			this.device.devices = [];
      for (let i = 0; i < this.deviceData.length; i++) {
				let dev = {}
				dev.label = '房间' + this.deviceData[i].bushufangjian;
				dev.value = this.deviceData[i].shebeibianhao.uid;
				dev.key = 'ID' + this.deviceData[i].shebeibianhao.bianhao;
        this.device.devices.push(dev);
      }
      // 未查看的行=当前页码×每页条数 如果大于0说明有剩余行未显示，则可加载
      this.device.count = data.entity.count - this.device.pageNO * 3;
    },
		// 获取套餐组
		getTaocan(uid){
			let params = {ifGetCount: true, ifJoinReference:true, pageSize: 20, pageNO: 1}
			params.condition={};
			params.condition.taocanzu={};
			params.filter = {};
      params.filter.taocanzu = {uid:uid};
      fetch2(BASICURL + 'taocan' + '/getPager.api', this.taocanOnComplate, params);
		},
		taocanOnComplate(data){
			if (!checkResults(data,this)) return
			let taocanData = data.entity.list;
			for (var i in taocanData) {
				this.taocan.push({key:taocanData[i].feiyong/100 + '元',
					label:taocanData[i].jishi/60 + '分钟',
					value:taocanData[i].uid});
			}
		},
		//获取所有活动中的手动开启设备
		getActiveDevice(id){
			// 默认获取20行
			let ids = [];
			let cookie = getCookie('activeDevices');
			if(cookie !== ''){
				let active = JSON.parse(cookie);
				for (var key in active) {
					ids.push(active[key]);
				}
			} 
			ids.push(id);
      let params = {ifGetCount: true, ifJoinReference:true, pageSize: 100, pageNO: 1};
			params.joinCondition={};
			params.joinCondition.gongsi={};
			params.joinCondition.shebeibianhao={};
			params.joinCondition.taocanzu={};
      params.filter = {};
      params.filter.shebeibianhaoList = ids;
      fetch2(BASICURL + 'shebei' + '/queryPager.api', this.activeOnComplate, params);
		},
		activeOnComplate(data){
      if (!checkResults(data,this)) return
			console.log('activeOnComplate',data);	
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
</style>
