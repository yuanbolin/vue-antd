<template>
  <page-layout :desc="desc">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 10 }"
      >
        <a-form-model-item has-feedback label="管理组名称" prop="name">
          <a-input
            v-model="form.name"
            type="text"
            placeholder="请输入管理组名称"
            autocomplete="off"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback label="成员" prop="chengyuan">
          <a-select mode="multiple" v-model="form.chengyuan">
            <a-select-option value="caiwu">
              财务处
            </a-select-option>
            <a-select-option value="wuliu">
              物流部
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item has-feedback label="管理范围" prop="guanlifanwei">
          <select-tree
            :treeData="treeData"
            v-model="form.guanlifanwei"
          ></select-tree>
        </a-form-model-item>
        <a-form-model-item label="权限分配" prop="resource">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              查看
            </a-radio>
            <a-radio value="2">
              编辑
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-item
          style="margin-top: 24px"
          :wrapperCol="{ span: 10, offset: 7 }"
        >
          <a-button style="margin-right: 8px" @click="handleSubmit('form')" type="primary">提交</a-button>
          <a-button @click="resetForm('form')">重置</a-button>
        </a-form-item>
      </a-form-model>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import SelectTree from "@/components/tree/SelectTreeMultiple";
export default {
  name: "BasicForm",
  components: { PageLayout, SelectTree },
  data() {
    return {
      desc:"权限分配是在管理范围内分配权限",
      form: {},
      rules: {
        name: [
          { required: true, message: "请输入管理组名称!", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "字符长度要求在2-10字内",
            trigger: "blur"
          }
        ],
        chengyuan: [
          { required: true, message: "请至少选择一名成员!", trigger: "change" }
        ],
        guanlifanwei:[
          { required: true, message: "请至少选择一项管理范围!", trigger: "change" }
        ],
        resource:[
          { required: true, message: "请选择权限分配!", trigger: "change" }
        ],
      },
      treeData:[],
      type: "add"
    };
  },
  computed: {},
  mounted() {
    this.getTreeData()
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.type = "edit";
      this.form = {
        id: parseInt(Math.random() * 10000),
        name: "张三",
        chengyuan: ["caiwu"],
        guanlifanwei: []
      };
    }
  },
  methods: {
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
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
          if (this.type === "edit") {
            console.log("edit");
          } else {
            console.log("add");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped></style>
