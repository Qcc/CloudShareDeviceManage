<template>
<div>
  <div class="open-logo-box">
    <div class="open-logo"></div>
		<div>
    	<h3>欢迎使用智足宝足部按摩器</h3>
		</div>
		<hr/>
  </div><br/>
	<div class="open-form">
		<el-form label-position="top" label-width="300px" :model="formOrder">
		  <el-form-item  label="设备">
		    <el-input v-model="formOrder.device" placeholder="请输入房间号"></el-input>
		  </el-form-item>
		  <el-form-item label="使用时间">
		    <el-input v-model="formOrder.taocan" placeholder="请选择使用时间"></el-input>
		  </el-form-item>
			<el-form-item>
  		  <el-button type="warning" @click="onSubmit">打开设备</el-button>
  		</el-form-item>
		</el-form>
	</div>
</div>
</template>
<script>
export default {
  data(){
		return{
			formOrder: {
          device: '',
          taocan: '',
        }
		}
	},
	methods:{
		onSubmit(){
			console.log('open');
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
</style>
