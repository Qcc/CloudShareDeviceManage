<template>
  <div>
		<el-table
    :data="tableData"
		align='left'
    stripe
		@filter-change="handleFilterChange"
    @sort-change="handleSortChange"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="table-expand">
					<div class="item">
          <el-form-item  label="设备编号">
            <span>{{ props.row.bianhao }}</span>
          </el-form-item><br/>
          <el-form-item  label="编号状态">
            <span>{{ props.row.zhuangtaiming }}</span>
          </el-form-item>
          <el-form-item  label="二维码地址">
            <span>{{ props.row.dizhi }}</span>
          </el-form-item>
					</div>
          <el-form-item class="qrcode" label="设备二维码">
						<q-rcode :text ="props.row.dizhi" :bianhao="props.row.bianhao"></q-rcode>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
			sortable
      label="设备编号"
      prop="bianhao">
    </el-table-column>
    <el-table-column
			:filters="[{ text: '已分配', value: 1 }, { text: '未分配', value: 0 }]"
      label="设备状态"
			column-key="zhuangtai"
      prop="zhuangtaiming">
    </el-table-column>
    <el-table-column
      label="扫描地址"
      prop="dizhi">
    </el-table-column>
  </el-table>
	<div class="batch-add">
		<el-input-number v-model="num" :min="1"></el-input-number>
  	<el-button  @click="batchCreate" :loading="loading" :plain="true">生成编号</el-button>
  	<el-button  @click="saveFile" :plain="true">导出二维码数据</el-button>		
  </div>
	<el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 200, 500, 1000]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
	</div>
</template>
<script>
import QRcode from '../components/QRcode.vue'
import {BASICURL, fetch, fetch2} from '../api/api.js'
export default {
	data() {
    return {
      tableData: [],
      tableCol: [],
			total: 0,
      currentPage: 1,
      pageSize: 10,
			// 表格筛选
      filterValues: {},
			num:0,
			loading:false
    }
  },
	created: function () {
    this.reloadingData();
  },
	methods:{
		saveFile() {
			var str = ''
			for(let i = 0; i < this.tableData.length; i++){
				str += this.tableData[i].dizhi +','
			}
			var time = new Date()
			var name = '二维码地址' + this.tableData.length + '条_' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '.txt'
      this.exportRaw(name, str);
    },
		// 导出txt文件
		exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      this.fakeClick(save_link);
    },
		fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      obj.dispatchEvent(ev);
    },
		batchCreate () {
			this.$confirm(`此操作将永久生成 ${ this.num } 条设备编号, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
					fetch(BASICURL+'shebeibianhao/batchCreate.api', this.createComplate,{param:this.num});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消生成'
          })
        })
		},
		createComplate(data){
			this.loading = false;
			if (!this.checkResults(data)) return
			this.$message({
        type: 'success',
        message: '已成功生成编号!'
      })
			this.reloadingData();
		},
		createQrcode () {
			this.$refs.Qrcode.createQr();
		},
    getDataOnComplate (data, ...states) {
      if (!this.checkResults(data)) return
      //  添加是否编辑状态与行号
			if (data.entity.count) {
        this.total = data.entity.count
      }
      this.tableData = []
      if (data.entity.list) {
        for (let i = 0; i < data.entity.list.length; i++) {
					if (data.entity.list[i].zhuangtai === 1) {
          	data.entity.list[i].zhuangtaiming = '已分配'
					} else {
          	data.entity.list[i].zhuangtaiming = '未分配'
					}
					data.entity.list[i].dizhi = 'http://www.szcloudshare/idev/idx.api?d=' + data.entity.list[i].bianhao
          data.entity.list[i].line = i
          this.tableData.push(data.entity.list[i])
        }
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
    // 筛选
    handleFilterChange (filters) {
      for (let key in filters) {
        this.filterValues[key + 'List'] = filters[key]
        if (filters[key].length === 0) {
          delete this.filterValues[key + 'List']
        }
      }
      let params = {ifGetCount: true, pageSize: this.pageSize, pageNO: this.currentPage}
      params.filter = this.filterValues
      this.tableLoading = true
      fetch2(BASICURL + 'shebeibianhao/queryPager.api', this.getDataOnComplate, params)
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
		// 重新获取表格行数据
    reloadingData (...param) {
      let params = {ifGetCount: true, pageSize: this.pageSize, pageNO: this.currentPage}
      for (let i = 0; i < param.length; i++) {
        params = Object.assign(params, param[i])
      }
      fetch2(BASICURL + 'shebeibianhao/getPager.api', this.getDataOnComplate, params)
      this.tableLoading = true
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
        }else if(data.errorCode === 3) {
          this.$notify.error({
            title: '错误',
            message: '当前页面发生错误，' + data.message
          })
          let path = this.$route.path.split('/')
          let login = path[path.length - 2]
          this.$router.push({path: '/idev/' + login + '/login'})
        } else {
          return false
          this.$notify.error({
            title: '错误',
            message: '当前页面发生错误，' + data.message
          })
        }
      }
	},
  components:{
      QRcode
  }
}
</script>
<style>
  .table-expand {
    font-size: 0;
		margin: 0px;
		padding:0px;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .item {
		margin: 0;
		padding:0;
    width: 50%;
		display: inline-block;
  }
	.table-expand .qrcode {
		margin: 0;
		padding:0;		
    width: 45%;
		text-align: right;
		display: inline-block;		
	}
	.batch-add{
		float:left;
		margin-top: 10px;
	}
	.pagination{
  	float: right;
  	margin:10px 20px;    
	}
</style>