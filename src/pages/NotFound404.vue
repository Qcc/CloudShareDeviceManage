<template>
  <el-row>
    <el-col :span="24">
      <h2>找不到您要访问的网页!</h2>
      <a @click="back">退回上一页</a>
    </el-col>
  </el-row>  
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
