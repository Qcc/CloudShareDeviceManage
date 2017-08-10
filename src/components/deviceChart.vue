<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="使用率" name="first">时间范围内 全部/某集团/单个伙伴 设备使用率（1天使用1次有效）饼图</el-tab-pane>
    <el-tab-pane label="运行时间" name="second">时间范围内 全部/某集团/单个伙伴 设备总运行时间（每天时间） 区域图</el-tab-pane>
    <el-tab-pane label="损坏比例" name="third">时间范围内 全部/某集团/单个伙伴 设备故障率 饼图</el-tab-pane>
    <el-tab-pane label="使用排名" name="fourth">时间范围内 全部/某集团/单个伙伴 使用率 使用时间 故障排名 柱状图</el-tab-pane>    
    <el-tab-pane label="详细数据" name="fiveth">表格展示详细数据 </el-tab-pane>    
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
