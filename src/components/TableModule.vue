<template>
<div>
  <div>
  <el-row>
    <el-col :span="24">
        <div style="float:left;">
          <span>搜索数据 : </span>
            <div style="margin-top: 15px;width:350px;display:inline-block">
              <el-input placeholder="请输入内容" v-model="searchInput">
                <el-button slot="append" icon="search"></el-button>
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
      <el-select @change="handleFristColumnChange" v-model="searchValue1" placeholder="请选择列">
        <el-option
          v-for="item in tableCol"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="input" style="width:50px"></el-input> -
      <el-input v-model="input" style="width:50px"></el-input>
      <el-select v-model="relationalValue" style="width:60px;margin:0 15px">
        <el-option
          v-for="item in relationalOptions"
          :key="item.label"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
      <el-select v-model="searchValue2" placeholder="请选择列">
        <el-option
          v-for="item in tableCol"
          :key="item.key"
          :label="item.label"
          :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="input" style="width:50px"></el-input> -
      <el-input v-model="input" style="width:50px"></el-input>
    <el-button style="margin:0 20px" type="primary" icon="search">搜索</el-button>
    <a @click="hiddenAdvancedSearch" style="margin-left:10px;color:#108ee9;cursor:pointer;">收起</a>    
    </div>
    </el-col>
  </el-row>
  </div>

  <div class="column-link"><a @click="dialogVisible">自定义列</a></div>
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
 
  <el-table
    ref="multipleTable"
    :data="tableData3"
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
  <el-pagination
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
        // visible是否可见、sortable是否可排序、filters筛选数据源、search是否可搜索
        // type 日期 date 时间 time  2017-06-23 11:39:08 字符串 string  数字 number  枚举 enun
        tableCol: [{key: 'date', prop: 'date', label: '日期', visible: true, sortable: true, type: 'date'},
                  {key: 'name', prop: 'name', label: '姓名', visible: true, search: true},
                  {key: 'sex', prop: 'sex', label: '性别', visible: true, sortable: true},
                  {key: 'age', prop: 'age', label: '年龄', visible: false, search: true, type: 'number'},
                  {key: 'address', prop: 'address', label: '地址', visible: true, type: 'string'},
                  {key: 'nationality', prop: 'nationality', label: '籍贯', visible: false},
                  {key: 'phone', prop: 'phone', label: '电话', visible: false, sortable: true},
                  {key: 'email', prop: 'email', label: '邮箱', visible: false},
                  {key: 'conent', prop: 'conent', label: '紧急联系人', visible: false},
                  {key: 'time', prop: 'time', label: '时间', visible: true, search: true, type: 'time'},
                  {key: 'make', prop: 'make', label: '操作', visible: false, filters: []},
                  {key: 'state', prop: 'state', label: '状态', visible: false, type: 'enum', filters: [{text: '家', value: '家'}, {text: '公司', value: '公司'}]}
        ],
        // 搜索框
        searchInput: '',
        // 表格多选，选中的行
        multipleSelection: [],
        columnVisible: false,
        total: 5,
        currentPage: 1,
        AdvancedSearchVisible: false,
        searchValue1: '',
        searchValue2: '',
        // 高级搜索与或关系选择器
        relationalOptions: [{
          value: 'and',
          label: '与'
        }, {
          value: 'or',
          label: '或'
        }],
        // 高级搜索与或关系选择器
        relationalValue: ''
      }
    },

    methods: {
      // 高级搜索选项一下拉列表框
      handleFristColumnChange (selectItem) {
        console.log(selectItem)
      },
      showAdvancedSearch () {
        this.AdvancedSearchVisible = true
      },
      hiddenAdvancedSearch () {
        this.AdvancedSearchVisible = false
      },
      dialogVisible () {
        this.columnVisible = true
      },
      columnSubmit () {
        this.columnVisible = false
      },
      // 表格多选响应
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 排序
      handleSortChange (val) {
        console.log(val)
      },
      // 筛选
      filterTag (value, row) {
        console.log(value, row)
      },
      // 分页
      handleSizeChange (value) {
        console.log(value)
      },
      // 当前页
      handleCurrentChange (value) {
        console.log(value)
      }
    }
  }
</script>

<style>

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
  margin:0 20px 5px;
  background: url('../assets/ustomize.png') no-repeat  center right;
}
.pagination{
  float: right;
  padding:10px 20px;    
}
</style>
