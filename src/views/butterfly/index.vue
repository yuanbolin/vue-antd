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
        <el-button @click="dialog = true">新增流程图</el-button>
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
        prop="province"
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
          <el-button
            type="text"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >绘制流程图</el-button>
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
    <el-drawer
      ref="drawer"
      title="新增流程图 "
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="流程图名称" prop="name">
            <el-input v-model="form.name" autocomplete="off" placeholder="名称" />
          </el-form-item>
          <el-form-item label="流程图备注" prop="remark">
            <el-input v-model="form.remark" autocomplete="off" placeholder="备注" />
          </el-form-item>
          <el-form-item label="所属目录">
            <el-cascader v-model="form.region" :props="{value:'id'}" placeholder="所属目录" :options="options" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
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
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入流程图名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请填写流程图备注', trigger: 'blur' }
        ]
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
        id: 1,
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 4,
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 5,
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 7,
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
      },
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      timer: null
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push(`/butterfly/draw/${row.id}`)
    },
    handleAdd() {
      this.$router.push(`/butterfly/draw`)
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
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch(_ => {})
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped>
.container .tr_style {
  background: #eee;
}
.demo-drawer__content{
  padding: 10px 25px;
}
</style>
