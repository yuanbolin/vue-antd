<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="date"
        label="日期"
      />
      <el-table-column
        prop="province"
        label="省份"
      />
      <el-table-column
        prop="city"
        label="市区"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        prop="zip"
        label="邮编"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="Pagination.total>0" :total="Pagination.total" :page.sync="Pagination.currentPage" :limit.sync="Pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'UserList',
  components: { Pagination },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      Pagination: {
        currentPage: 1,
        size: 10,
        total: 45
      }
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    onSubmit() {
      console.log('submit!')
    },
    getList(args) {
      console.log('pagnation change==>', args)
    }
  }
}
</script>

<style>
.container .tr_style {
  background: #eee;
}
</style>
