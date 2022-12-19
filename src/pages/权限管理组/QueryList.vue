<template>
  <a-card>
    <div class="search">
      <a-form :form="form"  layout="horizontal">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="用户名称"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 18, offset: 1 }"
            >
              <a-input  v-decorator="['name']" placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="用户状态"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 18, offset: 1 }"
            >
              <a-select v-decorator="['status']" placeholder="请选择">
                <a-select-option value="1">停用</a-select-option>
                <a-select-option value="2">正常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="用户账号"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 18, offset: 1 }"
            >
              <a-input v-decorator="['username']" style="width: 100%" placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="handleSubmit">查询</a-button>
          <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
      </a-space>
      <a-table
          :scroll="{ x: 1920 }"
          :columns="columns"
          :dataSource="dataSource"
          rowKey="id"
          :loading="loading"
          @change="onChange"
          :pagination="{ ...pagination, onChange: onPageChange }"
      >
        <template slot="action" slot-scope="record">
          <router-link style="margin-right: 8px" :to="`edit/${record.id}`"
          ><a-icon type="edit" />编辑</router-link
          >
          <a-popconfirm
              v-if="record.status === 0"
              title="确定要启用此用户吗?"
              @confirm="() => startUser(record.id)"
          >
            <a style="margin-right: 8px">
              <a-icon type="check-circle" />启用
            </a>
          </a-popconfirm>
          <a-popconfirm
              v-if="record.status === 1"
              title="确定要停用此用户吗?"
              @confirm="() => endUser(record.id)"
          >
            <a style="margin-right: 8px">
              <a-icon type="close-circle" />停用
            </a>
          </a-popconfirm>
          <router-link :to="`detail/${record.id}`"
          ><a-icon type="file-search" />详情</router-link
          >
        </template>
        <template slot="status" slot-scope="text">
          <a-tag v-if="text === 0" color="red">
            停用
          </a-tag>
          <a-tag v-else color="green">
            正常
          </a-tag>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { request } from "@/utils/request";
const columns = [
  {
    title: "用户账号",
    dataIndex: "username",
    key:'username',
    fixed: 'left',
    width: 200,
  },
  {
    title: "用户姓名",
    key:'name',
    dataIndex: "name"
  },
  {
    title: "联系电话",
    key:'phone',
    dataIndex: "phone"
  },
  {
    title: "所在地址",
    key:'address',
    dataIndex: "address"
  },
  {
    title: "所属机构",
    key:'department',
    dataIndex: "department"
  },
  {
    title: "工作岗位",
    key:'job',
    dataIndex: "job"
  },
  {
    title: "邮箱",
    key:'email',
    dataIndex: "email"
  },
  {
    title: "用户状态",
    key:'status',
    dataIndex: "status",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "操作",
    key:'action',
    scopedSlots: { customRender: "action" },
    fixed: 'right',
    width: 200,
  }
];

export default {
  name: "UserQueryList",
  data() {
    return {
      columns: columns,
      dataSource: [],
      form: this.$form.createForm(this),
      loading:false,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    resetForm() {
      this.form.resetFields();
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    getData() {
      this.loading=true
      request(process.env.VUE_APP_API_BASE_URL + "/userList", "get", {
        page: this.pagination.current,
        pageSize: this.pagination.pageSize
      }).then(res => {
        const { list, page, pageSize, total } = res?.data?.data ?? {};
        console.log({ list, page, pageSize, total } )
        this.dataSource = list;
        this.pagination.current = page;
        this.pagination.pageSize = pageSize;
        this.pagination.total = total;
      }).finally(()=>{
        this.loading=false
      });
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key);
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.$message.info("选中行改变了");
    },
    addNew() {
      this.$router.push("add")
      // this.dataSource.unshift({
      //   id: this.dataSource.length,
      //   username: "urara" + this.dataSource.length,
      //   name: "张三",
      //   phone: 13296314652,
      //   address: "山东省威海市",
      //   departmentId: 2,
      //   job: "会计",
      //   email: "48612312@qq.com",
      //   status: 0
      // });
    },
    startUser(id){
      console.log("启用用户",id)
    },
    endUser(id){
      console.log("停用用户",id)
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
