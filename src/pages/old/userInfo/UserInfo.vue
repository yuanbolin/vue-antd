<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="用户姓名" prop="name">
      <a-input v-model="ruleForm.name" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="联系电话" prop="phone">
      <a-input v-model.number="ruleForm.phone" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="所在地址" prop="address">
      <a-input v-model="ruleForm.address" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        确认修改
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置表单
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        email: "",
        address: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户姓名!" },
          { min: 2, max: 10, message: "长度要求在2-10个之间" }
        ],
        phone: [
          { required: true, message: "请输入联系方式!" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "格式要求为11位手机号"
          }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱"
          }
        ],
        address: [
          { rules: [{ min: 2, max: 10, message: "长度要求在2-50个之间" }] }
        ]
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!", this.ruleForm);
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
