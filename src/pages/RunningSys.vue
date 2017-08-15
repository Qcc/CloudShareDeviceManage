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
                <p>300台</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box rc">
              <div class="wd-left">使用人次</div>
              <div class="wd-right">
                <p>23421次</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box shr">
              <div class="wd-left">累计收入</div>
              <div class="wd-right">
                <p>124520003元</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box hy">
              <div class="wd-left">注册会员</div>
              <div class="wd-right">
                <p>8201人</p>
                <a>详情>></a>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>使用人次</span>
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultValue" @change="handleUse">
              <el-option default  :value="7" :label="'最近7天'"></el-option>
              <el-option :value="30" :label="'最近30天'"></el-option>
              <el-option :value="90" :label="'最近90天'"></el-option>              
            </el-select>
          </div>
          <div class="use-content" id="lineParent">
            <g2-line v-if="this.chartWidth" :isCollpase="isCollpase" :data="lineData1" :dash="lineData2"></g2-line>
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
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultValue" @change="handleUse">
              <el-option default  :value="7" :label="'最近7天'"></el-option>
              <el-option :value="30" :label="'最近30天'"></el-option>
              <el-option :value="90" :label="'最近90天'"></el-option>              
            </el-select>
            <!--<el-button class="crd-action" size="mini" type="primary">更多...</el-button>-->
          </div>
          <div class="crd-content">
            <g2-pie  v-if="this.chartWidth" :isCollpase="isCollpase" :charData="pieData"></g2-pie>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>注册会员</span>
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultValue" @change="handleUse">
              <el-option default  :value="7" :label="'最近7天'"></el-option>
              <el-option :value="30" :label="'最近30天'"></el-option>
              <el-option :value="90" :label="'最近90天'"></el-option>              
            </el-select>
            <!--<el-button class="crd-action" size="mini" type="primary">更多...</el-button>-->
          </div>
          <div class="crd-content">
            <g2-bar  v-if="this.chartWidth" :isCollpase="isCollpase" :charData="barData"></g2-bar>
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
      // 线图
      chartWidth:null,
      lineData1: [
        {"date":1489593600000, "pv":17, "successRate":0.23529411764705882, "time":12351000, "count":4},
        {"date":1489680000000, "pv":10, "successRate":0.6, "time":18000, "count":6},
        {"date":1489766400000, "pv":3, "successRate":0, "time":0, "count":0},
        {"date":1489852800000, "pv":3, "successRate":0, "time":0, "count":0},
        {"date":1489939200000, "pv":18, "successRate":0.2222222222222222, "time":21157000, "count":4},
        {"date":1490025600000, "pv":32, "successRate":0.25, "time":3543000, "count":8},
        {"date":1490112000000, "pv":25, "successRate":0.56, "time":10000, "count":14},
        {"date":1490198400000, "pv":23, "successRate":0.43478260869565216, "time":24000, "count":10},
        {"date":1490284800000, "pv":7, "successRate":0.2857142857142857, "time":0, "count":2}
      ],
      lineData2 :[
        {"count":4, "date":1489593600000, "time":600},
        {"count":6, "date":1489680000000, "time":18000},
        {"count":0, "date":1489766400000, "time":0},
        {"count":0, "date":1489852800000, "time":2000},
        {"count":4, "date":1489939200000, "time":21157000},
        {"count":8, "date":1490025600000, "time":2500},
        {"count":14, "date":1490112000000, "time":25002},
        {"count":10, "date":1490198400000, "time":24000},
        {"count":2, "date":1490284800000, "time":0}
      ],
      // 饼图
      pieData:[
        {name: '使用', value: 70.95 },
        {name: '闲置', value: 27.47},
        {name: '故障', value: 1.58}],
      // 柱状图
      barData:[
        {name: '注册会员',data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
        {name: '总用户',data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]}]
    }
  },
  props: {
    isCollpase: Boolean
  },
  mounted: function () {
    var lineParent = document.getElementById('lineParent');
    //图形容器就绪能够获取到宽度时，开始渲染图像
    var interVal = setInterval(()=>{
      if(lineParent.offsetWidth > 0){
        this.chartWidth = lineParent.offsetWidth;
        clearInterval(interVal);
      }
    },5);  
  },
  methods: {
    handleUse (val) {
      console.log(val)
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
  margin: 0 10px;  
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
  position: relative;
  width: 195px;
  cursor: pointer;
  margin-bottom: 15px;
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
  width: 125px;
  height: 40px;
  text-align: left;
  border-radius: 5px;
}
.wd-right>p{
  line-height: 14px;
  margin: 3px 0;
  text-align: left;
  font-size: 14px;
}
.wd-right>a{
  font-size: 12px;
  color: #108ee9;
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
