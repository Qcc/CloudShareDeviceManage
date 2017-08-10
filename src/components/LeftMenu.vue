<template>
  <el-row >
  <el-col :span="24">
    <el-menu 
      @open="handleOpen"
      :collapse="collpase"
      @close="handleClose"
      :default-openeds = "openedMenu"
      :default-active = "activeItem"
      @select = "handleSelect">
      <!--云享管理员菜单-->
      <el-submenu v-if="curUserId === 2026226681" index="101">
        <template slot="title"><i class="el-icon-information"></i><span slot="title">系统信息</span></template>
          <el-menu-item class="MenuItem" index="default"> 运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="102">
        <template slot="title"><i class="el-icon-menu"></i><span slot="title">用户管理</span></template>
          <el-menu-item class="MenuItem" index="userManager"> 用户管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="103">
        <template slot="title"><i class="el-icon-time"></i><span slot="title">伙伴管理</span></template>
          <el-menu-item class="MenuItem" index="partnerManager"> 伙伴管理</el-menu-item>
          <!--<el-menu-item class="MenuItem" index="partnerInfo">伙伴运营信息</el-menu-item>-->
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="104">
        <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备管理</span></template>
          <el-menu-item class="MenuItem" index="deviceId"> 编号管理</el-menu-item>          
          <el-menu-item class="MenuItem" index="deviceManager"> 设备管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="105">
        <template slot="title"><i class="el-icon-circle-check"></i><span slot="title">运维管理</span></template>
          <el-menu-item class="MenuItem" index="combo"> 套餐配置</el-menu-item>
          <el-menu-item class="MenuItem" index="comboGroup"> 套餐组配置</el-menu-item>          
          <el-menu-item class="MenuItem" index="orderManager"> 订单管理</el-menu-item>
          <el-menu-item class="MenuItem" index="guke"> 消费者</el-menu-item>
          <el-menu-item class="MenuItem" index="point"> 积分管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="106">
        <template slot="title"><i class="el-icon-picture"></i><span slot="title">运维统计</span></template>
          <el-menu-item class="MenuItem" index="personnelChart"> 消费习惯</el-menu-item>
          <el-menu-item class="MenuItem" index="deviceChart"> 设备使用</el-menu-item>          
          <el-menu-item class="MenuItem" index="orderChart"> 订单套餐</el-menu-item>
      </el-submenu>
      <!--云享员工菜单-->
      <el-submenu v-if="curUserId === 2031278906" index="201">
        <template slot="title"><i class="el-icon-information"></i><span slot="title">系统信息</span></template>
          <el-menu-item class="MenuItem" index="default"> 运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="202">
        <template slot="title"><i class="el-icon-time"></i><span slot="title">伙伴管理</span></template>
          <el-menu-item class="MenuItem" index="partnerManager"> 伙伴管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="203">
        <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备管理</span></template>
          <el-menu-item class="MenuItem" index="deviceId"> 编号管理</el-menu-item> 
          <el-menu-item class="MenuItem" index="deviceManager"> 设备管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="204">
        <template slot="title"><i class="el-icon-circle-check"></i><span slot="title">运维管理</span></template>
          <el-menu-item class="MenuItem" index="combo"> 套餐配置</el-menu-item>
          <el-menu-item class="MenuItem" index="comboGroup"> 套餐组配置</el-menu-item>          
          <el-menu-item class="MenuItem" index="orderManager"> 订单管理</el-menu-item>
          <el-menu-item class="MenuItem" index="guke"> 消费者</el-menu-item> 
          <el-menu-item class="MenuItem" index="point"> 积分管理</el-menu-item>
      </el-submenu>
      <!--伙伴管理员菜单-->
      <el-submenu v-if="curUserId === -2139060392" index="301">
        <template slot="title"><i class="el-icon-information"></i><span slot="title">系统信息</span></template>
          <el-menu-item class="MenuItem" index="default"> 运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="302">
        <template slot="title"><i class="el-icon-time"></i><span slot="title">门店管理</span></template>
          <el-menu-item class="MenuItem" index="partnerManager"> 门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="303">
        <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备管理</span></template>
          <el-menu-item class="MenuItem" index="deviceManager"> 设备监控</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="304">
        <template slot="title"><i class="el-icon-circle-check"></i><span slot="title">运维管理</span></template>
          <el-menu-item class="MenuItem" index="combo"> 查看套餐</el-menu-item>
          <el-menu-item class="MenuItem" index="comboGroup"> 查看套餐组</el-menu-item>          
          <el-menu-item class="MenuItem" index="orderManager"> 查看订单</el-menu-item>
      </el-submenu>
      <!--伙伴员工菜单-->
      <el-submenu v-if="curUserId === -2134008167" index="401">
        <template slot="title"><i class="el-icon-information"></i><span slot="title">系统信息</span></template>
          <el-menu-item class="MenuItem" index="default"> 运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="402">
        <template slot="title"><i class="el-icon-time"></i><span slot="title">门店管理</span></template>
          <el-menu-item class="MenuItem" index="partnerManager"> 门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="403">
        <template slot="title"><i class="el-icon-setting"></i><span slot="title">设备管理</span></template>
          <el-menu-item class="MenuItem" index="deviceManager"> 设备监控</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="404">
        <template slot="title"><i class="el-icon-circle-check"></i><span slot="title">运维管理</span></template>
          <el-menu-item class="MenuItem" index="combo"> 查看套餐</el-menu-item>
          <el-menu-item class="MenuItem" index="comboGroup">查看套餐组</el-menu-item>          
          <el-menu-item class="MenuItem" index="orderManager"> 查看订单</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</template>
<script>
export default {
  props: {
    // 当前伙伴ID
    curUserId: {
      type: Number
    },
    collpase: {
      type: Boolean
    }
  },
  data () {
    return {
      activeItem: '',
      openedMenu: [],
      isCollapse: true
    }
  },
  created: function () {
    let path = this.$route.path.split('/')
    let index = path[path.length - 1]
    this.activeItem = index
    let open = this.$route.query.item.split(',')
    this.openedMenu = open
  },
  methods: {
    handleOpen (index, path) {
      this.openedMenu.push(index)
      if (this.$route.query.item) {
        if (this.$route.query.item.indexOf(index) === -1) {
          let open = this.$route.query.item.split(',')
          open.push(index)
          this.$router.push({query: {item: open.join(','), key: this.$route.query.key}})
        }
      } else {
        this.$router.push({query: {item: index, key: this.$route.query.key}})
      }
    },
    handleClose (index, path) {
      let item = this.openedMenu.indexOf(index)
      if (item !== -1) {
        this.openedMenu.splice(item, 1)
      }
      if (this.$route.query.item.indexOf(index) !== -1) {
        let open = this.$route.query.item.split(',')
        let i = open.indexOf(index)
        open.splice(i, 1)
        this.$router.push({query: {item: open.join(','), key: this.$route.query.key}})
      } else {
        this.$router.push({query: {key: this.$route.query.key}})
      }
    },
    handleSelect (index, path) {
      this.activeItem = index;
      this.$router.push({path: index, query: {item: this.$route.query.item}});
    }
  }
}
</script>
<style>
.MenuItem{
  text-align: left;
}
.MenuItem:before{
  text-align: right;
  display: inline-block;
  content:"-- ";
  width: 40%;
}
</style>
