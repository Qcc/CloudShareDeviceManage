<template>
  <el-row >
  <el-col :span="24">
    <el-menu v-bind:default-active="activeItem" v-bind:router='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
          <el-menu-item index="feedback">用户反馈</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title"><i class="el-icon-time"></i>酒店管理</template>
          <el-menu-item index="HotelManagement">酒店管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备运维</el-menu-item>
      </el-submenu>
      
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-circle-check"></i>财务统计</template>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: {
    activeItem: {
      type: String,
      default: 'main'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>

</style>
