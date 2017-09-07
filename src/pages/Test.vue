<template>
<div class="test-device">
  <el-form :model="form" :rules="rules" ref="ruleForm">
  	<el-form-item label="设备MAC"  prop="mac">
  	  <el-input v-model="form.mac" placeholder="请输入设备MAC地址"></el-input>
  	</el-form-item>
		<el-form-item>
  	  <el-button type="success" @click="openDevice('ruleForm')">打开设备</el-button>
  	  <el-button type="primary" @click="closeDevice('ruleForm')">关闭设备</el-button>			
  	</el-form-item>
  </el-form>
</div>
</template>
<script>
import {setCookie, getCookie,checkResults} from '../utils/utils.js'
import {ROOTURL, fetch2} from '../api/api.js'
export default {
  data(){
      return{
          form:{
						mac:''
					},
					rules: {
          	mac: [
          	  { required: true, message: '请输入设备MAC地址', trigger: 'change' },
          	  { min: 12, max: 12, message: 'MAC地址长度为12个字符', trigger: 'change' }
          	]
					}
      }
  },
  methods:{
      openDevice(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
						let params ={};
						params.type =1;
						params.mac = this.form.mac;
            fetch2(ROOTURL+'/public/shebei/debugDevice.api',this.onComplate,params);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			closeDevice(formName){
				this.$refs[formName].validate((valid) => {
          if (valid) {
            let params ={};
						params.type =0;
						params.mac = this.form.mac;
            fetch2(ROOTURL+'/public/shebei/debugDevice.api',this.onComplate,params);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			onComplate(data){
				if(!checkResults(data,this)) return;
				if(data.entity === 1){
					this.$notify({
        	  title: '成功',
        	  message: '操作成功！',
        	  type: 'success'
        	});
				}else{
					this.$notify.error({
          title: '错误',
          message: '操作失败！'
        });
				}
			}
  }
}
</script>
<style>
.test-device{
	margin: 50px auto;
	width: 400px;
}
</style>
