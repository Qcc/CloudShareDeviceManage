<template>
  <el-row >
  <el-col :span="24">
    <el-menu 
      v-bind:router='true'
      :default-openeds = "openedSubmenu(curUserId)"
      :default-active = "activeItem"
      :open="handleOpen"
      :close="handleClose"
      class="el-menu-vertical-demo">
      <!--云享管理员菜单-->
      <el-submenu v-if="curUserId === 2026226681" index="101">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="default">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="102">
        <template slot="title"><i class="el-icon-menu"></i>角色管理</template>
          <el-menu-item index="userManager">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="103">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="partnerManager">伙伴管理</el-menu-item>
          <!--<el-menu-item index="partnerInfo">伙伴运营信息</el-menu-item>-->
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="104">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceManager">设备管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="105">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="combo">套餐配置</el-menu-item>
          <el-menu-item index="orderManager">订单管理</el-menu-item>
          <el-menu-item index="point">积分管理</el-menu-item>
          <el-menu-item index="performance">业绩统计</el-menu-item>
      </el-submenu>
      <!--云享员工菜单-->
      <el-submenu v-if="curUserId === 2031278906" index="201">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="default">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="202">
        <template slot="title"><i class="el-icon-time"></i>伙伴管理</template>
          <el-menu-item index="HotelManagement">伙伴管理</el-menu-item>
          <el-menu-item index="HotelStatus">运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="203">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceOps">设备配置</el-menu-item>
          <el-menu-item index="devicePuton">设备投放</el-menu-item>
          <el-menu-item index="deviceOps">设备监控</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="204">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="deviceOps">套餐配置</el-menu-item>
          <el-menu-item index="deviceOps">订单管理</el-menu-item>
          <el-menu-item index="deviceOps">积分管理</el-menu-item>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴管理员菜单-->
      <el-submenu v-if="curUserId === -2139060392" index="301">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="302">
        <template slot="title"><i class="el-icon-time"></i>门店管理</template>
          <el-menu-item index="HotelStatus">门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="303">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceOps">设备监控</el-menu-item>
          <el-menu-item index="deviceOps">更换设备</el-menu-item>                    
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="304">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="FinancialStatistics">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴员工菜单-->
      <el-submenu v-if="curUserId === -2134008167" index="401">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="main">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="402">
        <template slot="title"><i class="el-icon-time"></i>门店管理</template>
          <el-menu-item index="HotelStatus">门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="403">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceOps">设备监控</el-menu-item>
          <el-menu-item index="deviceOps">更换设备</el-menu-item>          
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="404">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
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
      default: ''
    },
    // 当前伙伴ID
    curUserId: {
      type: Number
    }
  },
  methods: {
    openedSubmenu (curUserId) {
      let openMenu = []
      switch (curUserId) {
        case 2026226681:
          openMenu.push('101')
          break
        case 2031278906:
          openMenu.push('201')
          break
        case -2139060392:
          openMenu.push('301')
          break
        case -2134008167:
          openMenu.push('401')
          break
      }
      return openMenu
    },
    handleOpen (index, path) {
      console.log(index, path)
    },
    handleClose (index, path) {
      console.log(index, path)
    }
  }
}
</script>
<style>

</style>
