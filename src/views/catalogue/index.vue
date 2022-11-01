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
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        prop="label"
        label="名称"
      />
      <el-table-column
        prop="message"
        label="描述"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="180"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type==='flowchart'">流程图</el-tag>
          <el-tag v-else-if="scope.row.type==='catalogue'" type="success">目录</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="280" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.type==='catalogue'"
            size="mini"
            @click="handleAdd(scope.$index, scope.row)"
          >新增</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            v-if="!scope.row.hasChildren"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="Pagination.total>0" :total="Pagination.total" :page.sync="Pagination.currentPage" :limit.sync="Pagination.size" @pagination="getList" />

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      Pagination: {
        currentPage: 1,
        size: 10,
        total: 45
      },
      formInline: {
        user: '',
        region: ''
      },
      tableData: [{
        id: 1,
        type: 'catalogue',
        message: '流程图描述',
        label: '王小虎'
      }, {
        id: 2,
        type: 'catalogue',
        message: '流程图描述',
        label: '王小虎',
        children: [{
          id: 31,
          type: 'catalogue',
          message: '流程图描述',
          label: '王小虎',
          children: [{
            id: 33,
            type: 'catalogue',
            message: '流程图描述',
            label: '王小虎'
          }, {
            id: 34,
            type: 'catalogue',
            message: '流程图描述',
            label: '王小虎'
          }]
        }, {
          id: 32,
          type: 'catalogue',
          message: '流程图描述',
          label: '王小虎'
        }]
      }, {
        id: 3,
        type: 'catalogue',
        message: '流程图描述',
        label: '王小虎',
        hasChildren: true
      }, {
        id: 4,
        type: 'flowchart',
        message: '流程图描述',
        label: '王小虎'
      }]
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 35,
            type: 'catalogue',
            message: '流程图描述',
            label: '王小虎',
            hasChildren: true
          }, {
            id: 36,
            type: 'flowchart',
            message: '流程图描述',
            label: '王小虎'
          }
        ])
      }, 1000)
    },
    handleEdit(index, row) {
      console.log(index, row)
      if (row.type === 'flowchart') {
        this.$router.push(`/butterfly/index/${row.id}`)
      }
    },
    handleAdd(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
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
<style scoped>
.container{
  padding: 20px 20px 0 20px;
}
</style>
