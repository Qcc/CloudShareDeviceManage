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
		v-else-if="this.row &&  columns.editable && columns.type === 'DATETIME'"
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
	  :loading="columns.f_loading">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value">
	  </el-option>
		<el-option v-if="columns.f_count > 0" :value="null" style="padding:0">
			<a @click.stop="moreData"  class="object-more">还有{{columns.f_count}}条 点击加载...</a>
	  </el-option>
	</el-select>
  <!--表单渲染-->
  <!--字符串类型-->
	<el-input
		v-if="!this.row && columns.editable && columns.type === 'STRING'"
		clearable
    :disabled="disabled"
		@change="change"
		v-model="columns.f_value"
		placeholder="请输入内容...">
	</el-input>
	<!--日期类型样式 -->
	<el-date-picker
		v-else-if="!this.row &&  columns.editable && columns.type === 'DATETIME'"
		clearable
    :disabled="disabled"
		@change="change"
		v-model.lazy="columns.f_value"
		type="datetime"
		placeholder="选择日期时间...">
	</el-date-picker>
	<!--数字类型样式-->
	<el-input
		v-else-if="!this.row && columns.editable && columns.type === 'INT'"
		clearable
    :disabled="disabled"
		@change="change"
		v-model.number="columns.f_value"
		type="number"
		placeholder="请输入...">
	</el-input>
	<!--数字类型样式-->
	<el-input
		v-else-if="!this.row && columns.editable && columns.type === 'PASSWORD'"
		clearable
    :disabled="disabled"
		@change="change"
		v-model.number="columns.f_value"
		type="password"
		placeholder="请输入...">
	</el-input>
	<!--枚举类型样式-->
	<el-select
		v-else-if="!this.row && columns.editable && columns.type === 'ENUM'"
		clearable
    :disabled="disabled"
		@change="change"
		v-model="columns.f_value"
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
	  v-model="columns.f_value"
	  filterable
    :disabled="disabled"
		clearable
		@change="change"
	  remote
	  placeholder="请输入关键词"
	  :remote-method="remoteMethod"
	  :loading="columns.f_loading">
	  <el-option
	    v-for="item in columns.filters"
	    :key="item.value"
	    :label="item.text"
	    :value="item.value">
	  </el-option>
		<el-option v-if="columns.f_count > 0" :value="null" style="padding:0">
			<a @click.stop="moreData"  class="object-more">还有{{columns.f_count}}条 点击加载...</a>
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
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pageSize: 1,
        keywords: ''
      }
    },
    created: function () {
      if (this.columns.type === 'OBJECT') {
        this.getser(this.columns, 1, this.keywords)
      }
    },
    methods: {
      moreData () {
        this.columns.f_loading = true
        this.pageSize++
        this.getser(this.columns, this.pageSize, this.keywords)
      },
      remoteMethod (keywords) {
        this.keywords = keywords
        if (this.columns.filters.length === 0) {
          this.columns.f_loading = true
          this.getser(this.columns, 1, keywords)
        } else {
          let flag = true
          for (var key in this.columns.filters) {
            if (this.columns.filters[key].text === keywords) {
              flag = false
            }
          }
          if (flag) {
            this.columns.f_loading = true
            this.getser(this.columns, 1, keywords)
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

