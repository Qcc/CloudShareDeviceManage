<template>
  <div class="top-continner">
    <i class="logo"></i>
    <ul class="top-menu">
      <li class="menu-item">控制台</li>
      <li class="menu-item user" @click="logout">注销</li>            
    </ul>
  </div>
</template>
<script>
import {
  logoutApi,
  fetch
} from '../api/api.js'
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    logout () {
      this.$confirm('您确定要注销当前用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetch(logoutApi, this.logoutComplate)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    logoutComplate (data) {
      if (data.status === 200 && data.errorCode === 0) {
        this.$router.push('/')
      }
    }
  }
}
</script>
<style>
  .top-continner{
    width:100%;
    height: 60px;
    background-color: #324057;
  }
  .logo{
      float: left;
      margin: 0 40px;
      width: 167px;
      height: 60px;
      background: url('../assets/logo.png') no-repeat center;
  }
  .top-menu{
    list-style: none;
    margin: 0;
    padding:0;
    color:#EFF2F7;
  }
  .menu-item{
    float: left;
    line-height: 60px;
    width: 80px;
  }
  .menu-item:hover{
    background-color: #475669;
  }
  .user{
    float:right;
    margin-right: 20px;
  }

</style>
