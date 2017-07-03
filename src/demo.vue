<template>
<div>
  <el-button @click="handleCreateCOl" >新建</el-button>
  <el-dialog :visible.sync="createVisible">
  <el-form :model="createForm" >
    <el-form-item v-for="item in createForm" v-bind:key="item.key" v-bind:label="item.label">
      <el-date-picker v-if="item.type === 'DATE'" v-model="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
    </el-form-item>
  </el-form>
  </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      createVisible: false,
      createForm: {date: ''},
      tableCol: [{key: 'date', prop: 'date', label: '日期', type: 'DATE', visible: false, sortable: true}]
    }
  },
  methods: {
    // 创建表格行
    handleCreateCOl () {
      this.createVisible = true
      for (let i = 0; i < this.tableCol.length; i++) {
        let key = this.tableCol[i].key
        let label = this.tableCol[i].label
        let type = this.tableCol[i].type
        let filters = []
        if (type === 'ENUM') {
          filters = this.tableCol[i].filters.slice(0)
        }
        this.$set(this.createForm, i, { key: key, label: label, type: type, value: '', filters: filters })
      }
    }
  }
}
</script>
