<template>
  <el-row >
  <el-col :span="24">
    <el-menu 
      @open="handleOpen"
      @close="handleClose"      
      :default-openeds = "openedMenu"
      :default-active = "activeItem"
      @select = "handleSelect"
      class="el-menu-vertical-demo">
      <!--云享管理员菜单-->
      <el-submenu v-if="curUserId === 2026226681" index="101">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="default">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2026226681" index="102">
        <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
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
          <el-menu-item index="comboGroup">套餐组配置</el-menu-item>          
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
          <el-menu-item index="partnerManager">伙伴管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="203">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceManager">设备管理</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === 2031278906" index="204">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="combo">套餐配置</el-menu-item>
          <el-menu-item index="orderManager">订单管理</el-menu-item>
          <el-menu-item index="point">积分管理</el-menu-item>
          <el-menu-item index="performance">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴管理员菜单-->
      <el-submenu v-if="curUserId === -2139060392" index="301">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="default">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="302">
        <template slot="title"><i class="el-icon-time"></i>门店管理</template>
          <el-menu-item index="partnerManager">门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="303">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceManager">设备监控</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2139060392" index="304">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="performance">业绩统计</el-menu-item>
      </el-submenu>
      <!--伙伴员工菜单-->
      <el-submenu v-if="curUserId === -2134008167" index="401">
        <template slot="title"><i class="el-icon-information"></i>系统信息</template>
          <el-menu-item index="default">运行总览</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="402">
        <template slot="title"><i class="el-icon-time"></i>门店管理</template>
          <el-menu-item index="partnerManager">门店运营信息</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="403">
        <template slot="title"><i class="el-icon-setting"></i>设备管理</template>
          <el-menu-item index="deviceManager">设备监控</el-menu-item>
      </el-submenu>
      <el-submenu v-if="curUserId === -2134008167" index="404">
        <template slot="title"><i class="el-icon-circle-check"></i>运维管理</template>
          <el-menu-item index="performance">业绩统计</el-menu-item>
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
    }
  },
  data () {
    return {
      activeItem: '',
      openedMenu: []
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
      this.$router.push({path: index, query: {item: this.$route.query.item}})
    }
  }
}
</script>
<style>

</style>
