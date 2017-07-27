<template>
 <div id="app">
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu :collapse="isCollapse">
      <el-menu-item index="2">
        导航二
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    }
  }
</script>