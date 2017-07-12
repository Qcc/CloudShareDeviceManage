<template>
  <div v-show="islogin">
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
  queryPagerUser,
  isLoggedIn,
  fetch
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
      queryPagerUser: queryPagerUser,
      islogin: false
    }
  },
  created: function () {
    fetch(isLoggedIn, this.isLoggedInCompalte, {})
  },
  methods: {
    isLoggedInCompalte (data) {
      if (data === null) return false
      if (data.errorCode !== 0) return false
      if (data.entity) {
        this.islogin = true
      } else {
        this.$alert('您还未登录，请点击按钮返回重试！', '错误提示', {
          confirmButtonText: '知道了。',
          type: 'error',
          callback: action => {
            this.$router.push('/')
          }
        })
      }
    }
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
