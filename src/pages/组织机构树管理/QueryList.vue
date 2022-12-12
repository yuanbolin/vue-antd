<template>
  <a-card>
    <div class="search">
      <a-form layout="horizontal">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="目录名称"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 18, offset: 1 }"
            >
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
        </a-row>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button @click="openRow"
          ><a-icon :type="isOpen ? 'down' : 'up'"></a-icon>全部{{
            isOpen ? "闭合" : "展开"
          }}</a-button
        >
      </a-space>
      <a-table
        rowKey="id"
        @change="tableChange"
        :pagination="pagination"
        :columns="columns"
        :data-source="dataSource"
        :expanded-row-keys.sync="expandedRowKeys"
      >
        <template slot="name" slot-scope="text, record">
          <a-tag
            v-if="record.type === 'catalogue'"
            :style="
              record.public
                ? {
                    background: '#fff',
                    borderStyle: 'dashed',
                    borderColor: '#33cd8d'
                  }
                : { background: '#fff', borderStyle: 'dashed' }
            "
          >
            <a-icon
              :style="record.public ? { color: '#33cd8d' } : { color: '#aaa' }"
              type="unordered-list"
            />
            {{ text }}
          </a-tag>
          <a-tag
            v-else
            :style="
              record.public
                ? {
                    background: '#fff',
                    borderStyle: 'dashed',
                    borderColor: '#33cd8d'
                  }
                : { background: '#fff', borderStyle: 'dashed' }
            "
          >
            <a-icon
              :style="record.public ? { color: '#33cd8d' } : { color: '#aaa' }"
              type="sliders"
            />
            {{ text }}
          </a-tag>
        </template>
        <template slot="level" slot-scope="text, record">
          <a-tag v-if="record.type === 'catalogue'" color="#33cd8d">
            {{ text }} 级目录
          </a-tag>
          <a-tag v-else color="#33aecd">
            {{ parseInt(text) - 1 }} 级流程
          </a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-dropdown v-if="record.type === 'catalogue'">
            <a style="margin-right: 8px"> <a-icon type="plus" />新增 </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">新增子目录</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">新增子流程</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">新增同级目录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <router-link
            v-if="record.type === 'info'"
            style="margin-right: 8px"
            :to="`antvx6/${record.key}`"
            ><a-icon type="highlight" />绘制
          </router-link>
          <a style="margin-right: 8px"> <a-icon type="edit" />编辑 </a>
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="() => deleteRecord(record.key)"
          >
            <a style="margin-right: 8px"> <a-icon type="delete" />删除 </a>
          </a-popconfirm>
          <router-link :to="`/list/query/detail/${record.key}`"
            ><a-icon type="file-search" />详情</router-link
          >
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
// import { request } from "@/utils/request";
const columns = [
  {
    title: "目录名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" },
    filters: [
      {
        text: "公开",
        value: 1
      },
      {
        text: "未公开",
        value: 0
      }
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.public === value
  },
  {
    title: "标识",
    dataIndex: "level",
    key: "level",
    width: "12%",
    scopedSlots: { customRender: "level" }
  },
  {
    title: "目录描述",
    dataIndex: "message",
    width: "30%",
    ellipsis: true,
    key: "message"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "organizationQueryList",
  data() {
    return {
      columns: columns,
      dataSource: [],
      selectedRows: [],
      isOpen: false,
      expandedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 2
      }
    };
  },
  authorize: {
    deleteRecord: "delete"
  },
  mounted() {
    this.getData();
  },
  methods: {
    onPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    getData() {
      this.dataSource = [
        {
          id: 1, //主键id
          name: "营销", //名称
          message: "这是一个营销描述", //描述
          type: "catalogue", //类型 枚举值：目录，流程
          level: 1, // 树形结构等级
          public: 1, //是否公开
          children: [
            //子级
            {
              id: 11,
              name: "客户管理流程",
              public: 0,
              type: "info",
              message: "这是一个客户管理流程描述",
              level: 2
            },
            {
              id: 12,
              name: "产品",
              type: "catalogue",
              message: "产品",
              public: 1,
              level: 2,
              children: [
                {
                  id: 121,
                  type: "info",
                  name: "产品价格管理流程",
                  message: "产品价格管理流程",
                  public: 1,
                  level: 3
                }
              ]
            },
            {
              id: 13,
              name: "产品研发",
              type: "catalogue",
              message: "产品研发",
              public: 1,
              level: 2,
              children: [
                {
                  id: 131,
                  name: "产品研发成本",
                  type: "catalogue",
                  message: "产品研发成本",
                  public: 1,
                  level: 3,
                  children: [
                    {
                      id: 1311,
                      name: "产品研发成本控制流程",
                      type: "info",
                      message: "产品研发成本控制流程",
                      public: 0,
                      level: 4
                    },
                    {
                      id: 1312,
                      name: "产品研发成本汇报流程",
                      type: "info",
                      message: "产品研发成本汇报流程",
                      public: 1,
                      level: 4
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: "战略与经营",
          type: "catalogue",
          message: "这是一个战略与经营描述",
          public: 0,
          level: 1
        }
      ];
      // request(process.env.VUE_APP_API_BASE_URL + "/list", "get", {
      //   page: this.pagination.current,
      //   pageSize: this.pagination.pageSize
      // }).then(res => {
      //   const { list, page, pageSize, total } = res?.data?.data ?? {};
      //   this.dataSource = list;
      //   this.pagination.current = page;
      //   this.pagination.pageSize = pageSize;
      //   this.pagination.total = total;
      // });
    },
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key);
      this.selectedRows = this.selectedRows.filter(item => item.key !== key);
    },
    remove() {
      this.dataSource = this.dataSource.filter(
        item => this.selectedRows.findIndex(row => row.key === item.key) === -1
      );
      this.selectedRows = [];
    },
    onClear() {
      this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.$message.info("选中行改变了");
    },
    addNew() {
      this.dataSource.unshift({
        id: this.dataSource.length,
        no: "NO " + this.dataSource.length,
        description: "这是一段描述",
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 4,
        updatedAt: "2018-07-26"
      });
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
    //树形表格展开/闭合
    openRow() {
      let expandedRowKeys = [];
      function findChildren(obj) {
        let flag = false;
        if (
          Object.prototype.hasOwnProperty.call(obj, "children") &&
          obj.children.length > 0
        )
          flag = true;
        return flag;
      }
      function getKey(arr) {
        arr.forEach(item => {
          if (findChildren(item)) {
            expandedRowKeys.push(item.id);
            getKey(item.children);
          }
        });
      }
      if (!this.isOpen) {
        getKey(this.dataSource);
        this.expandedRowKeys = expandedRowKeys;
      } else {
        this.expandedRowKeys = [];
      }
      this.isOpen = !this.isOpen;
    },
    //表格分页事件
    tableChange(pagination) {
      this.pagination = pagination;
      console.log("表格分页事件", pagination);
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
