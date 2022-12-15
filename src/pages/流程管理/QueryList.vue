<template>
  <a-card>
    <div class="search">
      <a-form-model ref="form" :model="form" :rules="rules">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-model-item
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 18, offset: 1 }"
              ref="name"
              label="目录名称"
              prop="name"
            >
              <a-input placeholder="请输入" v-model="form.name" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <span style="float: right; margin-top: 3px;">
          <a-button @click="search" type="primary">查询</a-button>
          <a-button @click="resetSearchForm" style="margin-left: 8px"
            >重置</a-button
          >
        </span>
      </a-form-model>
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
        :loading="loading"
        :data-source="dataSource"
        :expanded-row-keys.sync="expandedRowKeys"
      >
        <template slot="name" slot-scope="text, record">
          <a-tag
            v-if="record.type === CatalogueType.CATALOGUE"
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
            v-else-if="record.type === CatalogueType.INFO"
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
          <a-tag v-if="record.type === CatalogueType.CATALOGUE" color="#33cd8d">
            {{ text }} 级目录
          </a-tag>
          <a-tag v-else color="#33aecd">
            {{ parseInt(text) - 1 }} 级流程
          </a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-dropdown v-if="record.type === CatalogueType.CATALOGUE">
            <a style="margin-right: 8px"> <a-icon type="plus" />新增 </a>
            <a-menu slot="overlay">
              <a-menu-item
                @click="
                  () =>
                    showAddDrawer(
                      record,
                      CatalogueType.CATALOGUE + 'ChildrenAdd'
                    )
                "
              >
                <a href="javascript:;">新增子目录</a>
              </a-menu-item>
              <a-menu-item
                @click="
                  () =>
                    showAddDrawer(record, CatalogueType.INFO + 'ChildrenAdd')
                "
              >
                <a href="javascript:;">新增子流程</a>
              </a-menu-item>
              <a-menu-item
                @click="
                  () => showAddDrawer(record, CatalogueType.CATALOGUE) + 'Add'
                "
              >
                <a href="javascript:;">新增同级目录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <router-link
            v-if="record.type === CatalogueType.INFO"
            style="margin-right: 8px"
            :to="`antvx6/${record.key}`"
            ><a-icon type="highlight" />绘制
          </router-link>
          <a style="margin-right: 8px" @click="() => showEditDrawer(record)">
            <a-icon type="edit" />编辑
          </a>
          <a-popconfirm
            v-if="record.type === CatalogueType.INFO && record.public === 0"
            title="发布后将不可删除，确定要发布此流程吗?"
            @confirm="() => push(record.key)"
          >
            <a style="margin-right: 8px" @click="() => showEditDrawer(record)">
              <a-icon type="edit" />发布
            </a>
          </a-popconfirm>
          <a-popconfirm
            v-if="
              record.type === CatalogueType.CATALOGUE || record.public === 0
            "
            title="确定要删除吗?"
            @confirm="() => deleteRecord(record.key)"
          >
            <a style="margin-right: 8px"> <a-icon type="delete" />删除 </a>
          </a-popconfirm>
          <!--          <router-link :to="`/list/query/detail/${record.key}`"-->
          <!--            ><a-icon type="file-search" />详情</router-link-->
          <!--          >-->
        </template>
      </a-table>
    </div>
    <a-drawer
      :title="
        chooseType.indexOf(CatalogueType.INFO) !== -1 ? '流程信息' : '目录信息'
      "
      :width="500"
      :visible="drawerVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="resetForm"
    >
      <a-form-model
        v-if="chooseType.indexOf(CatalogueType.INFO) !== -1"
        ref="infoForm"
        :model="infoForm"
        :rules="infoRules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item has-feedback label="所属目录" prop="shangji">
          <select-tree
            :treeData="treeData"
            v-model="infoForm.shangji"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item has-feedback label="流程名称" prop="name">
          <a-input
            v-model="infoForm.name"
            type="text"
            placeholder="请输入名称"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="流程描述" prop="message">
          <a-textarea
            v-model="infoForm.message"
            type="text"
            placeholder="请输入描述"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="输入" prop="input">
          <a-input
            v-model="infoForm.input"
            type="text"
            placeholder="请输入流程输入"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="输出" prop="output">
          <a-input
            v-model="infoForm.output"
            type="text"
            placeholder="请输入流程输出"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="驱动类型" prop="qudongleixing">
          <a-select
            v-model="infoForm.qudongleixing"
            placeholder="请选择驱动类型"
          >
            <a-select-option value="incident">
              事件驱动
            </a-select-option>
            <a-select-option value="time">
              时间驱动
            </a-select-option>
            <a-select-option value="incidentAndTime">
              时间驱动/事件驱动
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback label="驱动规则" prop="guize">
          <a-textarea
            v-model="infoForm.guize"
            type="text"
            placeholder="请输入驱动规则"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="适用范围" prop="shiyongfanwei">
          <a-textarea
            v-model="infoForm.shiyongfanwei"
            type="text"
            placeholder="请输入适用范围"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        v-else-if="chooseType.indexOf(CatalogueType.CATALOGUE) !== -1"
        ref="catalogueForm"
        :model="catalogueForm"
        :rules="catalogueRules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item has-feedback label="上级目录" prop="shangji">
          <select-tree
            :treeData="treeData"
            v-model="catalogueForm.shangji"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item has-feedback label="目录名称" prop="name">
          <a-input
            v-model="catalogueForm.name"
            type="text"
            placeholder="请输入名称"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="目录描述" prop="message">
          <a-textarea
            v-model="catalogueForm.message"
            type="text"
            placeholder="请输入描述"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="resetForm">
          取消
        </a-button>
        <a-button type="primary" @click="submitForm">
          提交
        </a-button>
      </div>
    </a-drawer>
  </a-card>
</template>

<script>
import SelectTree from "@/components/tree/SelectTree";
// import { request } from "@/utils/request";
const getParentKey = (key, tree) => {
  let parentKey = "";
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.id === key)) {
        parentKey = node.id;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
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

/**
 * 目录类型枚举
 * @type {{CATALOGUE: string, INFO: string}}
 * CATALOGUE 普通目录
 * INFO 流程目录
 */
const CatalogueType = {
  CATALOGUE: "catalogue",
  INFO: "info"
};

export default {
  name: "FlowQueryList",
  data() {
    return {
      //搜索框
      form: {
        name: ""
      },
      rules: {
        name: []
      },
      columns: columns,
      dataSource: [], //表格数据
      selectedRows: [],
      isOpen: false,
      expandedRowKeys: [],
      chooseObj: {},
      pagination: {
        current: 1,
        pageSize: 10,
        total: 100,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showQuickJumper: true
      },
      catalogueForm: {},
      catalogueRules: {
        name: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "字符长度要求在2-10字内",
            trigger: "blur"
          }
        ],
        message: [
          {
            min: 2,
            max: 50,
            message: "字符长度要求在2-50字内",
            trigger: "blur"
          }
        ],
        shangji: []
      },
      infoForm: {},
      infoRules: {
        name: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "字符长度要求在2-10字内",
            trigger: "blur"
          }
        ],
        message: [
          { required: true, message: "请输入目录描述", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "字符长度要求在2-50字内",
            trigger: "blur"
          }
        ],
        shangji: [
          { required: true, message: "请选择所属目录", trigger: "change" }
        ],
        input: [{ required: true, message: "请输入流程输入", trigger: "blur" }],
        output: [
          { required: true, message: "请输入流程输出", trigger: "blur" }
        ],
        qudongleixing: [],
        guize: [],
        shiyongfanwei: []
      },
      treeData: [],
      chooseType: "",
      drawerVisible: false,
      CatalogueType,
      loading: false
    };
  },
  components: {
    SelectTree
  },
  authorize: {
    deleteRecord: "delete"
  },
  mounted() {
    this.fetch();
    this.getTreeData();
  },
  methods: {
    showAddDrawer(obj, type) {
      if (type.indexOf("Children") !== -1) {
        const parentKey = obj.id;
        if (type.indexOf(CatalogueType.CATALOGUE) !== -1) {
          this.catalogueForm.shangji = parentKey + "";
        } else if (type.indexOf(CatalogueType.INFO) !== -1) {
          this.infoForm.shangji = parentKey + "";
        }
      } else {
        const parentKey = getParentKey(obj.id, this.dataSource);
        console.log("'parentKey'===>");
        console.log(obj.id, this.dataSource);
        console.log(parentKey);
        console.log("==========");
        if (type.indexOf(CatalogueType.CATALOGUE) !== -1) {
          this.catalogueForm.shangji = parentKey + "";
        } else if (type.indexOf(CatalogueType.INFO) !== -1) {
          this.infoForm.shangji = parentKey + "";
        }
      }
      this.chooseType = type;
      this.$nextTick(() => {
        this.drawerVisible = true;
        console.log(this.chooseType);
      });
    },
    showEditDrawer(obj) {
      const parentKey = getParentKey(obj.id, this.dataSource);
      if (obj.type.indexOf(CatalogueType.CATALOGUE) !== -1) {
        this.chooseType = obj.type;
        this.catalogueForm = {
          shangji: parentKey + "",
          name: obj.name,
          message: obj.message
        };
      } else if (obj.type.indexOf(CatalogueType.INFO) !== -1) {
        this.chooseType = obj.type;
        this.infoForm = {
          shangji: parentKey + "",
          name: obj.name,
          message: obj.message
        };
      }
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    //发布流程
    push(id) {
      console.log(id);
    },
    submitForm() {
      if (this.chooseType.indexOf(CatalogueType.CATALOGUE) !== -1) {
        this.$refs.catalogueForm.validate(valid => {
          if (valid) {
            if (this.chooseType.indexOf("Add") !== -1) {
              alert("ADDsubmit!");
              console.log(this.catalogueForm);
            } else {
              if (this.chooseType.indexOf("Add") !== -1) {
                alert("EDITsubmit!");
                console.log(this.catalogueForm);
              }
            }
            this.onClose();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.chooseType.indexOf(CatalogueType.INFO) !== -1) {
        this.$refs.infoForm.validate(valid => {
          if (valid) {
            if (this.chooseType.indexOf("Add") !== -1) {
              alert("ADDsubmit!");
              console.log(this.infoForm);
            } else {
              if (this.chooseType.indexOf("Add") !== -1) {
                alert("EDITsubmit!");
                console.log(this.infoForm);
              }
            }
            this.onClose();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    resetForm() {
      if (this.chooseType.indexOf(CatalogueType.CATALOGUE) !== -1) {
        this.$refs.catalogueForm.resetFields();
        this.onClose();
      } else if (this.chooseType.indexOf(CatalogueType.INFO) !== -1) {
        this.$refs.infoForm.resetFields();
        this.onClose();
      }
    },
    search() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form.name);
          this.fetch();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetSearchForm() {
      this.$refs.form.resetFields();
      console.log(this.form.name);
      this.fetch();
    },
    onClose() {
      this.drawerVisible = false;
    },
    onPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    getTreeData() {
      this.treeData = [
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
                  level: 3,
                  scopedSlots: {
                    title: "title"
                  }
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
          public: 1,
          level: 1
        }
      ];
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
        name: "NO " + this.dataSource.length, //名称
        message: "这是一断描述", //描述
        type: "catalogue", //类型 枚举值：目录，流程
        level: 1, // 树形结构等级
        public: 1 //是否公开
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
      console.log("表格分页事件", pagination);
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch();
    },
    fetch() {
      this.loading = true;
      setTimeout(() => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 100;
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
            public: 1,
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
        this.loading = false;
        this.pagination = pagination;
      }, 1000);
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
