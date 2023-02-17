<template>
  <a-card>
    <div class="search">
      <a-form layout="horizontal">
        <a-row>
          <a-col :md="8" :sm="24">
            <a-form-item
              label="机构名称"
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
        <template slot="name" slot-scope="text">
          <a-tag
            :style="{
              background: '#fff',
              borderStyle: 'dashed',
              borderColor: '#e85311'
            }"
          >
            <a-icon :style="{ color: '#e85311' }" type="profile" />
            {{ text }}
          </a-tag>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-dropdown>
            <a style="margin-right: 8px">
              <a-icon style="margin-right: 5px" type="plus" />新增
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="() => showAddDrawer(record, 'ChildrenAdd')">
                <a href="javascript:;">新增子机构</a>
              </a-menu-item>
              <a-menu-item @click="() => showAddDrawer(record, 'add')">
                <a href="javascript:;">新增同级机构</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-divider type="vertical" />
          <a style="margin-right: 8px" @click="() => showEditDrawer(record)">
            <a-icon style="margin-right: 5px" type="edit" />编辑
          </a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="Sure to delete?"
            @confirm="() => deleteRecord(record.id)"
          >
            <a
              :disabled="record.children && record.children.length > 0"
              style="margin-right: 8px"
            >
              <a-icon style="margin-right: 5px" type="delete" />删除
            </a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-drawer
      title="目录信息"
      :width="500"
      :visible="drawerVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="resetForm"
    >
      <a-form-model
        ref="catalogueForm"
        :model="catalogueForm"
        :rules="catalogueRules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 17 }"
      >
        <a-form-model-item
          has-feedback
          label="上级机构"
          prop="parentOrganization"
        >
          <select-tree
            :treeData="treeData"
            v-model="catalogueForm.parentOrganization"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item has-feedback label="机构名称" prop="orgName">
          <a-input
            v-model="catalogueForm.orgName"
            type="text"
            placeholder="请输入名称"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="机构描述" prop="orgDescription">
          <a-textarea
            v-model="catalogueForm.orgDescription"
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
import { organization } from "@/services";
const columns = [
  {
    title: "机构名称",
    dataIndex: "orgName",
    key: "orgName",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "机构描述",
    dataIndex: "orgDescription",
    width: "30%",
    ellipsis: true,
    key: "orgDescription"
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  }
];

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

export default {
  name: "organizationQueryList",
  data() {
    return {
      columns: columns,
      dataSource: [],
      isOpen: false,
      expandedRowKeys: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 2
      },
      drawerVisible: false,
      treeData: [],
      catalogueForm: {},
      catalogueRules: {
        orgName: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "字符长度要求在2-15字内",
            trigger: "blur"
          }
        ],
        orgDescription: [
          {
            min: 2,
            max: 50,
            message: "字符长度要求在2-50字内",
            trigger: "blur"
          }
        ],
        parentOrganization: []
      }
    };
  },
  components: {
    SelectTree
  },
  mounted() {
    this.getData();
    this.getTreeData();
  },
  methods: {
    onPageChange(page, pageSize) {
      this.pagination.current = page;
      this.pagination.pageSize = pageSize;
      this.getData();
    },
    getTreeData() {
      this.treeData = [
        {
          id: 1, //主键id
          orgName: "浙江宏利汽配集团有限公司", //名称
          orgDescription: "这是一个浙江宏利汽配集团有限公司的描述", //描述
          children: [
            //子级
            {
              id: 11,
              orgName: "浙江宏利汽车零部件股份有限公司",
              orgDescription: "这是一个浙江宏利汽车零部件股份有限公司的描述"
            },
            {
              id: 12,
              orgName: "浙江康普瑞汽车零部件有限公司",
              orgDescription: "这是一个浙江康普瑞汽车零部件有限公司的描述",
              children: [
                {
                  id: 121,
                  type: "info",
                  orgName: "人力资源中心",
                  orgDescription: "这是一个人力资源中心的描述"
                }
              ]
            },
            {
              id: 13,
              orgName: "浙江华钜汽车零部件股份有限公司",
              orgDescription: "这是一个浙江华钜汽车零部件股份有限公司的描述",
              children: [
                {
                  id: 131,
                  orgName: "信息中心",
                  orgDescription: "这是一个信息中心的描述",
                  children: [
                    {
                      id: 1311,
                      orgName: "软件研发部",
                      orgDescription: "这是一个软件研发部的描述"
                    },
                    {
                      id: 1312,
                      orgName: "信息运营部",
                      orgDescription: "这是一个信息运营部的描述"
                    }
                  ]
                }
              ]
            },
            {
              id: 14,
              orgName: "财务中心",
              orgDescription: "这是一个财务中心的描述"
            }
          ]
        },
        {
          id: 2,
          orgName: "嘉兴科进机械制造有限公司",
          orgDescription: "这是一个嘉兴科进机械制造有限公司的描述"
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
    getData() {
      organization
        .getTrees({
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        .then(res => {
          console.log("tree", res.data.data);
          const list = res.data.data;
          this.dataSource = list;
          this.pagination.total = 100;
        });
    },
    showAddDrawer(obj, type) {
      if (type.indexOf("Children") !== -1) {
        const parentKey = obj.id;
        this.catalogueForm.parentOrganization = parentKey + "";
      } else {
        const parentKey = getParentKey(obj.id, this.dataSource);
        // console.log("'parentKey'===>");
        // console.log(obj.id, this.dataSource);
        // console.log(parentKey);
        // console.log("==========");
        this.catalogueForm.parentOrganization = parentKey + "";
      }
      this.chooseType = "Add";
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    showEditDrawer(obj) {
      const parentKey = getParentKey(obj.id, this.dataSource);
      this.catalogueForm = {
        parentOrganization: parentKey + "",
        orgName: obj.orgName,
        orgDescription: obj.orgDescription,
        orgId: obj.id
      };
      this.chooseType = "Edit";
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    deleteRecord(orgId) {
      if (!orgId) return;
      organization.deleteTree({ orgId }).then(res => {
        if (res.data.code === "1000") {
          this.$message.success(res.data.msg, 3);
          this.getData();
        }
      });
    },
    addNew() {
      this.chooseType = "Add";
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    submitForm() {
      this.$refs.catalogueForm.validate(valid => {
        if (valid) {
          if (this.chooseType.indexOf("Add") !== -1) {
            organization
              .addTree(JSON.parse(JSON.stringify(this.catalogueForm)))
              .then(res => {
                if (res.data.code === "1000") {
                  //新增成功后清空表单数据关闭抽屉,随后重新请求列表接口刷新列表数据
                  this.$refs.catalogueForm.resetFields();
                  this.onClose();
                  this.$message.success(res.data.msg, 3);
                  this.$nextTick(() => {
                    this.getData();
                  });
                }
              });
          } else {
            if (this.chooseType.indexOf("Edit") !== -1) {
              organization
                .editTree(JSON.parse(JSON.stringify(this.catalogueForm)))
                .then(res => {
                  if (res.data.code === "1000") {
                    //修改成功后清空表单数据关闭抽屉,随后重新请求列表接口刷新列表数据
                    this.$refs.catalogueForm.resetFields();
                    this.onClose();
                    this.$message.success(res.data.msg, 3);
                    this.$nextTick(() => {
                      this.getData();
                    });
                  }
                });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.catalogueForm.resetFields();
      this.onClose();
    },
    onClose() {
      this.drawerVisible = false;
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
