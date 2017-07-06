<template>
<div>
  <div v-bind:class="searchMod" v-if="propSearch">
  <el-row>
    <el-col :span="24">
        <div style="float:left;">
          <span>搜索数据 : </span>
            <div style="width:350px;display:inline-block">
              <el-input placeholder="请输入内容" v-model="searchValue">
                <el-button slot="append" @click="handleSearch" icon="search"></el-button>
              </el-input>
            </div>
        <a @click="showAdvancedSearch" v-if="!AdvancedSearchVisible" style="margin-left:10px;color:#108ee9;cursor:pointer;">高级搜索</a>
        </div>
    </el-col>
  </el-row>
  <el-row v-if="AdvancedSearchVisible">
  <el-col :span="24">
    <div style="float:left;padding-top:15px;margin-top:15px;border-top: 1px solid #cccccc;">
      <span>高级搜索 : </span>
      <el-select style="width:150px" @change="handleFristColumnChange" v-model="searchCloumnValue1" placeholder="请选择列">
        <el-option
          v-for="item in tableCol"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <!--字符串默认类型-->
      <el-input v-if="AdvancedSearchType1 === 'STRING'" v-model="AdvancedSearchValue1" style="width:150px" placeholder="请输入..."></el-input>
      <!--日期类型样式 -->
      <el-date-picker style="width:210px" v-if="AdvancedSearchType1 === 'DATE'" v-model="AdvancedSearchValue1" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <!--数字类型样式-->
      <el-input v-if="AdvancedSearchType1 === 'INT'" v-model="AdvancedSearchValue1" style="width:150px" type="number" placeholder="请输入..."></el-input>
      <!--枚举类型样式-->
      <el-select style="width:100px" v-if="AdvancedSearchType1 === 'ENUM'" v-model="AdvancedSearchValue1" placeholder="请选择">
        <el-option
          v-for="item in getEnumTypeOption1"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
  
      <el-select v-model="relationalValue" style="width:60px;margin:0 15px">
        <el-option
          v-for="item in relationalOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-select style="width:150px" @change="handleSecondColumnChange" v-model="searchCloumnValue2" placeholder="请选择列">
        <el-option
          v-for="item in tableCol"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <!--字符串默认类型-->
      <el-input v-if="AdvancedSearchType2 === 'STRING'" v-model="AdvancedSearchValue2" style="width:150px" placeholder="请输入..."></el-input>
      <!--日期类型样式 -->
      <el-date-picker style="width:210px" v-if="AdvancedSearchType2 === 'DATE'" v-model="AdvancedSearchValue2" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <!--数字类型样式-->
      <el-input v-if="AdvancedSearchType2 === 'INT'" v-model="AdvancedSearchValue2" style="width:150px" type="number" placeholder="请输入..."></el-input>
      <!--枚举类型样式-->
      <el-select style="width:100px" v-if="AdvancedSearchType2 === 'ENUM'" v-model="AdvancedSearchValue2" placeholder="请选择">
        <el-option
          v-for="item in getEnumTypeOption2"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
    <el-button style="margin:0 20px" type="primary" @click="handleAdvancedSearch" icon="search">搜索</el-button>
    <a @click="hiddenAdvancedSearch" style="margin-left:10px;color:#108ee9;cursor:pointer;">收起</a>    
    </div>
    </el-col>
  </el-row>
  </div>
  <div v-if="propADUQ" style="float:right;margin-bottom:10px">
    <el-row>
      <el-col>
        <el-button-group>
          <el-button @click="handleCreateCOl" :plain="true" type="success" icon="document">{{createCOl}}</el-button>
          <el-button @click="handleEditCOl" :plain="true" :disabled="disabled" type="info" icon="edit">{{editCOl}}</el-button>
          <el-button @click="handleCancelEditCOl" v-if="cancelEdit" :plain="true" type="warning" icon="d-arrow-left">{{cancelEditCOl}}</el-button>
          <el-button @click="handleDeleteCol" :plain="true" :disabled="disabled" type="danger" icon="delete" >{{deleteCol}}</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
 
  <el-table
    ref="multipleTable"
    :data="tableData"
    align='left'
    border
    stripe
    tooltip-effect="dark"
    style="width: 100%"
    highlight-current-row
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange">

    <el-table-column
      :selectable="selectable"
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="col in tableCol"
      v-bind:key="col.key"
      v-if="col.visible"
      v-bind:sortable="col.sortable"
      v-bind:filters="col.filters.length === 0 ? null : col.filters"
      @filter-method="filterTag"
      :filter-multiple="false"
      v-bind:prop="col.prop"
      v-bind:label="col.label" >
      <template scope="scope">
        <c-form
          flag='table'
          :columns="col"
          :row="scope.row"
          @getSer="getServerObj"
          @change="tabledataChange">
        </c-form> 
      </template>
    </el-table-column>
  </el-table>
  <div class="cloumn-continer">
  <div v-if="propColumn" class="column-link"><a @click="dialogVisible">自定义列</a></div>
  <el-dialog title="自定义表格列" :visible.sync="columnVisible">
  <el-alert
    class="tips"
    title="5个指标能更方便展示列表，您也可以随时再调整。"
    type="info"
    show-icon>
  </el-alert>
  <el-checkbox class="choice-col" v-for="item in tableCol"  :key="item.key" :label="item.label" v-model="item.visible" >{{item.label}}</el-checkbox>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="columnSubmit">确 定</el-button>
    </div>
  </el-dialog>
  </div>
  <el-pagination
      v-if="propPagination"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 200, 500, 1000]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--单行编辑-->
    <el-dialog  title="编辑" :visible.sync="singleEditVisible">
      <el-form :model="singleEditForm" label-position="right" label-width="80px">
        <el-form-item v-for="item in singleEditForm" v-bind:key="item.key" v-bind:label="item.label">
          <c-form :columns="item"></c-form>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSingleEditCancel">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="handleSingleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--新建记录-->
    <el-dialog  title="新建" :visible.sync="createVisible">
      <el-form :model="createForm" label-position="right"  label-width="80px">
        <el-form-item v-for="item in createForm" v-bind:key="item.key" v-bind:label="item.label">
          <c-form :columns="item"></c-form>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCreateCancel">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="handleCreateSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*
// 通过props传入true 或 false 控制是否显示功能
** propSearch  搜索高级搜索
** propADUQ  增删改查
** propPagination  分页
** propColumn  自定义列
**
// API
** getPagerURL 获取正页
** createURL 新建API
** deleteURL 删除 API
** updateURL 更新 API
** queryURL 查询API
*/
  import reqwest from 'reqwest'
  import CForm from '../components/CForm.vue'
  import {customGetPagerURL} from '../api/api.js'
  export default {
    props: {
      createURL: {type: String},
      deleteURL: {type: String},
      batchDeleteURL: {type: String},
      updateURL: {type: String},
      batchUpdateURL: {type: String},
      queryURL: {type: String},
      getPagerURL: {type: String},
      propSearch: {type: Boolean, default: true},
      propADUQ: {type: Boolean, default: true},
      propPagination: {type: Boolean, default: true},
      propColumn: {type: Boolean, default: true}
    },
    data () {
      return {
        tableData: [],
        // visible是否可见、sortable是否可排序、filters筛选数据源、search是否可搜索,editable是否可编辑
        // type 日期 date 时间 time  2017-06-23 11:39:08 字符串 string  数字 number  枚举 enum
        tableCol: [],
        total: 5,
        currentPage: 1,
        // 模糊搜索值
        searchValue: '',
        // 高级搜索是否可见
        AdvancedSearchVisible: false,
        // 表格多选，选中的行
        multipleSelection: [],
        // 控制表格列模态框
        columnVisible: false,
        searchMod: 'adv-search',
        // 搜索框对对应的类型
        AdvancedSearchType1: 'STRING',
        AdvancedSearchType2: 'STRING',
        // 当前选中搜索打列
        currentSelectItem1: '',
        currentSelectItem2: '',
        // 选择要搜索的列的值
        searchCloumnValue1: '',
        searchCloumnValue2: '',
        // 高级搜索值
        AdvancedSearchValue1: '',
        AdvancedSearchValue2: '',
        // 高级搜索与或关系选择器
        relationalValue: '',
        // 高级搜索与或关系选择器
        relationalOptions: [{
          value: 'AND',
          label: '与'
        }, {
          value: 'OR',
          label: '或'
        }],
        // 表格增删改查按钮
        createCOl: '创建',
        editCOl: '编辑',
        cancelEditCOl: '取消修改',
        cancelEdit: false,
        deleteCol: '删除',
        // 表格删改查按钮 是否可用
        disabled: true,
        // 单行编辑模态框
        singleEditVisible: false,
        singleEditForm: {},
        editLoading: false,
        // 新建行
        createForm: {},
        createVisible: false,
        createLoading: false,
        // 数据是否有修改
        rowModified: false
      }
    },
    created: function () {
      this.fetch2(this.getPagerURL,
        this.getDataOnComplate,
        {ifGetColumns: true, ifGetCount: true, pageSize: 10, pageNo: 1})
    },
    methods: {
      // 数据是否有修改1
      tabledataChange (value) {
        this.rowModified = true
        this.editCOl = '保存修改'
      },
      // 数据修改后表格选中行未保存不能取消
      selectable (row, index) {
        let flag = true
        if (this.rowModified && this.multipleSelection.length > 1) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if ((this.multipleSelection[i].line === row.line) && row.editstyle) {
              flag = false
            }
          }
        }
        return flag
      },
      conversionType (type) {
        if (type === 'FLOAT') {
          return 'INT'
        } else if (type === 'CHAR' || type === 'VARCHAR') {
          return 'STRING'
        } else {
          return type
        }
      },
      // data回调数据  api调用类型url states数据操作对象
      getDataOnComplate (data, ...states) {
        if (!this.checkResults(data)) return
        let columnsJsonStr = JSON.parse(data.entity.columnsJsonStr)
        let columns = columnsJsonStr.columns
        for (let i = 0; i < columns.length; i++) {
          let colObj = {}
          colObj.key = columns[i].name
          colObj.prop = columns[i].name
          colObj.label = columns[i].flowchart
          colObj.noenull = columns[i].notnull
          colObj.visible = columns[i].visible
          colObj.search = true
          colObj.editable = columns[i].editable
          colObj.referenceTable = columns[i].referenceTable
          colObj.referenceTableName = columns[i].referenceTableName
          colObj.loading = false
          if (colObj.referenceTable === '') {
            colObj.type = this.conversionType(columns[i].type)
          } else {
            // 从服务器获取依赖对象存入数组
            colObj.type = 'OBJECT'
          }
          colObj.editable = columns[i].editable
          colObj.sortable = true
          colObj.filters = []
          if (columns[i].enumvalues.length > 1) {
            for (let j = 0; j < columns[i].enumvalues.length; j++) {
              colObj.filters.push({text: columns[i].enumvalueDescribes[j], value: columns[i].enumvalues[j]})
            }
          }
          this.tableCol.push(colObj)
        }
        //  添加是否编辑状态与行号
        for (let i = 0; i < data.entity.list.length; i++) {
          data.entity.list[i].editstyle = false
          data.entity.list[i].line = i
          this.tableData.push(data.entity.list[i])
        }
      },
      fetch (url, onComplate, params, ...states) {
        if (typeof onComplate !== 'function') {
          console.log('不是函数', typeof onComplete)
          return
        }
        reqwest({
          url: url,
          method: 'POST',
          crossDomain: true,
          data: {
            ...params
          },
          type: 'json'
        })
        .then((data) => {
          if (data.status === 200) {
            onComplate(data, states)
          } else {
            onComplate(null)
          }
        })
        .fail((err, msg) => {
          console.log(err)
          onComplate(null)
        })
      },
      fetch2 (url, onComplate, params, ...states) {
        if (typeof onComplate !== 'function') {
          console.log('不是函数', typeof onComplete)
          return
        }
        reqwest({
          url: url,
          method: 'POST',
          crossDomain: true,
          data: JSON.stringify(params),
          dataType: 'json',
          contentType: 'application/json;charset=utf-8'
        })
        .then((data) => {
          if (data.status === 200) {
            onComplate(data, states)
          } else {
            onComplate(null)
          }
        })
        .fail((err, msg) => {
          console.log(err)
          onComplate(null)
        })
      },
      // 高级搜索选项一下拉列表框
      handleFristColumnChange (selectItem) {
        this.AdvancedSearchValue1 = ''
        this.currentSelectItem1 = selectItem
        for (var i in this.tableCol) {
          if (this.tableCol[i].key === selectItem) {
            if (this.tableCol[i].type) {
              this.AdvancedSearchType1 = this.tableCol[i].type
            } else {
              this.AdvancedSearchType1 = 'string'
            }
          }
        }
      },
      // 高级搜索选项一下拉列表框
      handleSecondColumnChange (selectItem) {
        this.AdvancedSearchValue2 = ''
        this.currentSelectItem2 = selectItem
        for (var i in this.tableCol) {
          if (this.tableCol[i].key === selectItem) {
            if (this.tableCol[i].type) {
              this.AdvancedSearchType2 = this.tableCol[i].type
            } else {
              this.AdvancedSearchType2 = 'string'
            }
          }
        }
      },
      showAdvancedSearch () {
        this.AdvancedSearchVisible = true
        this.searchMod = 'search'
      },
      hiddenAdvancedSearch () {
        this.AdvancedSearchVisible = false
        this.searchMod = 'adv-search'
      },
      dialogVisible () {
        this.columnVisible = true
      },
      // 修改表格列
      columnSubmit () {
        this.columnVisible = false
      },
      // 表格多选响应
      handleSelectionChange (val) {
        this.multipleSelection = val
        if (val.length > 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
        if (val.length > 1) {
          this.editCOl = '批量编辑'
          this.deleteCol = '批量删除'
        } else {
          this.editCOl = '编辑'
          this.deleteCol = '删除'
        }
      },
      // 排序
      handleSortChange (val) {
        console.log('排序: ', val)
      },
      // 筛选
      filterTag (value, row) {
        console.log('筛选', value, row)
      },
      // 分页
      handleSizeChange (value) {
        console.log('分页', value)
      },
      // 当前页
      handleCurrentChange (value) {
        console.log('当前页', value)
      },
      // 模糊搜索 发起请求
      handleSearch () {
        console.log('模糊搜索：', this.searchValue)
      },
      // 高级搜索 发起请求
      handleAdvancedSearch () {
        console.log('第一列: ', this.searchCloumnValue1, '搜索值：', this.AdvancedSearchValue1, '逻辑：', this.relationalValue, '第二列: ', this.searchCloumnValue2, '搜索值：', this.AdvancedSearchValue2)
      },
      // 创建表格行
      handleCreateCOl () {
        this.createVisible = true
        this.createForm = {}
        for (let i = 0; i < this.tableCol.length; i++) {
          if (this.tableCol[i].editable) {
            let temp = {}
            Object.assign(temp, this.tableCol[i], {value: ''})
            this.$set(this.createForm, i, temp)
          }
        }
      },
      getServerObj (item) {
        let url = customGetPagerURL(item.referenceTableName)
        if (item.filters.length === 0) {
          this.fetch2(url, this.getServerObjOnComplate, {ifGetColumns: true, ifGetCount: true}, item)
        }
      },
      getServerObjOnComplate (data, ...states) {
        if (!this.checkResults(data)) return
        let columnsJsonStr = JSON.parse(data.entity.columnsJsonStr)
        let columns = columnsJsonStr.columns
        let names = []
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].readableIdentifier) {
            names.push(columns[i].name)
          }
        }
        for (let i = 0; i < data.entity.list.length; i++) {
          let name = ''
          for (let j = 0; j < names.length; j++) {
            if (name === '') {
              name = data.entity.list[i][names[j]]
            } else {
              name = name + '/' + names[j]
              name = data.entity.list[i][names[j]]
            }
          }
          console.log(data.entity.list[i].uid, '---', name)
          for (var key in states[0]) {
            states[0][key].filters.push({ value: data.entity.list[i].uid, text: name })
          }
        }
      },
      // 取消创建表格行
      handleCreateCancel () {
        this.createVisible = false
      },
      // 创建单行表格行提交
      handleCreateSubmit () {
        this.createLoading = true
        let params = {}
        for (var i in this.createForm) {
          let key = this.createForm[i].key
          if (this.createForm[i].type === 'OBJECT') {
            key = key + 'uid'
          }
          params[key] = this.createForm[i].value
        }
        this.fetch(this.createURL, this.createComplate, params)
      },
      createComplate (data) {
        this.createLoading = false
        this.createVisible = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
      },
      // 单行编辑表格行
      handleEditCOl () {
        if (this.multipleSelection.length === 1) {
          this.singleEditVisible = true
          this.singleEditForm = {}
          for (let i = 0; i < this.tableCol.length; i++) {
            if (this.tableCol[i].editable) {
              let temp = {}
              Object.assign(temp, this.tableCol[i], {value: this.multipleSelection[0][this.tableCol[i].key]})
              this.$set(this.singleEditForm, i, temp)
            }
          }
        } else {
          this.cancelEdit = true
          for (let i = 0; i < this.multipleSelection.length; i++) {
            let line = this.multipleSelection[i].line
            this.tableData[line].editstyle = true
          }
        }
      },
      // 取消修改
      handleCancelEditCOl () {
        this.rowModified = false
        this.cancelEdit = false
        this.editCOl = '批量编辑'
        for (let i = 0; i < this.multipleSelection.length; i++) {
          let line = this.multipleSelection[i].line
          this.tableData[line].editstyle = false
        }
      },
      // 取消单行编辑
      handleSingleEditCancel () {
        this.singleEditVisible = false
      },
      // 单行编辑提交
      handleSingleEditSubmit () {
        this.editLoading = true
        let params = {}
        for (var i in this.singleEditForm) {
          let key = this.singleEditForm[i].key
          if (this.singleEditForm[i].type === 'OBJECT') {
            key = key + 'uid'
          }
          params[key] = this.singleEditForm[i].value
        }
        this.fetch(this.updateURL, this.SingleEditComplate, params)
      },
      SingleEditComplate (data) {
        this.editLoading = false
        this.singleEditVisible = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      },
      // 删除表格行
      handleDeleteCol () {
        this.$confirm('此操作将永久删除选中的行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.multipleSelection.length === 1) {
            this.fetch(this.deleteURL, this.onDeleteComplate, { uid: this.multipleSelection[0].uid })
          } else {
            let params = []
            for (let i = 0; i < this.multipleSelection.length; i++) {
              params.push({ uid: this.multipleSelection[i].uid })
            }
            this.fetch2(this.batchDeleteURL, this.onDeleteComplate, params)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      onDeleteComplate (data) {
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      },
      checkResults (data) {
        if (data === null) {
          this.$alert('网络错误，请刷新（F5）后重试。', '错误提示', {
            confirmButtonText: '知道了。',
            type: 'error'
          })
          console.log('错误')
          return false
        }
        if (data.errorCode !== 0) {
          this.$alert('服务器错误，' + data.message, '错误提示', {
            confirmButtonText: '知道了。',
            type: 'error'
          })
          console.log('错误')
          return false
        }
        console.log('获取数据成功')
        return true
      }
    },
    computed: {
      getEnumTypeOption1 () {
        let Col = this.tableCol
        for (var key in Col) {
          if (Col[key].key === this.currentSelectItem1 && Col[key].type === this.AdvancedSearchType1) {
            return Col[key].filters
          }
        }
      },
      getEnumTypeOption2 () {
        let Col = this.tableCol
        for (var key in Col) {
          if (Col[key].key === this.currentSelectItem2 && Col[key].type === this.AdvancedSearchType2) {
            return Col[key].filters
          }
        }
      }
    },
    components: {
      CForm
    }
  }
</script>

<style>
.cloumn-continer{
  float: left;
}
.choice-col{
  margin: 10px 20px;
}
.tips{
  margin: 10px;
}
.column-link{
  color:#108ee9;
  cursor:pointer;
  float: right;
  padding-right: 20px;
  margin:10px 20px;
  background: url('../assets/ustomize.png') no-repeat  center right;
}
.pagination{
  float: right;
  margin:10px 20px;    
}
.search{
  position:relative;
  margin-bottom:10px;
}
.adv-search{
  position:absolute;
  margin-bottom:10px;
}
</style>
