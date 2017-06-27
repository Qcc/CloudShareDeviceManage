<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <div class="logo"></div>
      <el-menu-item index="2">控制台</el-menu-item>      
      </el-menu>
    </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
  .logo{
      float: left;
      margin: 0 40px;
      width: 167px;
      height: 60px;
      background: url('../assets/logo.png') no-repeat center;
  }


</style>
