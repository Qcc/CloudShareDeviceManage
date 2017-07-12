<template>
<div>
	<!--字符串类型-->
	<el-input
		v-if="this.row && columns.editable && columns.type === 'STRING'"
		clearable
		@change="change"
		v-model="row[columns.key]"
		placeholder="请输入内容...">
	</el-input>
	<!--日期类型样式 -->
	<el-date-picker
		v-else-if="this.row &&  columns.editable && columns.type === 'DATE'"
		clearable
		@change="change"
		v-model.lazy="row[columns.key]"
		type="datetime"
		placeholder="选择日期时间...">
	</el-date-picker>
	<!--数字类型样式-->
	<el-input
		v-else-if="this.row && columns.editable && columns.type === 'INT'"
		clearable
		@change="change"
		v-model.number="row[columns.key]"
		type="number"
		placeholder="请输入...">
	</el-input>
	<!--数字类型样式-->
	<el-input
		v-else-if="this.row && columns.editable && columns.type === 'PASSWORD'"
		clearable
		@change="change"
		v-model.number="row[columns.key]"
		type="password"
		placeholder="请输入...">
	</el-input>
	<!--枚举类型样式-->
	<el-select
		v-else-if="this.row && columns.editable && columns.type === 'ENUM'"
		clearable
		@change="change"
		v-model="row[columns.key]"
		placeholder="请选择...">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value"> 
	  </el-option>
	</el-select>
	<!--依赖对象-->
	<el-select
		v-else-if="this.row && columns.editable && columns.type === 'OBJECT'" 
	  v-model="row[columns.key]"
	  filterable
		clearable
		@change="change"
	  remote
	  placeholder="请输入关键词"
	  :remote-method="remoteMethod"
	  :loading="columns.loading">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value">
	  </el-option>
		<el-option v-if="columns.count < 0" :value="null" style="padding:0">
			<a @click.stop="moreData"  class="object-more">还有{{columns.count}}条 点击加载...</a>
	  </el-option>
	</el-select>

  <!--字符串类型-->
	<el-input
		v-if="!this.row && columns.editable && columns.type === 'STRING'"
		clearable
		@change="change"
		v-model="columns.value"
		placeholder="请输入内容...">
	</el-input>
	<!--日期类型样式 -->
	<el-date-picker
		v-else-if="!this.row &&  columns.editable && columns.type === 'DATE'"
		clearable
		@change="change"
		v-model.lazy="columns.value"
		type="datetime"
		placeholder="选择日期时间...">
	</el-date-picker>
	<!--数字类型样式-->
	<el-input
		v-else-if="!this.row && columns.editable && columns.type === 'INT'"
		clearable
		@change="change"
		v-model.number="columns.value"
		type="number"
		placeholder="请输入...">
	</el-input>
	<!--数字类型样式-->
	<el-input
		v-else-if="!this.row && columns.editable && columns.type === 'PASSWORD'"
		clearable
		@change="change"
		v-model.number="columns.value"
		type="password"
		placeholder="请输入...">
	</el-input>
	<!--枚举类型样式-->
	<el-select
		v-else-if="!this.row && columns.editable && columns.type === 'ENUM'"
		clearable
		@change="change"
		v-model="columns.value"
		placeholder="请选择...">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value"> 
	  </el-option>
	</el-select>
	<!--依赖对象-->
	<el-select
		v-else-if="!this.row && columns.editable && columns.type === 'OBJECT'" 
	  v-model="columns.value"
	  filterable
		clearable
		@change="change"
	  remote
	  placeholder="请输入关键词"
	  :remote-method="remoteMethod"
	  :loading="columns.loading">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value">
	  </el-option>
		<el-option v-if="columns.count < 0" :value="null" style="padding:0">
			<a @click.stop="moreData"  class="object-more">还有{{columns.count}}条 点击加载...</a>
	  </el-option>
	</el-select>
</div>
</template>
<script>
  export default {
    props: {
      columns: {
        type: Object,
        required: true
      },
      row: {
        type: Object,
        default: null
      },
      getser: {
        type: Function,
        default: function () {
          return null
        }
      },
      change: {
        type: Function,
        default: function () {
          return null
        }
      }
    },
    data () {
      return {
        count: 1,
        query: ''
      }
    },
    created: function () {
      if (this.columns.type === 'OBJECT') {
        this.getser(this.columns, 1, this.query)
      }
    },
    methods: {
      moreData () {
        this.columns.filters = []
        this.columns.loading = true
        this.count++
        this.getser(this.columns, this.count, this.query)
      },
      remoteMethod (query) {
        this.query = query
        if (this.columns.filters.length === 0) {
          this.columns.loading = true
          this.getser(this.columns, 1, query)
        } else {
          let flag = true
          for (var key in this.columns.filters) {
            if (this.columns.filters[key].text === query || query === '') {
              flag = false
            }
          }
          if (flag) {
            this.columns.filters = []
            this.columns.loading = true
            this.getser(this.columns, 1, query)
          }
        }
      }
    }
  }
</script>
<style>
.object-more{
	display: inline-block;
	width: 100%;
	height: 100%;
	text-align: center;
	line-height: 40px;
}
</style>

