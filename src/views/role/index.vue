<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="formInline.user" placeholder="角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd">新增角色</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column width="120" label="角色名称">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="查看详情"
            placement="right"
          >
            <el-tag class="pointer" @click="handleInfo(scope.row)">
              <svg-icon icon-class="角色管理" /> <span>{{ scope.row.name }}</span>
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
      />
      <el-table-column
        prop="num"
        label="授权的用户数量"
      />
      <el-table-column
        prop="remark"
        label="描述"
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
        name: '销售员',
        remark: '上海市普陀区金沙江路 1518 弄',
        num: 200333
      }, {
        id: 2,
        date: '2016-05-03',
        name: '会计',
        remark: '上海市普陀区金沙江路 1518 弄',
        num: 200333
      }, {
        id: 3,
        date: '2016-05-03',
        name: '营销经理',
        remark: '上海市普陀区金沙江路 1518 弄',
        num: 200333
      }, {
        id: 4,
        date: '2016-05-03',
        name: '营销员',
        remark: '上海市普陀区金沙江路 1518 弄',
        num: 200333
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
      this.$router.push(`/role/edit/${row.id}`)
    },
    handleDelete(index, row) {
      this.$router.push(`/role/edit/${row.id}`)
    },
    handleInfo(row) {
      this.$router.push(`/role/info/${row.id}`)
    },
    handleAdd() {
      this.$router.push(`/role/add`)
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
