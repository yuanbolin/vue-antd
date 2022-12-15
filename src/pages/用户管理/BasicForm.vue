<template>
  <page-layout>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item
          label="用户账号"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  { required: true, message: '请输入用户账号!' },
                  { min: 2, max: 10, message: '长度要求在2-10个之间' }
                ]
              }
            ]"
            placeholder="请输入用户账号，将用于登录账号"
          />
        </a-form-item>
        <a-form-item
          label="用户姓名"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入用户姓名!' },
                  { min: 2, max: 10, message: '长度要求在2-10个之间' }
                ]
              }
            ]"
            placeholder="请输入用户的姓名"
          />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  { required: true, message: '请输入联系方式!' },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: '格式要求为11位手机号'
                  }
                ]
              }
            ]"
            placeholder="请输入用户的11位电话"
          />
        </a-form-item>
        <a-form-item
          label="所属机构"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-select
            v-decorator="[
              'department',
              { rules: [{ required: true, message: '请选择用户所属机构!' }] }
            ]"
            placeholder="请选择用户所属机构"
          >
            <a-select-option value="caiwu">
              财务处
            </a-select-option>
            <a-select-option value="wuliu">
              物流部
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="工作岗位"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            v-decorator="[
              'job',
              {
                rules: [
                  { required: true, message: '请输入用户的工作岗位!' },
                  { min: 2, max: 10, message: '长度要求在2-10个之间' }
                ]
              }
            ]"
            placeholder="请输入用户的工作岗位"
          />
        </a-form-item>
        <a-form-item
          label="邮箱"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '请输入正确的邮箱'
                  }
                ]
              }
            ]"
            rows="4"
            placeholder="请输入用户的邮箱"
          />
        </a-form-item>
        <a-form-item
          label="所在地址"
          :labelCol="{ span: 7 }"
          :wrapperCol="{ span: 10 }"
        >
          <a-textarea
            v-decorator="[
              'address',
              { rules: [{ min: 2, max: 10, message: '长度要求在2-50个之间' }] }
            ]"
            rows="4"
            placeholder="请输入用户的详细所在地"
          />
        </a-form-item>
        <a-form-item
          style="margin-top: 24px"
          :wrapperCol="{ span: 10, offset: 7 }"
        >
          <a-button @click="handleSubmit" type="primary">提交</a-button>
          <a-button @click="resetForm">重置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
export default {
  name: "BasicForm",
  components: { PageLayout },
  data() {
    return {
      form: this.$form.createForm(this),
      type: "add"
    };
  },
  computed: {},
  mounted() {
    console.log(this.$route.params);
    if (this.$route.params.id) {
      this.type = "edit";
      this.form.setFieldsValue({
        id: parseInt(Math.random() * 10000),
        username: "urara" + parseInt(Math.random() * 10000),
        name: "张三",
        phone: 13296314652,
        address: "山东省威海市",
        department: "caiwu",
        job: "会计",
        email: "48612312@qq.com",
        status: 0
      });
    }
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.type === "edit") {
            console.log("edit");
          } else {
            console.log("add");
          }
          console.log("Received values of form: ", values);
        }
      });
    },
    resetForm() {
      this.form.resetFields();
    }
  }
};
</script>

<style scoped></style>
