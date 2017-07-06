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
        <table-module 
          :getPagerURL="getPagerURL"
          :createURL="createUser"
          :updateURL="updateUser"
          :deleteURL="deleteUser"
          :batchDeleteURL="batchDeleteUser"
          :batchUpdateURL="batchUpdateUser"
          :queryURL = "queryPagerUser"
        ></table-module>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopNav from '../components/TopNav.vue'
import LeftMenu from '../components/LeftMenu.vue'
import TableModule from '../components/TableModule.vue'
import {
  getPagerUser,
  createUser,
  updateUser,
  deleteUser,
  batchUpdateUser,
  batchDeleteUser,
  queryPagerUser
} from '../api/api.js'
export default {
  data () {
    return {
      getPagerURL: getPagerUser,
      createUser: createUser,
      updateUser: updateUser,
      deleteUser: deleteUser,
      batchDeleteUser: batchDeleteUser,
      batchUpdateUser: batchUpdateUser,
      queryPagerUser: queryPagerUser
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
