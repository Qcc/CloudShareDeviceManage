<template>
  <el-row >
  <el-col :span="24">
    <el-menu v-bind:default-active="activeItem" v-bind:router='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <!--云享管理员菜单-->
      <el-submenu v-if="manager" index="1">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
          <el-menu-item index="feedback">用户反馈</el-menu-item>
      </el-submenu>
      <el-submenu v-if="manager" index="2">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="HotelManagement">伙伴管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="manager" index="3">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备运维</el-menu-item>
          <el-menu-item index="deviceOps">连接状态监控</el-menu-item>
          <el-menu-item index="deviceOps">套餐配置</el-menu-item>
          <el-menu-item index="deviceOps">设备配置</el-menu-item>
          <el-menu-item index="deviceOps">分组管理</el-menu-item>
          <el-menu-item index="deviceOps">订单管理</el-menu-item>
          <el-menu-item index="deviceOps">积分管理</el-menu-item>
          <el-menu-item index="deviceOps">设备维护记录</el-menu-item>                              
      </el-submenu>
      <el-submenu v-if="manager" index="4">
        <template slot="title"><i class="el-icon-circle-check"></i>财务统计</template>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
      <!--云享员工菜单-->
      <el-submenu v-if="employee" index="1">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
          <el-menu-item index="feedback">用户反馈</el-menu-item>
      </el-submenu>
      <el-submenu v-if="employee" index="2">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="HotelManagement">伙伴管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="employee" index="3">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备运维</el-menu-item>
          <el-menu-item index="deviceOps">连接状态监控</el-menu-item>
          <el-menu-item index="deviceOps">套餐配置</el-menu-item>
          <el-menu-item index="deviceOps">设备配置</el-menu-item>
          <el-menu-item index="deviceOps">分组管理</el-menu-item>
          <el-menu-item index="deviceOps">订单管理</el-menu-item>
          <el-menu-item index="deviceOps">积分管理</el-menu-item>
          <el-menu-item index="deviceOps">设备维护记录</el-menu-item>                              
      </el-submenu>
      <el-submenu v-if="employee" index="4">
        <template slot="title"><i class="el-icon-circle-check"></i>财务统计</template>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴管理员菜单-->
      <el-submenu v-if="pManager" index="1">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
          <el-menu-item index="feedback">用户反馈</el-menu-item>
      </el-submenu>
      <el-submenu v-if="pManager" index="2">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="HotelManagement">伙伴管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="pManager" index="3">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备运维</el-menu-item>
          <el-menu-item index="deviceOps">连接状态监控</el-menu-item>
          <el-menu-item index="deviceOps">套餐配置</el-menu-item>
          <el-menu-item index="deviceOps">设备配置</el-menu-item>
          <el-menu-item index="deviceOps">分组管理</el-menu-item>
          <el-menu-item index="deviceOps">订单管理</el-menu-item>
          <el-menu-item index="deviceOps">积分管理</el-menu-item>
          <el-menu-item index="deviceOps">设备维护记录</el-menu-item>                              
      </el-submenu>
      <el-submenu v-if="pManager" index="4">
        <template slot="title"><i class="el-icon-circle-check"></i>财务统计</template>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴员工菜单-->
      <el-submenu v-if="pEmployee" index="1">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
          <el-menu-item index="feedback">用户反馈</el-menu-item>
      </el-submenu>
      <el-submenu v-if="pEmployee" index="2">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="HotelManagement">伙伴管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="pEmployee" index="3">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备运维</el-menu-item>
          <el-menu-item index="deviceOps">连接状态监控</el-menu-item>
          <el-menu-item index="deviceOps">套餐配置</el-menu-item>
          <el-menu-item index="deviceOps">设备配置</el-menu-item>
          <el-menu-item index="deviceOps">分组管理</el-menu-item>
          <el-menu-item index="deviceOps">订单管理</el-menu-item>
          <el-menu-item index="deviceOps">积分管理</el-menu-item>
          <el-menu-item index="deviceOps">设备维护记录</el-menu-item>                              
      </el-submenu>
      <el-submenu v-if="pEmployee" index="4">
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
    // 默认打开打菜单项
    activeItem: {
      type: String,
      default: 'main'
    },
    // 伙伴管理员菜单
    pManager: {
      type: Boolean,
      default: false
    },
    // 伙伴员工菜单
    pEmployee: {
      type: Boolean,
      default: false
    },
    // 云享管理员菜单
    manager: {
      type: Boolean,
      default: false
    },
    // 云享员工菜单
    employee: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>
<style>

</style>
