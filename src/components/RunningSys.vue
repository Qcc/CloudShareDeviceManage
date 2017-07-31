<template>
<el-row>
  <el-col :span="14" style="margin-right:15px">
    <el-row>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>欢迎云享智能设备管理平台</span>
          </div>
          <div class="welcom-content">
            <el-row :gutter="10"><el-col :span="6">
              <span class="wel-house"> 门店总数 : </span><span>{{house}}</span>
              </el-col>
              <el-col :span="17">
                <el-progress class="progress" :text-inside="true" status="exception" :stroke-width="18" :percentage="35"></el-progress>                  
              </el-col>
            </el-row>
            <el-row :gutter="10"><el-col :span="6">
              <span class="wel-house"> 投放设备总数 : </span><span>{{device}}</span>
              </el-col>
              <el-col :span="17">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="75"></el-progress>                  
              </el-col>
            </el-row>
            <el-row :gutter="10"><el-col :span="6">
              <span class="wel-house"> 用户总数 : </span><span>{{users}}</span>
              </el-col>
              <el-col :span="17">
                <el-progress :text-inside="true" :stroke-width="18" status="success" :percentage="85"></el-progress>                  
              </el-col>
            </el-row>
            <el-row :gutter="10"><el-col :span="6">
              <span class="wel-house"> 注册会员总数 : </span><span>{{allVip}}</span>
              </el-col>
              <el-col :span="17">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="65"></el-progress>                  
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>使用频次</span>
            <el-select class="crd-action" size="mini" v-model="defaultValue" @change="handleUse"  placeholder="请选择">
              <el-option default  :value="7" :label="'最近7天'"></el-option>
              <el-option :value="30" :label="'最近30天'"></el-option>
              <el-option :value="90" :label="'最近90天'"></el-option>              
            </el-select>
          </div>
          <div class="use-content">
            <el-progress type="circle" :percentage="33" status="success"></el-progress>            
            <el-progress type="circle" :percentage="55"></el-progress>
            <el-progress type="circle" :percentage="100" status="success"></el-progress>
            <el-progress type="circle" :percentage="30" status="exception"></el-progress>
            <div>
              <span>使用次数 ：</span><span>{{use}}</span> /
              <span>使用率 ：</span><span>{{uselv}}%</span> /
              <span>累计收费 ：</span><span>{{money}}</span> /
              <span>注册会员 ：</span><span>{{vip}}</span>              
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
  <el-col :span="9">
    <el-row>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>最新通知</span>
            <el-button class="crd-action" size="mini" type="primary">更多...</el-button>
          </div>
          <div class="crd-content">
            <span>暂无最新通知</span>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>云享智能信息</span>
            <el-button class="crd-action" size="mini" type="primary">更多...</el-button>
          </div>
          <div class="crd-content">
            <span>暂无信息</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</el-row>

</template>
<script>
export default {
  data () {
    return {
      defaultValue: 7,
      house: 5,
      device: 230,
      users: 2681,
      allVip: 3200,
      use: 3520,
      uselv: 22.6,
      money: 165200,
      vip: 3200
    }
  },
  methods: {
    handleUse (val) {
    }
  }
}
</script>
<style>
.crd-box{
  margin-bottom: 10px;
}
.header-title{
  text-align: left;
  height: 15px;
}
.header-title>span{
  line-height: 15px;
}
.progress{
  color: red;
}
.welcom-content{
  min-height: 80px;
}
.use-content{
  min-height: 320px;
}
.crd-action{
  float: right;
}
.crd-content{
  min-height: 200px;
}

</style>
