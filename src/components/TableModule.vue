<template>
<div>
  <el-row style="margin-bottom:10px;min-width:800px;">
    <el-col v-if="propSearch" :span="13">
        <div style="float:left">
          <span>搜索数据 : </span>
            <div style="width:350px;display:inline-block">
              <el-input @keyup.enter.native="handleSearch" placeholder="请输入内容" v-model="searchValue">
                <el-button slot="append" :loading="searchLoading"  @click="handleSearch" icon="search">搜索</el-button>
              </el-input>
            </div>
        <!--<a @click="showAdvancedSearch" v-if="!AdvancedSearchVisible" style="margin-left:10px;color:#108ee9;cursor:pointer;">高级搜索</a>            -->
        <a @click="showAdvancedSearch" v-if="false" style="margin-left:10px;color:#108ee9;cursor:pointer;">高级搜索</a>
        </div>
    </el-col>
    <el-col :span="11" v-if="propADUQ && ADUQVisible" >
        <el-button-group style="float:right">
          <el-button @click="handleCreateCOl" :plain="true" type="success" icon="document">{{createCOl}}</el-button>
          <el-button @click="handleEditCOl" :plain="true" :loading="batchEditLoading" :disabled="disabled" type="info" icon="edit">{{editCOl}}</el-button>
          <el-button @click="handleCancelEditCOl" v-if="cancelEdit" :plain="true" type="warning" icon="d-arrow-left">{{cancelEditCOl}}</el-button>
          <el-button @click="handleDeleteCol" :plain="true" :loading="deleteLoading" :disabled="disabled" type="danger" icon="delete" >{{deleteCol}}</el-button>
        </el-button-group>
      </el-col>
  </el-row>
  <el-row v-if="AdvancedSearchVisible">
    <el-col :span="24" style="padding-top:15px;margin-top:5px;border-top: 1px solid #cccccc;">
      <el-form style="float:left;" :inline="true" :model="SearchForm">
        <span>高级搜索 : </span>
        <!--选项1-->
        <el-form-item>
          <el-select style="width:150px" @change="handleFristColumnChange" v-model="SearchForm.item1.f_column" placeholder="请选择列">
            <el-option
              v-for="item in tableCol"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <c-input :columns="SearchForm.item1" :disabled="SearchForm.fDis" :getser="getServerObj"></c-input>
        </el-form-item>
        <!--高级搜索与或关系-->
        <el-form-item>
          <el-select v-model="SearchForm.relational.value" style="width:60px">
            <el-option
              v-for="item in SearchForm.relational.filters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--选项2-->
        <el-form-item>
          <el-select style="width:150px" @change="handleSecondColumnChange" v-model="SearchForm.item2.f_column" placeholder="请选择列">
            <el-option
              v-for="item in tableCol"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <c-input :columns="SearchForm.item2" :disabled="SearchForm.sDis" :getser="getServerObj"></c-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
          <el-button style="margin:0 20px" type="primary" :loading="advSearchLoading" @click="handleAdvancedSearch" icon="search">搜索</el-button>
          <a @click="hiddenAdvancedSearch" style="margin-left:10px;color:#108ee9;cursor:pointer;">收起</a>    
      </el-form>
    </el-col>
  </el-row>
  <el-table
    ref="multipleTable"
    :data="tableData"
    align='left'
    v-loading="tableLoading"
    border
    stripe
    tooltip-effect="dark"
    style="width: 100%"
    highlight-current-row
    @filter-change="handleFilterChange"
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
      :column-key="col.key"          
      v-bind:filters="col.filters.length !== 0 ? col.filters : null"
      v-bind:prop="col.prop"
      v-bind:label="col.label" >
      <template scope="scope">
        <c-input :change="tabledataChange" v-if="scope.row.editstyle" :columns="col" :row="scope.row" :getser="getServerObj"></c-input>
        <!--枚举类型显示为选项-->
        <span v-else-if="!scope.row.editstyle && col.type === 'ENUM'">{{enumDescribes(scope.row, col, col.key)}}</span>
        <span v-else-if="!scope.row.editstyle">{{scope.row[col.key]}}</span>
      </template>
    </el-table-column>
     
  </el-table>
  <div class="cloumn-continer">
  <div v-if="propColumn" class="column-link">
    <a @click="moreFeatures">{{moreFeature}}</a>
    <a v-if="moreVisible" @click="columnVisible = true">自定义列</a>
    <a v-if="moreVisible && propADUQ" @click="batchModify">批量修改</a>
  </div>
  <el-dialog title="自定义表格列" :visible.sync="columnVisible">
  <el-alert
    class="tips"
    title="5个指标能更方便展示列表，您也可以随时再调整。"
    type="info"
    show-icon>
  </el-alert>
  <el-checkbox class="choice-col" v-for="item in tableCol"  :key="item.key" :label="item.label" v-model="item.visible" >{{item.label}}</el-checkbox>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveColumnVidible">确 定</el-button>
    </div>
  </el-dialog>
  <!--批量修改-->
  <el-dialog  title="批量修改" :visible.sync="batchVisible">
    <el-form :inline="true" :model="bratchForm" ref="bratchForm" :rules="bratchFormRules" class="demo-form-inline">
      <el-form-item label="预计修改"><span style="color:#FF4949">{{modLine}} </span>&nbsp;行</el-form-item><br>
      <el-form-item label="请选择列" prop="f_column" >
        <el-select style="width:100px" @change="bratchFormChange" v-model="bratchForm.f_column" placeholder="请选择">
          <el-option
            v-for="item in bratchForm.f_columns"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改为" prop="f_value" >
        <c-input :columns="bratchForm" :disabled="bratchDis" :getser="getServerObj"></c-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="batchVisible = false">取 消</el-button>
      <el-button type="primary" :loading="batchLoading" @click="handleBatchSubmit('bratchForm')">确 定</el-button>
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!--单行编辑-->
    <el-dialog  title="编辑" :visible.sync="singleEditVisible">
      <el-form :model="singleEditForm" :inline="true" label-position="right" label-width="80px">
        <el-form-item v-for="item in singleEditForm" v-bind:key="item.key" v-bind:label="item.label">
          <c-input :columns="item" :getser="getServerObj"></c-input>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="singleEditVisible = false">取 消</el-button>
        <el-button type="primary" :loading="editLoading" @click="handleSingleEditSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--新建记录-->
    <el-dialog  title="新建" :visible.sync="createVisible">
      <el-form :model="createForm" :inline="true" label-position="right" label-width="80px">
        <el-form-item v-for="item in createForm" v-bind:key="item.key" v-bind:label="item.label">
          <c-input :columns="item" :getser="getServerObj"></c-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createVisible = false">取 消</el-button>
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
** fetchObj 获取数据对象
** JoinOther 联合查询对象名称数组
*/
  import {BASICURL, fetch, fetch2} from '../api/api.js'
  import {setCookie, getCookie} from '../utils/cookie.js'
  import CInput from './CInput.vue'
  export default {
    props: {
      fetchObj: {type: String, required: true},
      // // 传入需要联合查询的对象名称
      JoinOther: {type: Object},
      // 自定义功能 搜索 增删改查 分页 自定义列
      propSearch: {type: Boolean, default: true},
      propADUQ: {type: Boolean, default: true},
      propPagination: {type: Boolean, default: true},
      propColumn: {type: Boolean, default: true}
    },
    watch: {
      'fetchObj' () {
        this.reloadingData()
      }
    },
    data () {
      return {
        tableData: [],
        tableCol: [],
        // 表格加载中
        tableLoading: false,
        total: 0,
        currentPage: 1,
        pageSize: 10,
        // 查改增删是否显示
        ADUQVisible: true,
        // 模糊搜索值
        searchValue: '',
        searchLoading: false,
        // 高级搜索是否可见
        AdvancedSearchVisible: false,
        advSearchLoading: false,
        // 表格多选，选中的行
        multipleSelection: [],
        // 控制表格列模态框
        columnVisible: false,
        searchMod: 'adv-search',
        // 搜索框对对应的类型
        SearchForm: {
          item1: {},
          item2: {},
          // 第一列不选 第二列不可操作
          fDis: true,
          sDis: true,
          // 高级搜索与或关系选择器
          relational: {
            value: '',
            filters: [{
              value: 'AND',
              label: '与'
            }, {
              value: 'OR',
              label: '或'
            }]
          }
        },
        // 更多功能
        moreFeature: '更多功能>>',
        moreVisible: false,
        // 批量修改
        batchVisible: false,
        batchLoading: false,
        bratchForm: {},
        bratchFormRules: {
          f_column: [{ required: true, message: '请选择要修改的列', trigger: 'change' }]
        },
        bratchDis: true,
        modLine: 0,
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
        batchEditLoading: false,
        deleteLoading: false,
        // 新建行
        createForm: {},
        createVisible: false,
        createLoading: false,
        // 数据是否有修改
        rowModified: false,
        // 表格筛选
        filterValues: {}
      }
    },
    created: function () {
      this.reloadingData()
      let cookie = getCookie('column');
      if(cookie !== ''){
        cookie = JSON.parse(cookie);
        for (var i in this.tableCol) {
          this.tableCol[i].visible = cookie[this.tableCol[i].key];
          console.log(this.tableCol[i].visible,cookie[this.tableCol[i].key]);
        }
      }
    },
    methods: {
      saveColumnVidible(){
        this.columnVisible = false;
        let column={};
        for (var i in this.tableCol) {
          column[this.tableCol[i].key] = this.tableCol[i].visible;
        }
        setCookie('column',JSON.stringify(column),365);
      },
      // 更多功能
      moreFeatures () {
        this.moreVisible = !this.moreVisible
        if (this.moreVisible) {
          this.moreFeature = '<<收起'
        } else {
          this.moreFeature = '更多功能>>'
        }
      },
      batchModify () {
        this.bratchDis = true
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要修改的行!'
          })
          return
        }
        this.modLine = this.multipleSelection.length
        if (!this.bratchForm.key) {
          for (var i in this.tableCol) {
            if (this.tableCol[i].editable) {
              for (var key in this.tableCol[i]) {
                this.$set(this.bratchForm, key, this.tableCol[i][key])
              }
              break
            }
          }
          for (let n = 0; n < this.tableCol.length; n++) {
            if (this.tableCol[n].editable) {
              this.bratchForm.f_columns.push({value: this.tableCol[n].key,
                text: this.tableCol[n].label
              })
            }
          }
        }
        this.bratchForm.f_value = ''
        this.bratchForm.f_column = ''
        this.batchVisible = true
      },
      bratchFormChange (val) {
        this.bratchDisabled = false
        this.bratchForm.f_value = ''
        this.bratchForm.filters = []
        this.bratchDis = false
        for (let i = 0; i < this.tableCol.length; i++) {
          if (this.tableCol[i].key === val) {
            this.bratchForm.type = this.tableCol[i].type
            this.bratchForm.filters = this.tableCol[i].filters
            if (this.bratchForm.type === 'OBJECT') {
              this.bratchForm.referenceTableName = this.tableCol[i].referenceTableName
              this.getServerObj(this.bratchForm)
            }
            break
          }
        }
      },
      handleBatchSubmit (batchForm) {
        this.$refs[batchForm].validate((valid) => {
          if (valid) {
            this.batchLoading = true
            let params = []
            for (let i = 0; i < this.multipleSelection.length; i++) {
              let param = {}
              param[this.bratchForm.f_column] = this.bratchForm.f_value
              param.uid = this.multipleSelection[i].uid
              params.push(param)
            }
            fetch2(BASICURL + this.fetchObj + '/batchUpdate.api', this.batchMoifyComplate, params)
          }
        })
      },
      batchMoifyComplate (data) {
        this.batchVisible = false
        this.batchLoading = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.reloadingData()
      },
      // 数据是否有修改1
      tabledataChange (value) {
        this.rowModified = true
        this.cancelEdit = false
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
      defineCol(srcCol) {
        let col = {}
        col.key = srcCol.name
        col.prop = srcCol.name
        col.noenull = srcCol.notnull
        col.visible = srcCol.visible
        col.search = true
        col.editable = srcCol.editable
        col.referenceTable = srcCol.referenceTable
        col.referenceTableName = srcCol.referenceTableName
        col.editable = srcCol.editable
        col.sortable = true
        col.filters = []
          // 添加备用属性，非服务器回传,添加 f_ 前缀
        col.f_column = ''
        col.f_value = ''
        col.f_count = 0
        col.f_loading = false
        col.f_columns = []
        col.f_readable = ''
        if (col.referenceTable === '') {
          col.type = this.conversionType(srcCol.type)
        } else {
          col.type = 'OBJECT'
        }
        if(col.type === 'ENUM'){
          if (srcCol.enumvalues.length > 1) {
            for (let j = 0; j < srcCol.enumvalues.length; j++) {
              col.filters.push({
                text: srcCol.enumvalueDescribes[j],
                value: srcCol.enumvalues[j]
              })
            }
          }
        }
        col.label = srcCol.flowchart
        return col;
      },
      dependCol(datas, models, joins, srcCol, tableChain) {
        let tableModel;
        for (let i = 0; i < models.length; i++) {
          if (models[i].name == srcCol.referenceTableName) {
            tableModel = models[i];
            break;
          }
        }
        for (let i = 0; i < tableModel.columns.length; i++) {
          if (tableModel.columns[i].readableIdentifier.length > 0) {
            let destCol = this.defineCol(tableModel.columns[i]);
              destCol.type = 'OBJECT'
            // 引用类型表名称
            destCol.f_tableName = tableModel.name
            // 确定当前select默认选中项
            destCol.selected = ''
            destCol.label = tableModel.columns[i].readableIdentifier
            let fullName = '';
            for (let j = 0; j < tableChain.length; j++) {
              fullName += tableChain[j] + ".";
            }
            fullName += tableModel.name + "." + tableModel.columns[i].name;
            destCol.prop = fullName;
            destCol.key = fullName;
            this.tableCol.push(destCol);
            for (var t = 0; t < datas.length; t++) {
              if (datas[t]) {
                this.tableData[t][fullName] = datas[t][tableModel.columns[i].name];
              } else {
                this.tableData[t][fullName] = null;
              }
            }
          }
          if (tableModel.columns[i].referenceTable.length > 0) {
            if (typeof joins[tableModel.columns[i].name] !== "undefined") {
              let _tableChain = [];
              for (let t = 0; t < tableChain.length; t++) {
                _tableChain.push(tableChain[t]);
              }
              _tableChain.push(tableModel.name);
            
              let _datas = [];
              for (var t = 0; t < datas.length; t++) {
                _datas.push(datas[t][tableModel.columns[i].name]);
              }
            
          this.dependCol(_datas, models, joins[tableModel.columns[i].name], tableModel.columns[i], _tableChain);
        }
      }
    }
  },
  // data回调数据  api调用类型url states数据操作对象
  getDataOnComplate(data) {
    this.tableLoading = false
    if (!this.checkResults(data)) return
    this.tableCol = [];
    this.tableData = [];
    this.tableData = data.entity.list;
    if (data.entity.count) {
      this.total = data.entity.count
    }
    //case1: 联合查询
    if (!this.isEmptyObject(this.JoinOther)) {
      //解决所有对象模型，并查找主对象
      let models = [];
      let mainModel;
      for (var i in data.entity.columnsJsonStr) {
        let a = JSON.parse(data.entity.columnsJsonStr[i]);
        models.push(a);
        if (a.name == this.fetchObj) {
          mainModel = a;
        }
      }
      //转换模型到Table显示的行和列
      for (let i = 0; i < mainModel.columns.length; i++) {

        let col = this.defineCol(mainModel.columns[i]);

        if (mainModel.columns[i].referenceTable.length < 1) {
          this.tableCol.push(col);
        } else {
          if (typeof this.JoinOther[mainModel.columns[i].name] !== "undefined") {
            let datas = [];
            for (var t = 0; t < this.tableData.length; t++) {
              datas.push(this.tableData[t][mainModel.columns[i].name]);
            }
            this.dependCol(datas, models, this.JoinOther[mainModel.columns[i].name], mainModel.columns[i], []);
          }
        }
      }
    }
    //case2: 非联合查询
    else {
      let model = JSON.parse(data.entity.columnsJsonStr[0]);
      for(let i = 0; i < model.columns.length; i++) {
        this.tableCol.push(this.defineCol(model.columns[i]));
      }
    }

    //添加是否编辑状态与行号
    for (let i = 0; i < this.tableData.length; i++) {
      this.$set(this.tableData[i],'editstyle',false);
      this.$set(this.tableData[i],'line',i);
    }
    if (this.searchLoading) this.searchLoading = false
    if (this.advSearchLoading) this.advSearchLoading = false
  },
      // 高级搜索选项一下拉列表框
      handleFristColumnChange (selectItem) {
        this.SearchForm.item1.f_value = ''
        this.SearchForm.item1.filters = []
        this.SearchForm.fDis = false
        for (var i in this.tableCol) {
          if (this.tableCol[i].key === selectItem) {
            this.SearchForm.item1.type = this.tableCol[i].type
            this.SearchForm.item1.filters = this.tableCol[i].filters
            if (this.SearchForm.item1.type === 'OBJECT') {
              this.SearchForm.item1.referenceTableName = this.tableCol[i].referenceTableName
              this.getServerObj(this.SearchForm.item1)
            }
            break
          }
        }
      },
      // 高级搜索选项一下拉列表框
      handleSecondColumnChange (selectItem) {
        this.SearchForm.item2.f_value = ''
        this.SearchForm.item2.filters = []
        this.SearchForm.sDis = false
        for (var i in this.tableCol) {
          if (this.tableCol[i].key === selectItem) {
            this.SearchForm.item2.type = this.tableCol[i].type
            this.SearchForm.item2.filters = this.tableCol[i].filters
            if (this.SearchForm.item2.type === 'OBJECT') {
              this.SearchForm.item2.referenceTableName = this.tableCol[i].referenceTableName
              this.getServerObj(this.SearchForm.item2)
            }
            break
          }
        }
      },
      showAdvancedSearch () {
        this.ADUQVisible = false
        this.AdvancedSearchVisible = true
        this.searchMod = 'search'
        if (!this.SearchForm.item1.key || !this.SearchForm.item2.key) {
          for (var i in this.tableCol) {
            if (this.tableCol[i].editable) {
              for (var key in this.tableCol[i]) {
                this.$set(this.SearchForm.item1, key, this.tableCol[i][key])
                this.$set(this.SearchForm.item2, key, this.tableCol[i][key])
              }
              break
            }
          }
        }
      },
      hiddenAdvancedSearch () {
        this.ADUQVisible = true
        this.AdvancedSearchVisible = false
        this.SearchForm.fDis = true
        this.SearchForm.sDis = true
        this.searchMod = 'adv-search'
        this.SearchForm.item1 = {}
        this.SearchForm.item2 = {}
        this.SearchForm.relational.value = ''
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
        let order = null
        let sorter = {}
        if (val.order === 'ascending') order = 'ASC'
        if (val.order === 'descending') order = 'DESC'
        sorter[val.prop + 'Direction'] = order
        this.reloadingData({sorter: sorter})
      },
      // 判断对象是否为空
      isEmptyObject(e) {  
        var t;  
        for (t in e)  
            return !1;  
        return !0  
      }, 
      // 筛选
      handleFilterChange (filters) {
        for (let key in filters) {
          this.filterValues[key + 'List'] = filters[key]
          if (filters[key].length === 0) {
            delete this.filterValues[key + 'List']
          }
        }
        let params = {ifGetCount: true, ifGetColumns: true, pageSize: this.pageSize, pageNO: this.currentPage}
        if (!this.isEmptyObject(this.JoinOther)) {
          params.ifJoinReference = true
          params.joinCondition = {}
          for (var i in this.JoinOther) {
            params.joinCondition[i] = this.JoinOther[i]
          }
        }
        params.filter = this.filterValues
        this.tableLoading = true
        fetch2(BASICURL + this.fetchObj + '/queryPager.api', this.getDataOnComplate, params)
      },
      // 分页
      handleSizeChange (value) {
        this.pageSize = value
        this.reloadingData()
      },
      // 当前页
      handleCurrentChange (value) {
        this.currentPage = value
        this.reloadingData()
      },
      // 模糊搜索 发起请求
      handleSearch () {
        if (this.searchValue === '') {
          this.$message({
            type: 'warning',
            message: '请输入内容!'
          })
          return
        }
        this.searchLoading = true
        this.reloadingData({fuzzySearchKeyword: this.searchValue})
      },
      // 高级搜索 发起请求
      handleAdvancedSearch () {
        if ((this.SearchForm.item1.f_value === '' ||
            this.SearchForm.item1.f_column === '') &&
            (this.SearchForm.item2.f_value === '' ||
            this.SearchForm.item2.f_column === '')) {
          this.$message({
            type: 'warning',
            message: '请至少选择一项!'
          })
          return
        }
        this.advSearchLoading = true
        let filters = {}
        if (this.SearchForm.item1.f_value !== '') {
          let value1 = []
          value1.push(this.SearchForm.item1.f_value)
          filters[this.SearchForm.item1.f_column + 'List'] = value1
        }
        if (this.SearchForm.item2.f_value !== '') {
          if (this.SearchForm.item1.f_column === this.SearchForm.item2.f_column) {
            filters[this.SearchForm.item1.f_column + 'List'].push(this.SearchForm.item2.f_value)
          } else {
            let value2 = []
            value2.push(this.SearchForm.item2.f_value)
            filters[this.SearchForm.item2.f_column + 'List'] = value2
          }
        }
        let params = {ifGetCount: true,ifGetColumns: true, pageSize: this.pageSize, pageNO: this.currentPage}
        params.filter = filters
        if (!this.isEmptyObject(this.JoinOther)) {
          params.ifJoinReference = true
          params.joinCondition = {}
          for (var i in this.JoinOther) {
            params.joinCondition[i] = this.JoinOther[i]
          }
        }
        if (this.SearchForm.relational.value) params.filter.relationship = this.SearchForm.relational.value
        this.tableLoading = true
        fetch2(BASICURL + this.fetchObj + '/queryPager.api', this.getDataOnComplate, params)
      },
      // 创建表格行
      handleCreateCOl () {
        this.createVisible = true
        this.createForm = {}
        for (let i = 0; i < this.tableCol.length; i++) {
          if (this.tableCol[i].editable) {
            //数据深拷贝
            this.$set(this.createForm, i, JSON.parse(JSON.stringify(this.tableCol[i])));
          }
        }
      },
      // 获取对象类型的更多页
      getServerObj (item, pageNO = 1, keyword = '') {
        // 传入pagenNO可获取更多数据
        if (item.f_tableName) {
          // 默认获取20行
          let params = {ifGetCount: true, ifGetColumns: true, pageSize: 20, pageNO: pageNO}
          params.filter = {}
          params.filter[item.f_readable] = '%' + keyword + '%'
          params.filter[item.f_readable + 'ComparisonOperator'] = 'like'
          fetch2(BASICURL + item.f_tableName + '/queryPager.api', this.getServerObjOnComplate, params, item, pageNO)
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
            states[0][0].f_readable = columns[i].name
          }
        }
        states[0][0].filters = []
        for (let i = 0; i < data.entity.list.length; i++) {
          let name = ''
          for (let j = 0; j < names.length; j++) {
            if (name === '') {
              name = data.entity.list[i][names[j]]
            } else {
              name = name + '/' + names[j]
            }
          }
          states[0][0].filters.push({ value: data.entity.list[i].uid, text: name })
        }
        states[0][0].f_loading = false
        // 未查看的行=当前页码×每页条数 如果大于0说明有剩余行未显示，则可加载
        states[0][0].f_count = data.entity.count - states[0][1] * 20
      },
      // 创建单行表格行提交
      handleCreateSubmit () {
        // this.createLoading = true
        let params = {}
        for (var i in this.createForm) {
          let key = this.createForm[i].key
          if (this.createForm[i].type === 'OBJECT') {
            if(this.JoinOther.mugongsi && this.fetchObj === 'gongsi'){
              params.mugongsiuid = this.createForm[i].selected
            } else {
              // 引用类型key为 表名称 + uid
              key = this.createForm[i].f_tableName + 'uid';
              params[key] = this.createForm[i].selected
            }
          } else {
            params[key] = this.createForm[i].f_value
          }
        }
        if (this.fetchObj === 'user') params.password = params.account
        fetch(BASICURL + this.fetchObj + '/create.api', this.createComplate, params)
      },
      createComplate (data) {
        this.createLoading = false
        this.createVisible = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.reloadingData()
      },
      // 单行编辑表格行
      handleEditCOl () {
        if (this.multipleSelection.length === 1) {
          this.singleEditVisible = true
          this.singleEditForm = {}
          for (let i = 0; i < this.tableCol.length; i++) {
            if (this.tableCol[i].editable) {
              this.$set(this.singleEditForm, i, JSON.parse(JSON.stringify(this.tableCol[i])));
              this.singleEditForm[i].f_value = this.multipleSelection[0][this.tableCol[i].key];
              if(this.singleEditForm[i].type === 'OBJECT'){
                if(this.multipleSelection[0][this.singleEditForm[i].f_tableName]){
                  //添加当前对象为默认选中
                  this.singleEditForm[i].filters.unshift({text:this.multipleSelection[0][this.tableCol[i].key],
                    value:this.multipleSelection[0][this.singleEditForm[i].f_tableName].uid})
                  this.singleEditForm[i].selected = this.multipleSelection[0][this.singleEditForm[i].f_tableName].uid;
                }else {
                  this.singleEditForm[i].selected = null;
                }
              }
            }
          }
        } else {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            this.tableData[this.multipleSelection[i].line].editstyle = true
          }
          if (this.rowModified) {
            this.batchEditLoading = true
            this.tableLoading = true
            fetch2(BASICURL + this.fetchObj + '/batchUpdate.api', this.batchEditComplate, this.multipleSelection)
          } else {
            this.cancelEdit = true
          }
        }
      },
      batchEditComplate (data) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.tableData[this.multipleSelection[i].line].editstyle = false
        }
        this.reloadingData()
        this.batchEditLoading = false
        this.rowModified = false
        this.cancelEdit = false
        this.editCOl = '批量编辑'
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
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
      // 单行编辑提交
      handleSingleEditSubmit () {
        this.editLoading = true
        let params = {}
        for (var i in this.singleEditForm) {
          let key = this.singleEditForm[i].key
          if (this.singleEditForm[i].type === 'OBJECT') {
            if(this.JoinOther.mugongsi && this.fetchObj === 'gongsi'){
              params.mugongsiuid = this.singleEditForm[i].selected
            } else {
              // 引用类型key为 表名称 + uid
              key = this.singleEditForm[i].f_tableName + 'uid';
              params[key] = this.singleEditForm[i].selected
            }
          } else {
            params[key] = this.singleEditForm[i].f_value
          }
        }
        params.uid = this.multipleSelection[0].uid
        fetch(BASICURL + this.fetchObj + '/update.api', this.SingleEditComplate, params)
      },
      SingleEditComplate (data) {
        this.editLoading = false
        this.singleEditVisible = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.reloadingData()
      },
      // 删除表格行
      handleDeleteCol () {
        this.$confirm('此操作将永久删除选中的行, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteLoading = true
          if (this.multipleSelection.length === 1) {
            fetch(BASICURL + this.fetchObj + '/delete.api', this.onDeleteComplate, { uid: this.multipleSelection[0].uid })
          } else {
            let params = []
            for (let i = 0; i < this.multipleSelection.length; i++) {
              params.push({ uid: this.multipleSelection[i].uid })
            }
            this.tableLoading = true
            fetch2(BASICURL + this.fetchObj + '/batchDelete.api', this.onDeleteComplate, params)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      onDeleteComplate (data) {
        this.deleteLoading = false
        if (!this.checkResults(data)) return
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.reloadingData()
      },
      checkResults (data) {
        if (data === null) {
          this.$notify.error({
            title: '提示',
            message: '网络错误，请刷新（F5）后重试。'
          })
          return false
        }
        if (data.errorCode === 0) {
          return true
        } else if(data.errorCode === 3) {
          this.$notify.error({
            title: '错误',
            message: '当前页面发生错误，' + data.message
          })
          let path = this.$route.path.split('/')
          let login = path[path.length - 2]
          this.$router.push({path: '/idev/' + login + '/login'})
        } else {
          this.$notify.error({
            title: '错误',
            message: '当前页面发生错误，' + data.message
          })
          return false
        }
      },
      // 根据的值返回枚举类型的名称
      enumDescribes (row, col, key) {
        if (col.type === 'ENUM') {
          for (let i = 0; i < col.filters.length; i++) {
            if (col.filters[i].value === row[col.key]) {
              return col.filters[i].text
            }
          }
        }
      },
      // 重新获取表格行数据
      reloadingData (...param) {
        let params = {ifGetCount: true, ifGetColumns: true, pageSize: this.pageSize, pageNO: this.currentPage}
        for (let i = 0; i < param.length; i++) {
          params = Object.assign(params, param[i])
        }
        if (!this.isEmptyObject(this.JoinOther)) {
          params.ifJoinReference = true
          // params.condition = {company: {}}
          params.condition = {}
          for (var i in this.JoinOther) {
            params.condition[i] = this.JoinOther[i]
          }
        }
        fetch2(BASICURL + this.fetchObj + '/getPager.api', this.getDataOnComplate, params)
        this.tableLoading = true
      }
    },
    components: {
      CInput
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
}
.column-link a{
  margin-right: 5px; 
}
.pagination{
  float: right;
  margin:10px 20px;    
}
.object-more{
	display: inline-block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 40px;
}
</style>
