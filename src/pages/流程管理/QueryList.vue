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
              :label="$t('form.name')"
              prop="name"
            >
              <a-input :placeholder="$t('form.nameph')" v-model="form.name" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <span style="float: right; margin-top: 3px;">
          <!--          v-auth使用示例,如无权限则禁用按钮-->
          <a-button
            v-auth="`query`"
            @click="search"
            :loading="loading"
            type="primary"
            >{{ $t("form.search") }}</a-button
          >
          <a-button
            @click="resetSearchForm"
            :loading="loading"
            style="margin-left: 8px"
            >{{ $t("form.reset") }}</a-button
          >
        </span>
      </a-form-model>
    </div>
    <div>
      <a-space class="operator">
        <a-button :loading="loading" @click="addNew" type="primary">{{
          $t("form.add")
        }}</a-button>
        <a-button :loading="loading" @click="openRow"
          ><a-icon :type="isOpen ? 'down' : 'up'"></a-icon
          >{{ isOpen ? $t("form.rowClose") : $t("form.rowOpen") }}</a-button
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
        <!--        目录名称  当流程已发布时,目录名称颜色变亮-->
        <template slot="name" slot-scope="text, record">
          <a-tag
            v-if="record.type === CatalogueType.DIRECTORY"
            :style="{
              background: '#fff',
              borderStyle: 'dashed',
              borderColor: '#f35a19'
            }"
          >
            <a-icon :style="{ color: '#f35a19' }" type="folder-open" />
            {{ text }}
          </a-tag>
          <a-tag
            v-else-if="record.type === CatalogueType.PROCESS"
            :style="
              record.published
                ? {
                    background: '#fff',
                    borderStyle: 'dashed',
                    borderColor: '#33aecd'
                  }
                : { background: '#fff', borderStyle: 'dashed' }
            "
          >
            <a-icon
              :style="
                record.published ? { color: '#33aecd' } : { color: '#aaa' }
              "
              type="file"
            />
            {{ text }}
          </a-tag>
        </template>
        <!--        目录级别样式-->
        <template slot="level" slot-scope="text, record">
          <a-tag v-if="record.type === CatalogueType.DIRECTORY" color="#f35a19">
            {{ text }} {{ $t("table_row.level1") }}
          </a-tag>
          <a-tag v-else color="#33aecd">
            {{ parseInt(text) - 1 }} {{ $t("table_row.level2") }}
          </a-tag>
        </template>
        <!--        操作-->
        <template slot="action" slot-scope="text, record">
          <a-dropdown v-if="record.type === CatalogueType.DIRECTORY">
            <a style="margin-right: 8px">
              <a-icon style="margin-right: 5px" type="plus" />{{
                $t("table_row.add")
              }}
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-if="record.level < 3"
                @click="
                  () =>
                    showAddDrawer(
                      record,
                      CatalogueType.DIRECTORY + 'ChildrenAdd'
                    )
                "
              >
                <a href="javascript:;">{{ $t("table_row.add1") }}</a>
              </a-menu-item>
              <a-menu-item
                @click="
                  () =>
                    showAddDrawer(record, CatalogueType.PROCESS + 'ChildrenAdd')
                "
              >
                <a href="javascript:;">{{ $t("table_row.add2") }}</a>
              </a-menu-item>
              <a-menu-item
                @click="
                  () => showAddDrawer(record, CatalogueType.DIRECTORY + 'Add')
                "
              >
                <a href="javascript:;">{{ $t("table_row.add3") }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <router-link
            v-if="record.type === CatalogueType.PROCESS"
            style="margin-right: 8px"
            :to="`/antvx6/${record.id}`"
            ><a-icon style="margin-right: 5px" type="highlight" />{{
              $t("table_row.draw")
            }}
          </router-link>
          <a style="margin-right: 8px" @click="() => showEditDrawer(record)">
            <a-icon style="margin-right: 5px" type="edit" />{{
              $t("table_row.edit")
            }}
          </a>
          <a-popconfirm
            v-if="record.type === CatalogueType.PROCESS && !record.published"
            :title="$t('table_action.publish')"
            @confirm="() => push(record)"
          >
            <a style="margin-right: 8px">
              <a-icon style="margin-right: 5px" type="cloud-upload" />{{
                $t("table_row.publish")
              }}
            </a>
          </a-popconfirm>
          <a
            v-if="record.type === CatalogueType.PROCESS"
            @click="() => detailRecord(record)"
            style="margin-right: 8px"
          >
            <a-icon style="margin-right: 5px" type="file-text" />{{
              $t("table_row.detail")
            }}
          </a>
          <a-popconfirm
            v-if="record.type === CatalogueType.DIRECTORY || !record.published"
            :title="$t('table_action.delete')"
            @confirm="() => deleteRecord(record.id)"
          >
            <a style="margin-right: 8px">
              <a-icon style="margin-right: 5px" type="delete" />{{
                $t("table_row.delete")
              }}
            </a>
          </a-popconfirm>
          <!--          <router-link :to="`/list/query/detail/${record.key}`"-->
          <!--            ><a-icon type="file-search" />详情</router-link-->
          <!--          >-->
        </template>
      </a-table>
    </div>
    <!--    新增/编辑表单-->
    <a-drawer
      :title="
        chooseType.indexOf(CatalogueType.PROCESS) !== -1
          ? $t('drawer_form.title1')
          : $t('drawer_form.title2')
      "
      :width="500"
      :visible="drawerVisible"
      :body-style="{ paddingBottom: '80px' }"
      @close="resetForm"
    >
      <a-form-model
        v-if="chooseType.indexOf(CatalogueType.PROCESS) !== -1"
        ref="infoForm"
        :model="infoForm"
        :rules="infoRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.directory')"
          prop="directory"
        >
          <select-tree
            :treeData="treeData"
            v-model="infoForm.directory"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.name')"
          prop="name"
        >
          <a-input
            v-model="infoForm.name"
            type="text"
            :placeholder="$t('drawer_form.nameph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.message')"
          prop="description"
        >
          <a-textarea
            v-model="infoForm.description"
            type="text"
            :placeholder="$t('drawer_form.messageph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.input')"
          prop="input"
        >
          <a-input
            v-model="infoForm.input"
            type="text"
            :placeholder="$t('drawer_form.inputph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.output')"
          prop="output"
        >
          <a-input
            v-model="infoForm.output"
            type="text"
            :placeholder="$t('drawer_form.outputph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.driveType')"
          prop="driveType"
        >
          <a-select
            v-model="infoForm.driveType"
            :placeholder="$t('drawer_form.driveTypeph')"
          >
            <a-select-option value="EVENT">
              {{ $t("drawer_form.drive1") }}
            </a-select-option>
            <a-select-option value="TIME">
              {{ $t("drawer_form.drive2") }}
            </a-select-option>
            <a-select-option value="EVENT_OR_TIME">
              {{ $t("drawer_form.drive3") }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.driveRule')"
          prop="driveRule"
        >
          <a-textarea
            v-model="infoForm.driveRule"
            type="text"
            :placeholder="$t('drawer_form.driveRuleph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.scope')"
          prop="scope"
        >
          <a-textarea
            v-model="infoForm.scope"
            type="text"
            :placeholder="$t('drawer_form.scopeph')"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model>
      <a-form-model
        v-else-if="chooseType.indexOf(CatalogueType.DIRECTORY) !== -1"
        ref="catalogueForm"
        :model="catalogueForm"
        :rules="catalogueRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.directory')"
          prop="directory"
        >
          <select-tree
            :disabled="catalogueForm.disabled"
            :treeData="treeData"
            v-model="catalogueForm.directory"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.dirname')"
          prop="name"
        >
          <a-input
            v-model="catalogueForm.name"
            type="text"
            :placeholder="$t('drawer_form.nameph')"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item
          has-feedback
          :label="$t('drawer_form.message')"
          prop="description"
        >
          <a-textarea
            v-model="catalogueForm.description"
            type="text"
            :placeholder="$t('drawer_form.messageph')"
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
          {{ $t("drawer_form.cancel") }}
        </a-button>
        <a-button type="primary" @click="submitForm">
          {{ $t("drawer_form.submit") }}
        </a-button>
      </div>
    </a-drawer>
    <a-modal v-model="visible" @ok="handleOk">
      <a-descriptions :title="$t('modal.title')" bordered>
        <a-descriptions-item :label="$t('modal.input')" :span="3">
          {{ detailProcess.input }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('modal.output')" :span="3">
          {{ detailProcess.output }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('modal.driveType_computed')" :span="3">
          {{ driveType_computed }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('modal.driveRule')" :span="3">
          {{ detailProcess.driveRule }}
        </a-descriptions-item>
        <a-descriptions-item :label="$t('modal.scope')" :span="3">
          {{ detailProcess.scope }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </a-card>
</template>

<script>
import { process } from "@/services";
import SelectTree from "@/components/tree/SelectTree";
const getParentKey = (key, tree) => {
  let parentKey = "0";
  function eachTree(arr) {
    for (let i = 0; i < arr.length; i++) {
      const node = arr[i];
      if (node?.children) {
        if (node.children.some(item => item.id === key)) {
          parentKey = node.id;
        } else {
          eachTree(node.children);
        }
      }
    }
  }
  eachTree(tree);
  return parentKey;
};

/**
 * 目录类型枚举
 * @type {{CATALOGUE: string, INFO: string}}
 * CATALOGUE 普通目录
 * INFO 流程目录
 */
const CatalogueType = {
  DIRECTORY: "DIRECTORY",
  PROCESS: "PROCESS"
};

const defaultPage = {
  current: 1,
  pageSize: 5,
  total: 0,
  pageSizeOptions: ["10", "20", "30", "40", "50"],
  showQuickJumper: true
};

export default {
  name: "FlowQueryList",
  i18n: require("./i18n"),
  data() {
    return {
      //搜索框
      form: {
        name: ""
      },
      rules: {
        name: []
      },
      dataSource: [], //表格数据
      selectedRows: [],
      isOpen: false,
      expandedRowKeys: [],
      chooseObj: {},
      pagination: defaultPage,
      catalogueForm: {},
      infoForm: {},
      treeData: [],
      chooseType: "",
      detailProcess: {},
      drawerVisible: false,
      visible: false,
      CatalogueType,
      loading: false
    };
  },
  components: {
    SelectTree
  },
  /**
   * 根据路由中permission对功能权限进行校验,权限值匹配允许调用
   * key:要验证的方法名
   * value:验证的权限值
   */
  authorize: {
    deleteRecord: "delete",
    showAddDrawer: "insert",
    showEditDrawer: "update",
    push: "update",
    detailRecord: "query"
  },
  computed: {
    columns() {
      return [
        {
          title: this.$t("table_cloumns.name"),
          dataIndex: "name",
          key: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: this.$t("table_cloumns.level"),
          dataIndex: "level",
          key: "level",
          width: "12%",
          scopedSlots: { customRender: "level" }
        },
        {
          title: this.$t("table_cloumns.message"),
          dataIndex: "description",
          width: "30%",
          ellipsis: true,
          key: "description"
        },
        {
          title: this.$t("table_cloumns.action"),
          scopedSlots: { customRender: "action" }
        }
      ];
    },
    catalogueRules() {
      return {
        name: [
          {
            required: true,
            message: this.$t("form_rules.name"),
            whitespace: true,
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: this.$t("form_rules.namelen"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("form_rules.messages"),
            whitespace: true,
            trigger: "blur"
          },
          {
            min: 2,
            max: 50,
            message: this.$t("form_rules.messageslen"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        directory: [
          {
            required: true,
            message: this.$t("form_rules.directory"),
            trigger: "change"
          }
        ]
      };
    },
    infoRules() {
      return {
        name: [
          {
            required: true,
            message: this.$t("form_rules.name"),
            whitespace: true,
            trigger: "blur"
          },
          {
            min: 2,
            max: 15,
            message: this.$t("form_rules.namelen"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: this.$t("form_rules.messages"),
            whitespace: true,
            trigger: "blur"
          },
          {
            min: 2,
            max: 50,
            message: this.$t("form_rules.messageslen"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        directory: [
          {
            required: true,
            message: this.$t("form_rules.directory"),
            trigger: "change"
          }
        ],
        input: [
          {
            required: true,
            message: this.$t("form_rules.input"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        output: [
          {
            required: true,
            message: this.$t("form_rules.output"),
            whitespace: true,
            trigger: "blur"
          }
        ],
        driveType: [],
        driveRule: [],
        scope: []
      };
    },
    driveType_computed() {
      let str = "";
      switch (this.detailProcess.driveType) {
        case "EVENT":
          str = "事件驱动";
          break;
        case "TIME":
          str = "时间驱动";
          break;
        case "EVENT_OR_TIME":
          str = "时间驱动/事件驱动";
          break;
      }
      return str;
    }
  },
  mounted() {
    this.fetch();
    this.getTreeData();
  },
  methods: {
    showAddDrawer(obj, type) {
      //如果没有传parentkey,则主动从数据中获取parentkey
      if (type.indexOf("Children") !== -1) {
        const parentKey = obj.id;
        if (type.indexOf(CatalogueType.DIRECTORY) !== -1) {
          this.catalogueForm.directory = parentKey + "";
        } else if (type.indexOf(CatalogueType.PROCESS) !== -1) {
          this.infoForm.directory = parentKey + "";
        }
      } else {
        const parentKey = getParentKey(obj.id, this.dataSource);
        if (type.indexOf(CatalogueType.DIRECTORY) !== -1) {
          this.catalogueForm.directory = parentKey + "";
        } else if (type.indexOf(CatalogueType.PROCESS) !== -1) {
          this.infoForm.directory = parentKey + "";
        }
      }
      if (
        type.indexOf(CatalogueType.DIRECTORY) !== -1 &&
        this.treeData[0].id !== "0"
      ) {
        this.treeData.unshift({
          id: "0",
          name: "根目录"
        });
      } else if (
        type.indexOf(CatalogueType.PROCESS) !== -1 &&
        this.treeData[0].id === "0"
      ) {
        this.treeData.shift();
      }
      this.chooseType = type;
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    showEditDrawer(obj) {
      const parentKey = getParentKey(obj.id, this.dataSource);
      if (obj.type.indexOf(CatalogueType.DIRECTORY) !== -1) {
        if (this.treeData[0].id !== "0") {
          this.treeData.unshift({
            id: "0",
            name: "根目录"
          });
        }
        this.chooseType = obj.type;
        this.catalogueForm = {
          ...obj,
          disabled: obj?.children && obj.children.length > 0,
          directory: parentKey + "",
          name: obj.name,
          description: obj.description
        };
      } else if (obj.type.indexOf(CatalogueType.PROCESS) !== -1) {
        if (this.treeData[0].id === "0") {
          this.treeData.shift();
        }
        this.chooseType = obj.type;
        this.infoForm = {
          ...obj,
          directory: parentKey + "",
          name: obj.name,
          description: obj.description
        };
      }
      this.$nextTick(() => {
        this.drawerVisible = true;
      });
    },
    //发布流程
    push(obj) {
      if (obj?.id && obj.type.indexOf(CatalogueType.PROCESS) !== -1) {
        if (obj.content) {
          this.loading = true;
          process
            .publish({ id: obj.id })
            .then(({ data }) => {
              if (data.code === "1000") {
                this.$message.success(this.$t("pushHandle.success"));
                this.fetch();
              } else {
                this.$message.error(data.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          this.$message.warn(this.$t("pushHandle.error"));
        }
      }
    },
    submitForm() {
      if (this.chooseType.indexOf(CatalogueType.DIRECTORY) !== -1) {
        this.$refs.catalogueForm.validate(valid => {
          if (valid) {
            if (this.chooseType.indexOf("Add") !== -1) {
              this.loading = true;
              process
                .addTree({
                  ...this.catalogueForm,
                  directory:
                    this.catalogueForm.directory === "0"
                      ? null
                      : this.catalogueForm.directory,
                  type: CatalogueType.DIRECTORY
                })
                .then(({ data }) => {
                  if (data.code === "1000") {
                    this.$message.success(this.$t("submitForm.addSuccess"));
                    this.fetch();
                    this.getTreeData();
                    this.$refs.catalogueForm.resetFields();
                    this.catalogueForm = {};
                  } else {
                    this.$message.error(data.msg);
                  }
                })
                .finally(() => {
                  this.loading = false;
                });
            } else {
              this.loading = true;
              process
                .editTree({
                  ...this.catalogueForm,
                  directory:
                    this.catalogueForm.directory === "0"
                      ? null
                      : this.catalogueForm.directory,
                  type: CatalogueType.DIRECTORY
                })
                .then(({ data }) => {
                  if (data.code === "1000") {
                    this.$message.success(this.$t("submitForm.editSuccess"));
                    this.fetch();
                    this.getTreeData();
                    this.$refs.catalogueForm.resetFields();
                    this.catalogueForm = {};
                  } else {
                    this.$message.error(data.msg);
                  }
                })
                .finally(() => {
                  this.loading = false;
                });
            }
            this.onClose();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else if (this.chooseType.indexOf(CatalogueType.PROCESS) !== -1) {
        this.$refs.infoForm.validate(valid => {
          if (valid) {
            if (this.chooseType.indexOf("Add") !== -1) {
              this.loading = true;
              process
                .addTree({
                  ...this.infoForm,
                  type: CatalogueType.PROCESS
                })
                .then(({ data }) => {
                  if (data.code === "1000") {
                    this.$message.success(this.$t("submitForm.addSuccess"));
                    this.fetch();
                    this.getTreeData();
                    this.$refs.infoForm.resetFields();
                    this.infoForm = {};
                  } else {
                    this.$message.error(data.msg);
                  }
                })
                .finally(() => {
                  this.loading = false;
                });
            } else {
              this.loading = true;
              process
                .editTree({
                  ...this.infoForm,
                  type: CatalogueType.PROCESS
                })
                .then(({ data }) => {
                  if (data.code === "1000") {
                    this.$message.success(this.$t("submitForm.editSuccess"));
                    this.fetch();
                    this.getTreeData();
                    this.$refs.infoForm.resetFields();
                    this.infoForm = {};
                  } else {
                    this.$message.error(data.msg);
                  }
                })
                .finally(() => {
                  this.loading = false;
                });
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
      if (this.chooseType.indexOf(CatalogueType.DIRECTORY) !== -1) {
        this.$refs.catalogueForm.resetFields();
        this.catalogueForm = {};
        this.onClose();
      } else if (this.chooseType.indexOf(CatalogueType.PROCESS) !== -1) {
        this.$refs.infoForm.resetFields();
        this.infoForm = {};
        this.onClose();
      }
    },
    search() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pagination = defaultPage;
          this.fetch();
        } else {
          return false;
        }
      });
    },
    resetSearchForm() {
      this.$refs.form.resetFields();
      this.form = {};
      this.fetch();
    },
    onClose() {
      this.drawerVisible = false;
    },
    getTreeData() {
      process.getAll({ dirOnly: 1 }).then(({ data }) => {
        if (data.code === "1000") {
          if (data.data) {
            const dataSource = this.childrenHandle(data.data);
            this.treeData = dataSource;
          } else {
            this.treeData = [];
          }
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    detailRecord(obj) {
      this.detailProcess = obj;
      this.visible = true;
    },
    //
    handleOk() {
      this.detailProcess = {};
      this.visible = false;
    },
    deleteRecord(key) {
      if (key) {
        this.loading = true;
        process
          .deleteTree({ id: key })
          .then(({ data }) => {
            this.loading = false;
            if (data.code === "1000") {
              this.$message.success(this.$t("deleteRecord.success"));
              this.fetch();
              this.getTreeData();
            } else {
              this.$message.error(data.msg);
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    remove() {
      this.dataSource = this.dataSource.filter(
        item => this.selectedRows.findIndex(row => row.key === item.key) === -1
      );
      this.selectedRows = [];
    },
    addNew() {
      this.showAddDrawer({ id: null }, CatalogueType.DIRECTORY + "Add");
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
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch();
    },
    //将树形结构中children字段长度为0的数据的children字段删除
    childrenHandle(trees) {
      return trees.map(item => {
        if (item?.children && item.children.length === 0) {
          delete item.children;
        } else if (item?.children && item.children.length > 0) {
          this.childrenHandle(item.children);
        }
        return item;
      });
    },
    fetch() {
      this.loading = true;
      const pagination = { ...this.pagination };
      process
        .getTrees({
          page: pagination.current,
          pageSize: pagination.pageSize,
          directoryName: this.form.name
        })
        .then(({ data }) => {
          this.loading = false;
          if (data.code === "1000") {
            if (data?.data) {
              const dataSource = this.childrenHandle(data.data);
              pagination.total = data.extension;
              this.pagination = pagination;
              this.dataSource = dataSource;
              if (this.isOpen) this.openRow();
            } else {
              this.dataSource = [];
            }
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch(() => {
          this.loading = false;
        });
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
