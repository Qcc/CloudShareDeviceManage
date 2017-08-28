<template>
  <div class="revenue-box">
      <p>营业额</p><a>3250.00</a>
      <p>现金收款</p><a>1250.00</a>
      <p>系统收款</p><a>2000.00</a>
      <p>分成比例</p><a>50%</a>      
      <p>当月应收</p><a>3250.00</a>
      <p>当月应付</p><a>3250.00</a>
      <el-date-picker
        v-model="monthValue"
        clearable
        type="month"
        default-value="2017-08"
        placeholder="请选择结算月份">
      </el-date-picker>
      <hr/>

  </div>
</template>
<script>
export default {
  data(){
      return{
        monthValue:'',
        defauleMonth:new Date()
      }
  }
}
</script>
<style>
.revenue-box>p{
  line-height: 16px;
  margin: 3px 0;
  text-align: left;
  font-size: 14px;
}
.revenue-box>a{
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
