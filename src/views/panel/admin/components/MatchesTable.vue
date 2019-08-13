<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Fecha" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.timestamp }}
      </template>
    </el-table-column>
    <el-table-column label="Partido" min-width="100">
      <template slot-scope="scope">
        {{ scope.row.name | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column label="Pabellón" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.field }}
      </template>
    </el-table-column>
    <el-table-column label="Enlace al partido" width="200" align="center">
      <template slot-scope="scope">
        <a class="el-button" :href="scope.row.link">Acceder al partido</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { matchesList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      matchesList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
