<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd()">新增根目录</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="查看详情"
            placement="top"
          >
            <el-tag class="pointer" @click="handleInfo(scope.row)">
              <svg-icon icon-class="tree-table" /> <span>{{ scope.row.label }}</span>
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
      />
      <el-table-column
        prop="date"
        label="修改日期"
      />
      <el-table-column prop="message" label="描述" />
      <el-table-column width="280" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.level<3"
            type="text"
            size="mini"
            @click="handleAdd(scope.$index, scope.row)"
          >新增子目录</el-button>
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
            v-if="scope.row.status === 'true'"
            class="item"
            effect="dark"
            content="用户可见"
            placement="top"
          >
            <el-tag
              style="margin-left: 10px"
              type="success"
              class="pointer"
              @click="handleShow(scope.$index, scope.row)"
            ><svg-icon icon-class="kejian" /> 可见</el-tag>
          </el-tooltip>
          <el-tooltip
            v-else-if="scope.row.status === 'false'"
            class="item"
            effect="dark"
            content="用户不可见"
            placement="top"
          >
            <el-tag
              style="margin-left: 10px"
              type="danger"
              class="pointer"
              @click="handleHide(scope.$index, scope.row)"
            >
              <svg-icon icon-class="yincangbukejian" /> 不可见</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="Pagination.total > 0"
      :total="Pagination.total"
      :page.sync="Pagination.currentPage"
      :limit.sync="Pagination.size"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'CatalogueList',
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
      tableData: [
        {
          id: 1,
          status: 'true',
          message: '流程图描述',
          label: '王小虎',
          level: 1
        },
        {
          id: 2,
          status: 'true',
          message: '流程图描述',
          label: '王小虎',
          level: 1,
          children: [
            {
              id: 31,
              status: 'true',
              message: '流程图描述',
              label: '王小虎',
              level: 2,
              children: [
                {
                  id: 34,
                  status: 'true',
                  message: '流程图描述',
                  label: '王小虎',
                  level: 3
                },
                {
                  id: 33,
                  status: 'true',
                  message: '流程图描述',
                  label: '王小虎',
                  level: 3
                },
                {
                  id: 34,
                  status: 'true',
                  message: '流程图描述',
                  label: '王小虎',
                  level: 3
                }
              ]
            },
            {
              id: 32,
              status: 'true',
              message: '流程图描述',
              label: '王小虎',
              level: 2
            }
          ]
        },
        {
          id: 3,
          status: 'false',
          message: '流程图描述',
          label: '王小虎',
          level: 1,
          hasChildren: true
        },
        {
          id: 4,
          status: 'true',
          message: '流程图描述',
          level: 1,
          label: '王小虎'
        },
        {
          id: 37,
          status: 'true',
          message: '流程图描述',
          level: 1,
          label: '王小虎'
        },
        {
          id: 38,
          status: 'true',
          message: '流程图描述',
          level: 1,
          label: '王小虎'
        },
        {
          id: 39,
          status: 'true',
          message: '流程图描述',
          level: 1,
          label: '王小虎'
        },
        {
          id: 40,
          status: 'true',
          message: '流程图描述',
          label: '王小虎',
          level: 1
        },
        {
          id: 41,
          status: 'true',
          message: '流程图描述',
          label: '王小虎',
          level: 1
        },
        {
          id: 42,
          status: 'true',
          message: '流程图描述',
          label: '王小虎',
          level: 1
        }
      ]
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 35,
            type: 'catalogue',
            status: 'true',
            message: '流程图描述',
            label: '王小虎',
            level: 2
          },
          {
            id: 36,
            type: 'flowchart',
            status: 'true',
            message: '流程图描述',
            label: '王小虎',
            level: 2
          }
        ])
      }, 1000)
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push(`/catalogue/edit/${row.id}`)
    },
    handleAdd(row = { id: '' }) {
      console.log(row)
      this.$router.push(`/catalogue/add/${row.id}`)
    },
    handleInfo(e) {
      console.log(e)
      this.$router.push(`/catalogue/info/${e.id}`)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleShow(index, row) {
      console.log(index, row)
    },
    handleHide(index, row) {
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
.container {
  padding: 20px 20px 0 20px;
}
</style>
