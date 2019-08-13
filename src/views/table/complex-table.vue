<template>
  <div class="app-container w3-container">
    <div class="w3-row">
      <div class="w3-col l4 m4 s4 w3-center">
        <img src="@/assets/teams/team-a.png" alt="TEAM A" style="width:auto; height: 250px; padding: 5px;">
      </div>
      <div class="w3-col l4 m4 s4 w3-center">
        <p>VS</p>
      </div>
      <div class="w3-col l4 m4 s4 w3-center">
        <img src="@/assets/teams/team-b.png" alt="TEAM B" style="width:auto; height: 250px; padding: 5px;">
      </div>
    </div>
    <div class="w3-row">
      <div class="w3-col l4 m4 s4 w3-center">
        <p>--</p>
      </div>
      <div class="w3-col l4 m4 s4 w3-center">
        <p>HOY</p>
      </div>
      <div class="w3-col l4 m4 s4 w3-center">
        <p>--</p>
      </div>
    </div>
    <div class="w3-row">
      <div class="w3-col l4 m4 s4">
        <div class="w3-row w3-center">
          <img src="@/assets/icons/EquipoArbitral.svg" alt="EQUIPO ARBITRAL" onclick="document.getElementById('modal-equipo').style.display='block'" style="width:auto; height: 250px; padding: 5px;">
        </div>
        <div class="w3-row w3-center">
          <button class="w3-button" onclick="document.getElementById('modal-equipo').style.display='block'">Equipo arbitral</button>
        </div>
      </div>
      <div class="w3-col l4 m4 s4">
        <div class="w3-row w3-center">
          <img src="@/assets/icons/Location.svg" alt="PABELLÓN" onclick="document.getElementById('modal-pabellon').style.display='block'" style="width:auto; height: 250px; padding: 5px;">
        </div>
        <div class="w3-row w3-center">
          <button class="w3-button" onclick="document.getElementById('modal-pabellon').style.display='block'">Pabellón</button>
        </div>
      </div>
      <div class="w3-col l4 m4 s4">
        <div class="w3-row w3-center">
          <img src="@/assets/icons/History.svg" alt="HISTÓRICO" onclick="document.getElementById('modal-historico').style.display='block'" style="width:auto; height: 250px; padding: 5px;">
        </div>
        <div class="w3-row w3-center">
          <button class="w3-button" onclick="document.getElementById('modal-historico').style.display='block'">Histórico</button>
        </div>
      </div>
    </div>
    <div id="modal-equipo" class="w3-modal">
      <div class="w3-modal-content">
        <div class="w3-container">
          <span onclick="document.getElementById('modal-equipo').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <p>Some text in the Modal..</p>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div><div id="modal-pabellon" class="w3-modal">
      <div class="w3-modal-content">
        <div class="w3-container">
          <span onclick="document.getElementById('modal-pabellon').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <p>Some text in the Modal..</p>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div><div id="modal-historico" class="w3-modal">
      <div class="w3-modal-content">
        <div class="w3-container">
          <span onclick="document.getElementById('modal-historico').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <p>Some text in the Modal..</p>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import 'w3-css/w3.css'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
