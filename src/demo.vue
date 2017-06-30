<<template>
  <el-form :model="createForm" label-position="right" label-width="80px">
        <el-form-item v-for="item in createForm" v-bind:key="item.key" v-bind:label="item.label">
          <!--字符串类型-->
          <el-input style="width:300px;float:left" v-if="item.type === 'STRING'"  v-model="item.value" placeholder="请输入内容"></el-input>
          <!--日期类型样式 -->
          <el-date-picker style="float:left" v-else-if="item.type === 'DATE'" v-model.lazy="item.value" type="datetime" placeholder="选择日期时间"></el-date-picker>
          <!--数字类型样式-->
          <el-input style="float:left" v-else-if="item.type === 'INT'" v-model.number="item.value" type="number" placeholder="请输入..."></el-input>
          <!--枚举类型样式-->
          <el-select style="float:left" v-else-if="item.type === 'ENUM'" v-model.lazy="item.value" placeholder="请选择">
            <el-option
              v-for="list in item.filters"
              :key="list.value"
              :label="list.label"
              :value="list.value"> 
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCreateCancel">取 消</el-button>
        <el-button type="primary" :loading="createLoading" @click="handleCreateSubmit">确 定</el-button>
      </div>
</template>
<<script>
export default {
  data() {
    return {
      formData: {},
      tableCol: [{key: 'name', prop: 'name', label: '姓名', visible: true, type: 'STRING', search: true},
                  {key: 'sex', prop: 'sex', label: '性别', visible: true, type: 'ENUM', filters: [{ value: '男', label: '男' }, { value: '女', label: '女' }]},
                  {key: 'age', prop: 'age', label: '年龄', visible: false, sortable: true, type: 'INT', search: true},
                  {key: 'address', prop: 'address', label: '地址', visible: true, type: 'STRING', editable: true},
                  {key: 'date', prop: 'date', label: '日期', type: 'DATE', visible: false, sortable: true}
        ]
    }
  },
  methods: {
    // 创建表格行
    handleCreateCOl () {
      this.createVisible = true
      this.createForm = {}
      for (let i = 0; i < this.tableCol.length; i++) {
        let key = this.tableCol[i].key
        let label = this.tableCol[i].label
        let type = this.tableCol[i].type
        let filters = []
        if (type === 'ENUM') {
          filters = this.tableCol[i].filters.slice(0)
        }
        this.createForm[i] = { key: key, label: label, filters: filters, type: type, value: '' }
      }
    },
  }
}
</script>
