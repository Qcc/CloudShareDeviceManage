<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="订单" name="first">可选时间段内全部/某集团/单个伙伴 金额/消费时间/订单量 柱状图</el-tab-pane>
    <el-tab-pane label="订单排名排名" name="second">可选时间段内全部/某集团/单个伙伴 金额/订单量 排名 顺序 倒序 横向柱状图</el-tab-pane>    
    <el-tab-pane label="详细数据" name="third">可选时间段内全部/某集团/单个伙伴 金额/订单量 排名 顺序 倒序 横向柱状图</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
