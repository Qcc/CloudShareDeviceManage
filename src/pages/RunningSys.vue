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
                <p>{{state.mendian}}家</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box shb">
              <div class="wd-left">投放设备</div>
              <div class="wd-right">
                <p>{{state.shebei}}台</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box rc">
              <div class="wd-left">使用人次</div>
              <div class="wd-right">
                <p>{{state.shiyong}}次</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box shr">
              <div class="wd-left">累计收入</div>
              <div class="wd-right">
                <p>{{state.shouru}}元</p>
                <a>详情>></a>
              </div>
            </div>
            <div class="wel-box hy">
              <div class="wd-left">注册会员</div>
              <div class="wd-right">
                <p>{{state.huiyuan}}人</p>
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
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultValue" @change="handleUsePerson">
              <el-option default  :value="-7" :label="'最近7天'"></el-option>
              <el-option :value="-30" :label="'最近30天'"></el-option>
              <el-option :value="-90" :label="'最近90天'"></el-option>              
            </el-select>
          </div>
          <div class="use-content" id="lineParent">
            <g2-line v-if="this.chartWidth" :isCollpase="isCollpase" :data="lineData"></g2-line>
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
            <span>月收款</span>
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultMoon" @change="handleUseMoney">
              <el-option default  :value="0" :label="'本月'"></el-option>
              <el-option :value="-1" :label="'前一月'"></el-option>
              <el-option :value="-2" :label="'前二月'"></el-option>
            </el-select>
            <!--<el-button class="crd-action" size="mini" type="primary">更多...</el-button>-->
          </div>
          <div class="crd-content">
            <el-table
              :data="tableData"
              show-summary
              :summary-method="summaryMethod"
              align="left"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="money"
                label="收款金额">
              </el-table-column>
              <el-table-column
                prop="count"
                label="使用次数">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="crd-box">
          <div class="header-title" slot="header">
            <span>注册会员</span>
            <el-select class="crd-action" size="mini" style="width:120px" v-model="defaultVip" @change="handleUseVip">
              <el-option default  :value="-7" :label="'最近7天'"></el-option>
              <el-option :value="-30" :label="'最近30天'"></el-option>
              <el-option :value="-90" :label="'最近90天'"></el-option>              
            </el-select>
            <!--<el-button class="crd-action" size="mini" type="primary">更多...</el-button>-->
          </div>
          <div class="crd-content">
            <g2-bar  v-if="this.chartWidth" :isCollpase="isCollpase" :data="barData"></g2-bar>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</el-row>

</template>
<script>
import {setCookie, getCookie,checkResults} from '../utils/utils.js'
import {chartUrl, parnterUrl, fetch2} from '../api/api.js'
import G2Line from '../components/chart/G2line'
import G2Pie from '../components/chart/G2pie'
import G2Bar from '../components/chart/G2bar'
export default {
  data () {
    return {
      defaultValue: -7,
      defaultMoon:0,
      defaultVip:-7,
      // 线图
      chartWidth:null,
      // 覆盖网点，投放设备...
      state:{
        mendian:0,
        shebei:0,
        shiyong:0,
        shouru:0,
        huiyuan:0
      },
      // 使用人次
      useParams:{
        gongsi:null,
        fromDate:this.getDate(new Date(),this.defaultValue),
        toDate:this.getDate(),
        type:1
      },
      // 单日收入
      moneyParams:{
        gongsi:null,
        fromDate:this.getDate(new Date(),this.defaultValue),
        toDate:this.getDate(),
        type:2
      },
      // 注册会员
      vipParams:{
        gongsi:null,
        fromDate:this.getDate(new Date(),this.defaultVip),
        toDate:this.getDate(),
        type:3
      },
      // 累计人次
      renciParams:{
        gongsi:null,
        fromDate:this.getFristLastDay(this.defaultMoon),
        toDate:this.getFristLastDay(this.defaultMoon,true),
        type:1
      },
      // 累计收入
      shouruParams:{
        gongsi:null,
        fromDate:this.getFristLastDay(this.defaultMoon),
        toDate:this.getFristLastDay(this.defaultMoon,true),
        type:2
      },
      // lineData数据格式{"money":35,"count":6,"days":"2017-08-01"},
      lineData: [], 
      lineTempData: [],
      tableTempData:[],
      tableData: [],
      // 柱状图
      barData:[
        {name: '注册会员',data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]},
        {name: '总用户',data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]}]
      // barData:[]
    }
  },
  props: {
    isCollpase: Boolean
  },
  mounted: function () {
    let cookie = getCookie('defaultDate');
    if(cookie !== ''){
      cookie = JSON.parse(cookie);
      if(cookie.defaultValue !== undefined) this.defaultValue = cookie.defaultValue;
      if(cookie.defaultVip !== undefined) this.defaultVip = cookie.defaultVip;
      if(cookie.defaultMoon !== undefined) this.defaultMoon = cookie.defaultMoon;
    }
    // 使用人次
    this.useParams.fromDate = this.getDate(new Date(),this.defaultValue);
    // 单日收入
    this.moneyParams.fromDate = this.getDate(new Date(),this.defaultValue);
    // 注册会员
    this.vipParams.fromDate = this.getDate(new Date(),this.defaultVip);
    // 使用人次
    this.renciParams.fromDate = this.getFristLastDay(this.defaultMoon);
    this.renciParams.toDate = this.getFristLastDay(this.defaultMoon,true);
    // 累计收入
    this.renciParams.fromDate = this.getFristLastDay(this.defaultMoon);
    this.renciParams.toDate = this.getFristLastDay(this.defaultMoon,true);
    this.shouruParams.fromDate = this.getFristLastDay(this.defaultMoon);
    this.shouruParams.toDate = this.getFristLastDay(this.defaultMoon,true);
    this.getParChartData();
    this.getLineChartData();
    this.getShouruData();
    // this.getBarChartData();

    var lineParent = document.getElementById('lineParent');
    //图形容器就绪能够获取到宽度时，开始渲染图像
    var interVal = setInterval(()=>{
      if(lineParent.offsetWidth > 0){
        this.chartWidth = lineParent.offsetWidth;
        clearInterval(interVal);
      }
    },10);  
  },
  methods: {
    summaryMethod(param){
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index === 1) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
            sums[index] ='¥ '+ sums[index] +' 元';
          }
          if (index === 2) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] +=' 次';
          }
        });
      return sums;
    },
    handleUsePerson (val) {
      let cookie = getCookie('defaultDate');
      if(cookie !== ''){
        cookie = JSON.parse(cookie);
      }else{
        cookie = {}
      }
      cookie.defaultValue = val;
      setCookie('defaultDate',JSON.stringify(cookie),365);
      this.useParams.fromDate = this.getDate(new Date(),val);
      this.moneyParams.fromDate = this.getDate(new Date(),val);
      this.getLineChartData();
    },
    handleUseMoney (val) {
      let cookie = getCookie('defaultDate');
      if(cookie !== ''){
        cookie = JSON.parse(cookie);
      }else{
        cookie = {}
      }
      cookie.defaultMoon = val;
      setCookie('defaultDate',JSON.stringify(cookie),365);
      this.renciParams.fromDate = this.getFristLastDay(val);
      this.renciParams.toDate = this.getFristLastDay(val,true);
      this.shouruParams.fromDate = this.getFristLastDay(val);
      this.shouruParams.toDate = this.getFristLastDay(val,true);      
      this.getShouruData();
    },
    handleUseVip (val) {
      let cookie = getCookie('defaultDate');
      if(cookie !== ''){
        cookie = JSON.parse(cookie);
      }else{
        cookie = {}
      }
      cookie.defaultVip = val;
      setCookie('defaultDate',JSON.stringify(cookie),365);
    },
    // 伙伴统计
    getParChartData(){
      fetch2(parnterUrl,this.onComplate,{},{});
    },
    // 使用人次
    getLineChartData(){
      fetch2(chartUrl,this.onComplate,this.useParams,this.useParams);
    },
    // 注册会员
    getBarChartData(){
      fetch2(chartUrl,this.onComplate,this.vipParams,this.vipParams);
    },
    // 月收款
    getShouruData(){
      fetch2(chartUrl,this.onMonthComplate,this.renciParams,this.renciParams);
    },
    onComplate(data,state){
      if(!checkResults(data,this)) return;
      // 覆盖网点，设备总数请求
      if(this.isEmptyObject(state[0])){
        this.state.mendian = data.entity.mengdianzs;
        this.state.shebei = data.entity.toufangsbzs;
        this.state.shiyong = data.entity.shiyongrczs;
        this.state.shouru = data.entity.shoufeizs / 100;
        this.state.huiyuan = data.entity.zhucehyzs;
      } else {
        // 使用人次请求
        if(state[0].type === 1){
          this.lineTempData = this.filledData(data.entity,state[0]);
          fetch2(chartUrl,this.onComplate,this.moneyParams,this.moneyParams);
          // 消费金额请求
        }else if(state[0].type === 2){
          let filledData = data.entity;
          for (let i =0; i < filledData.length;i++) {
            for (var key in this.lineTempData) {
              if(this.lineTempData[key].days === filledData[i].days){
                this.lineTempData[key].money = filledData[i].money;
                continue; 
              }
            }
          }
          for (var key in this.lineTempData) {
            this.lineTempData[key].money = this.lineTempData[key].money / 100;
          }
          this.lineData = this.lineTempData;
        }else if(state[0].type === 3){
          // console.log('注册会员',data.entity);
        }
      }
    },
    onMonthComplate(data,state) {
      if(!checkResults(data,this)) return;
      this.tableTempData = this.filledData(data.entity,state[0]);
      fetch2(chartUrl,this.onMonthComplate2,this.shouruParams,this.shouruParams);
    },
    onMonthComplate2(data){
      if(!checkResults(data,this)) return;
      let filledData = data.entity;
      for (let i =0; i < filledData.length;i++) {
        for (var key in this.tableTempData) {
          if(this.tableTempData[key].days === filledData[i].days){
            this.tableTempData[key].money = filledData[i].money;
            continue; 
          }
        }
      }
      // for (var key in this.tableTempData) {
      //   this.tableTempData[key].money = this.tableTempData[key].money / 100; 
      // }
      let count=0,money=0;
      this.tableData =[];
      for (let i = 0; i < this.tableTempData.length;i++) {
        count += this.tableTempData[i].count;
        money += this.tableTempData[i].money;
        if(i!=0 && i/7 === 1){
          this.tableData.push({'count':count,'money':money/100,'name':'第一周'});
          count=0;
          money=0;
        }
        if(i!=0 && i/14 === 1){
          this.tableData.push({'count':count,'money':money/100,'name':'第二周'});
          count=0;
          money=0;
        }
        if(i!=0 && i/21 === 1){
          this.tableData.push({'count':count,'money':money/100,'name':'第三周'});
          count=0;
          money=0;
        }
        if(i!=0 && i === this.tableTempData.length-1){
          this.tableData.push({'count':count,'money':money/100,'name':'第四周'});
          count=0;
          money=0;
        }
      }
    },
    // 线性图标补全不连续日期
    filledData(data,params){
      let day = params.fromDate;
      let fData = [];
      while(new Date(params.toDate).getTime() >= new Date(day).getTime()){
        let flag = false;
        for (let i = 0; i < data.length; i++) {
          if(data[i].days === day){
            fData.push(data[i]);
            data.splice(i,1);
            flag = true;
            continue;
          }
        }
        if(!flag){
          fData.push({money:0,count:0,days:day});
        }
        day = this.getDate(day,1);
      };
      return fData;
    },
    //获取字符串日期
    getDate(days = new Date(),count = 0){
      let date,year,month,day;
      let milliSeconds = new Date(days).getTime();
      count = count*24*60*60*1000;
      date = new Date(milliSeconds + count);
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      if(month < 10) month ='0' + month;
      if(day < 10) day = '0' + day;
      return year + '-' + month + '-' + day;
    },
    //获取月头月尾日期，last=true获取最后一天
    getFristLastDay(months = 0,last = false){
      let date,year,y,month,m,day,reDate;
      date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
      day = date.getDate();
      if(months > 0){
        while(months>0){
          if(month>11){
            year++;
            month = 1;
          }else{
            month++;
          }
          months--;
        }
      }else if(months < 0){
         while(months < 0){
          if(month <= 1){
            year--;
            month = 12;
          }else{
            month--;
          }
          months++;
        }
      }
      if(month < 10) month = '0' + month;
      reDate = year + '-' + month + '-' + '01';
      if(last){
        let d = new Date(year,month,0).getDate();
        if(d < 10) d = '0' + d;
        reDate = year + '-' + month + '-' + d;
      }
      return  reDate;            
    },
    getMonthLastDay(m = 0){
      let date,year,month,day;
      date = new Date();
      year = date.getFullYear();
      day = date.getDate();
      month = date.getMonth() + 1 + m
      return year + '-' + month + '-' + '01';

      function getFirstAndLastMonthDay( year, month){    
               var   firstdate = year + '-' + month + '-01';  
               var  day = new Date(year,month,0);   
               var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期
  //给文本控件赋值。同下
               return lastdate;  
            }
    },
    isEmptyObject( obj ) {    
      var name;  
      for ( name in obj ) {        
        return false;
      }    
      return true;
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
