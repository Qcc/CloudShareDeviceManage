<template>
  <div>
    <top-nav></top-nav>
    <el-row>
      <el-col :span="5" style="margin-left:-20px">
        <left-Menu  activeItem="main">
        </left-Menu>
      </el-col>
      <el-col :span="19" style="margin-left:20px">  
        <el-breadcrumb style="margin:15px 0" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/main' }">运行总览</el-breadcrumb-item>
        </el-breadcrumb>
        <table-module v-bind:getPagerURL="getPagerURL"></table-module>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
import TableModule from '../components/TableModule.vue'
import {getPagerUser} from '../api/api.js'
export default {
  data () {
    return {
      getPagerURL: getPagerUser
    }
  },
  methods: {

  },
  components: {
    TopNav,
    LeftMenu,
    TableModule
  }
}
</script>
<style>

</style>
