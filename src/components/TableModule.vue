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
      <el-date-picker style="width:210px" v-if="AdvancedSearchType1 === 'DATE'" v-model="AdvancedSearchValue1" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <!--时间类型样式-->
      <el-time-picker style="width:175px" v-if="AdvancedSearchType1 === 'TIME'" is-range v-model="AdvancedSearchValue1" placeholder="选择时间范围">
      </el-time-picker>
      <!--数字类型样式-->
      <input class="number-input" v-if="AdvancedSearchType1 === 'INT'" v-model="AdvancedSearchValue1" type="number" placeholder="请输入..."></input>
      <!--枚举类型样式-->
      <el-select style="width:100px" v-if="AdvancedSearchType1 === 'ENUM'" v-model="AdvancedSearchValue1" placeholder="请选择">
        <el-option
          v-for="item in getEnumTypeOption1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
  
      <el-select v-model="relationalValue" style="width:60px;margin:0 15px">
        <el-option
          v-for="item in relationalOptions"
          :key="item.label"
          :label="item.label"
          :value="item.label">
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
      <el-date-picker style="width:210px" v-if="AdvancedSearchType2 === 'DATE'" v-model="AdvancedSearchValue2" type="daterange" placeholder="选择日期范围">
      </el-date-picker>
      <!--时间类型样式-->
      <el-time-picker style="width:175px" v-if="AdvancedSearchType2 === 'TIME'" is-range v-model="AdvancedSearchValue2" placeholder="选择时间范围">
      </el-time-picker>
      <!--数字类型样式-->
      <input class="number-input" v-if="AdvancedSearchType2 === 'INT'" v-model="AdvancedSearchValue2" type="number" placeholder="请输入..."></input>
      <!--枚举类型样式-->
      <el-select style="width:100px" v-if="AdvancedSearchType2 === 'ENUM'" v-model="AdvancedSearchValue2" placeholder="请选择">
        <el-option
          v-for="item in getEnumTypeOption2"
          :key="item.value"
          :label="item.label"
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
          <el-button @click="handleEditCOl" :plain="true" type="info" icon="edit">{{editCOl}}</el-button>
          <el-button @click="handleDisableCol" :plain="true" type="warning" icon="d-caret">{{disableCol}}</el-button>          
          <el-button @click="handleDeleteCol" :plain="true" type="danger" icon="delete" >{{deleteCol}}</el-button>
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
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      v-for="col in tableCol"
      v-bind:key="col.key"
      v-if="col.visible"
      v-bind:sortable="col.sortable"
      v-bind:filters="col.filters"
      @filter-method="filterTag"
      v-bind:prop="col.prop"
      v-bind:label="col.label" >
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
      :page-sizes="[2, 50, 200, 500, 1000]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
/*
// 通过props传入true 或 false 控制是否显示功能
** propSearch  搜索高级搜索
** propADUQ  增删改查
** propPagination  分页
** propColumn  自定义列
// API
** createURL 新建API
** deleteURL 删除 API
** updateURL 更新 API
** queryURL 查询API
*/
  import reqwest from 'reqwest'
  export default {
    props: {
      createURL: {
        type: String
      },
      deleteURL: {
        type: String
      },
      updateURL: {
        type: String
      },
      queryURL: {
        type: String
      },
      getPagerURL: {
        type: String
      },
      propSearch: {
        type: Boolean,
        default: true
      },
      propADUQ: {
        type: Boolean,
        default: true
      },
      propPagination: {
        type: Boolean,
        default: true
      },
      propColumn: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        tableData: [],
        tableData1: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          age: 25
        }],
        // visible是否可见、sortable是否可排序、filters筛选数据源、search是否可搜索,editable是否可编辑
        // type 日期 date 时间 time  2017-06-23 11:39:08 字符串 string  数字 number  枚举 enum
        tableCol: [],
        tableCol1: [{key: 'date', prop: 'date', label: '日期', visible: true, sortable: true, type: 'date'},
                  {key: 'name', prop: 'name', label: '姓名', visible: true, search: true},
                  {key: 'sex', prop: 'sex', label: '性别', visible: true, sortable: true, type: 'enum', filters: [{text: '男', value: '男'}, {text: '女', value: '女'}]},
                  {key: 'age', prop: 'age', label: '年龄', visible: false, search: true, type: 'number'},
                  {key: 'address', prop: 'address', label: '地址', visible: true, type: 'string'},
                  {key: 'nationality', prop: 'nationality', label: '籍贯', visible: false, editable: true},
                  {key: 'phone', prop: 'phone', label: '电话', visible: false, sortable: true},
                  {key: 'email', prop: 'email', label: '邮箱', visible: false},
                  {key: 'conent', prop: 'conent', label: '紧急联系人', visible: false},
                  {key: 'time', prop: 'time', label: '时间', visible: true, search: true, type: 'time'},
                  {key: 'make', prop: 'make', label: '操作', visible: false, filters: []},
                  {key: 'state', prop: 'state', label: '状态', visible: false, type: 'enum', filters: [{text: '家', value: '家'}, {text: '公司', value: '公司'}]}
        ],
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
          value: 'and',
          label: '与'
        }, {
          value: 'or',
          label: '或'
        }],
        // 表格增删改查按钮
        createCOl: '创建',
        editCOl: '编辑',
        disableCol: '禁用',
        deleteCol: '删除'
      }
    },
    created: function () {
      console.log('props=>>', this.getPagerURL)
      this.fetch2(this.getPagerURL, this.getDataOnComplate, {condition: {}, ifGetColumns: true, ifGetCount: true, pageSize: 10, pageNo: 1})
    },
    methods: {
      getDataOnComplate (data) {
        if (data === null) {
          this.$alert('网络错误，请刷新（F5）后重试。', '错误提示', {
            confirmButtonText: '知道了。',
            type: 'error'
          })
          return
        }
        if (data.errorCode !== 0) {
          this.$alert('服务器错误，' + data.message, '错误提示', {
            confirmButtonText: '知道了。',
            type: 'error'
          })
          return
        }
        let column = JSON.parse(data.entity.columnsJsonStr)
        for (let i = 0; i < column.length; i++) {
          let colObj = {}
          colObj.key = column[i].name
          colObj.prop = column[i].name
          colObj.label = column[i].flowchart
          colObj.noenull = column[i].notnull
          colObj.visible = column[i].visible
          colObj.search = true
          colObj.type = column[i].type
          colObj.editable = column[i].editable
          colObj.sortable = true
          if (column[i].enumvalues.length > 1) {
            colObj.filters.push({text: column[i].enumvalueDescribes[i], value: column[i].enumvalues[i]})
          }
          this.tableCol.push(colObj)
        }
        this.tableData = data.entity.list
      },
      fetch (url, onComplate, params = {}, method = 'POST') {
        if (typeof onComplete !== 'function') {
          return
        }
        reqwest({
          url: url,
          method: method,
          crossDpmain: true,
          data: {
            ...params
          },
          type: 'json'
        })
        .then((data) => {
          if (data.status === 200) {
            onComplate(data)
          } else {
            onComplate(null)
          }
        })
        .fail((err, msg) => {
          console.log(err)
          onComplate(null)
        })
      },
      fetch2 (url, onComplate, params = {}, method = 'POST') {
        if (typeof onComplate !== 'function') {
          return
        }
        reqwest({
          url: url,
          method: method,
          crossDpmain: true,
          data: JSON.stringify(params),
          dataType: 'json',
          contentType: 'application/json;charset=utf-8'
        })
        .then((data) => {
          if (data.status === 200) {
            onComplate(data)
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
        if (val.length > 1) {
          this.editCOl = '批量编辑'
          this.disableCol = '批量禁用'
          this.deleteCol = '批量删除'
        } else {
          this.editCOl = '编辑'
          this.disableCol = '禁用'
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
        console.log('创建行')
      },
      // 编辑表格行
      handleEditCOl () {
        console.log('编辑行')
      },
      // 禁用表格行
      handleDisableCol () {
        console.log('禁用行')
      },
      // 删除表格行
      handleDeleteCol () {
        this.$confirm('此操作将永久删除选中的行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    computed: {
      getEnumTypeOption1 () {
        for (var key in this.tableCol) {
          if (this.tableCol[key].type === this.AdvancedSearchType1) {
            return this.tableCol[key].filters
          }
        }
      },
      getEnumTypeOption2 () {
        for (var key in this.tableCol) {
          if (this.tableCol[key].type === this.AdvancedSearchType2) {
            return this.tableCol[key].filters
          }
        }
      }
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
.number-input{
    width: 150px;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    height: 36px;
    line-height: 1;
    outline: 0;
    padding: 3px 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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
