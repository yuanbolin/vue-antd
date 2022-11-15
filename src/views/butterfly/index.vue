<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称" />
      </el-form-item>
      <el-form-item label="所属目录">
        <el-cascader v-model="formInline.region" :props="{value:'id'}" placeholder="所属目录" :options="options" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd">新增流程图</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      max-height="500"
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="查看详情"
            placement="top"
          >
            <el-tag class="pointer" @click="handleInfo(scope)">
              <svg-icon icon-class="流程图" /> <span>{{ scope.row.name }}</span>
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
      <el-table-column
        prop="province"
        label="所属目录"
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
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="Pagination.total>0" :total="Pagination.total" :page.sync="Pagination.currentPage" :limit.sync="Pagination.size" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ButterFlyList',
  components: { Pagination },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      options: [
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
      ],
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
    handleEdit(index, row) {
      console.log(index, row)
      if (row.type === 'flowchart') {
        this.$router.push(`/butterfly/index/${row.id}`)
      }
    },
    handleAdd(index, row) {
      console.log(index, row)
    },
    handleInfo(e) {
      console.log(e)
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

<style>
.container .tr_style {
  background: #eee;
}
</style>
