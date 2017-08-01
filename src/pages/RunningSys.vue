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
            <div class="wel-box wd">
              <div class="wd-left">覆盖网点</div>
              <div class="wd-right">
                <p>5家</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box shb">
              <div class="wd-left">投放设备</div>
              <div class="wd-right">
                <p>5家</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box rc">
              <div class="wd-left">使用人次</div>
              <div class="wd-right">
                <p>5家</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box shr">
              <div class="wd-left">累计收入</div>
              <div class="wd-right">
                <p>5家</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box hy">
              <div class="wd-left">注册会员</div>
              <div class="wd-right">
                <p>5家</p>
                <a>详情>></a>
              </div>
            </div>
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
            <g2-line :charData="lineData"></g2-line>
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
            <span>使用率</span>
            <el-button class="crd-action" size="mini" type="primary">更多...</el-button>
          </div>
          <div class="crd-content">
            <g2-pie :charData="sectorData"></g2-pie>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>注册会员</span>
            <el-button class="crd-action" size="mini" type="primary">更多...</el-button>
          </div>
          <div class="crd-content">
            <g2-bar :charData="barData"></g2-bar>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</el-row>

</template>
<script>
import G2Line from '../components/chart/G2line'
import G2Pie from '../components/chart/G2pie'
import G2Bar from '../components/chart/G2bar'
export default {
  data () {
    return {
      defaultValue: 7,
      house: 5,
      device: 230,
      users: 2681,
      allVip: 3200,
      // 线图
      lineData:[{month: 'Jan', temperature: 7.0},
        {month: 'Feb', temperature: 6.9},
        {month: 'Mar', temperature: 9.5},
        {month: 'Apr', temperature: 14.5},
        {month: 'May', temperature: 18.2},
        {month: 'Jun', temperature: 21.5},
        {month: 'Jul', temperature: 25.2},
        {month: 'Aug', temperature: 26.5},
        {month: 'Sep', temperature: 23.3},
        {month: 'Oct', temperature: 18.3},
        {month: 'Nov', temperature: 13.9},
        {month: 'Dec', temperature: 9.6}],
      // 饼图
      sectorData:[
        {name: 'IE', value: 56.33 },
        {name: 'Chrome', value: 24.03},
        {name: 'Firefox', value: 10.38},
        {name: 'Safari',  value: 4.77},
        {name: 'Opera', value: 0.91},
        {name: 'Pu', value: 0.2}],
      // 柱状图
      barData:[
        {name: 'Tokyo',data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
        {name: 'New York',data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]},
        {name: 'London',data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]},
        {name: 'Berlin',data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]}]
    }
  },
  methods: {
    handleUse (val) {
    }
  },
  components:{
    G2Line,
    G2Pie,
    G2Bar    
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
.welcom-content{
  min-height: 120px;
  position: relative;
}
.use-content{
  min-height: 320px;
}
.crd-action{
  float: right;
}
.crd-content{
  min-height: 220px;
}
.wel-box{
  float: left;
  margin: 0 30px 10px 30px;
  position: relative;
  width: 120px;
  cursor: pointer;
}
.wd-left{
  float: left;
  padding: 5px 10px;
  font-size: 16px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.wd-right{
  float: right;
  padding: 5px 0;
  width: 45px;
  height: 40px;
  border-radius: 5px;
}
.wd-right>p{
  line-height: 14px;
  margin: 3px 0;
  text-align: left;
  font-size: 14px;
}
.wd-right>a{
  font-size: 14px;
}
.wd>.wd-left{
  border-left: 4px solid #faa30d;
}
.shb>.wd-left{
  border-left: 4px solid #f00;
}
.rc>.wd-left{
  border-left: 4px solid #b226d5;
}
.shr>.wd-left{
  border-left: 4px solid #0dc5fa;
}
.hy>.wd-left{
  border-left: 4px solid #0bcc86;
}
</style>
