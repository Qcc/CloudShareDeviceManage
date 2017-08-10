<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="消费时间" name="first">时间范围内 24小时消费时间 区域图</el-tab-pane>
    <el-tab-pane label="加钟消费" name="second">时间范围内 消费者加钟消费 饼图</el-tab-pane>
    <el-tab-pane label="注册会员" name="third">时间范围内 消费者使用后注册会员 饼图</el-tab-pane>
    <el-tab-pane label="老客户转化" name="fourth">时间范围内 新老客户比例 第二次使用为老客户 饼图 </el-tab-pane>
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
