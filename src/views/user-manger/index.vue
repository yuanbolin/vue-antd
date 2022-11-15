<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称" />
      </el-form-item>
      <el-form-item label="系统角色">
        <el-select v-model="formInline.role" placeholder="系统角色">
          <el-option label="会计" value="shanghai" />
          <el-option label="销售员" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column width="120" label="姓名">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="查看详情"
            placement="right"
          >
            <el-tag class="pointer" @click="handleInfo(scope.row)">
              <svg-icon icon-class="user" /> <span>{{ scope.row.name }}</span>
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="role"
        label="系统角色"
      />
      <el-table-column
        prop="date"
        label="创建日期"
      />
      <el-table-column
        prop="phone"
        label="联系方式"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-popconfirm
            v-if="!scope.row.hasChildren"
            style="margin-left: 10px"
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="text"
            >删除</el-button>
          </el-popconfirm>
          <el-tooltip
            v-if="scope.row.status === 'false'"
            class="item"
            effect="dark"
            content="用户状态正常"
            placement="top"
          >
            <el-tag
              style="margin-left: 10px"
              type="success"
              class="pointer"
              @click="handleChangeStatus(scope.row,true)"
            ><svg-icon icon-class="启用" /> 正常</el-tag>
          </el-tooltip>
          <el-tooltip
            v-else-if="scope.row.status === 'true'"
            class="item"
            effect="dark"
            content="用户已停用,禁止登录"
            placement="top"
          >
            <el-tag
              style="margin-left: 10px"
              type="danger"
              class="pointer"
              @click="handleChangeStatus(scope.row,false)"
            >
              <svg-icon icon-class="禁用" /> 停用</el-tag>
          </el-tooltip>
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
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        role: '销售员',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        role: '会计',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        role: '销售员',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        role: '会计',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 5,
        date: '2016-05-08',
        name: '王小虎',
        role: '会计',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎',
        role: '营销经理',
        status: 'false',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }, {
        id: 7,
        date: '2016-05-07',
        name: '王小虎',
        role: '上海部',
        status: 'true',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: 17863658012
      }],
      Pagination: {
        currentPage: 1,
        size: 10,
        total: 45
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push(`/user-manager/edit/${row.id}`)
    },
    handleDelete(index, row) {
      this.$router.push(`/user-manager/edit/${row.id}`)
    },
    handleInfo(row) {
      this.$router.push(`/user-manager/info/${row.id}`)
    },
    handleAdd() {
      this.$router.push(`/user-manager/add`)
    },
    handleChangeStatus(row, flag) {
      console.log(row, flag)
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
