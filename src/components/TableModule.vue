<template>
<div>
  <div class="column-link"><a class="column" @click="dialogVisible">自定义列</a> &nbsp; <a class="download">下载</a></div>
  <el-dialog title="自定义表格列" :visible.sync="columnVisible">
  <el-alert
    title="至少选3个，最多选5个指标到展示列表，您也可以随时再调整。"
    type="info"
    show-icon>
  </el-alert>
    <el-checkbox-group 
      v-model="checkedColumn"
      :min="3"
      :max="5">
      <el-checkbox v-for="item in allColumn" :label="item.label" :key="item.label">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="columnVisible = false">取 消</el-button>
      <el-button type="primary" @click="columnSubmit">确 定</el-button>
    </div>
  </el-dialog>
 
  <el-table
    ref="multipleTable"
    :data="tableData3"
    align='left'
    border
    tooltip-effect="dark"
    style="width: 100%"
    highlight-current-row
    @selection-change="handleSelectionChange">

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="col in tableCol"
      v-if="col.visible"
      v-bind:prop="col.prop"
      v-bind:label="col.label" >
    </el-table-column>
     
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }],
        tableCol: [{key: 'date', prop: 'date', label: '日期', visible: true},
                  {key: 'name', prop: 'name', label: '姓名', visible: true},
                  {key: 'address', prop: 'sex', label: '性别', visible: true},
                  {key: 'age', prop: 'age', label: '年龄', visible: false},
                  {key: 'address', prop: 'address', label: '地址', visible: true},
                  {key: 'nationality', prop: 'nationality', label: '籍贯', visible: false},
                  {key: 'phone', prop: 'phone', label: '电话', visible: false},
                  {key: 'email', prop: 'email', label: '邮箱', visible: false},
                  {key: 'conent', prop: 'conent', label: '紧急联系人', visible: false},
                  {key: 'make', prop: 'make', label: '操作', visible: false}
        ],
        // 全部的列
        allColumn: [],
        // 显示中的列
        checkedColumn: [],
        multipleSelection: [],
        columnVisible: false
      }
    },

    methods: {
      dialogVisible () {
        if (this.allColumn.length === 0) {
          for (let i = 0; i < this.tableCol.length; i++) {
            this.allColumn.push({label: this.tableCol[i].label, visible: this.tableCol[i].visible})
            if (this.tableCol[i].visible) {
              this.checkedColumn.push({label: this.tableCol[i].label, visible: this.tableCol[i].visible})
            }
          }
        }
        this.columnVisible = true
      },
      columnSubmit () {
        for (let i = 0; i < this.checkedColumn.length; i++) {
          for (let j = 0; j < this.tableCol.length; j++) {
            if (this.tableCol[j].label === this.checkedColumn[i]) {
              this.tableCol[j].visible = true
              continue
            } else {
              this.tableCol[j].visible = false
              continue
            }
          }
        }
        this.columnVisible = false
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style>
.column,.download{
  color:#108ee9;
  cursor:pointer;
}
.download{
  padding-right: 20px;
  background: url('../assets/download.png') no-repeat  center right;
}
.column-link{
  float: right;
  margin: 20px;
}
</style>
