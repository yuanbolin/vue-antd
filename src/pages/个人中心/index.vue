<template>
  <page-layout title="个人中心">
    <a-card :bordered="false">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="修改密码">
          <a-form-model
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            v-bind="layout"
          >
            <a-form-model-item has-feedback label="旧密码" prop="oldpass">
              <a-input v-model.number="ruleForm.oldpass" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新密码" prop="pass">
              <a-input
                v-model="ruleForm.pass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>
            <a-form-model-item has-feedback label="确认密码" prop="checkPass">
              <a-input
                v-model="ruleForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
              <a-button type="primary" @click="submitForm('ruleForm')">
                确认修改
              </a-button>
              <a-button
                style="margin-left: 10px"
                @click="resetForm('ruleForm')"
              >
                重置表单
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="个人信息">
          此功能仍在开发中...
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
export default {
  name: "PersonalCenter",
  components: { PageLayout },
  data() {
    let checkPldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入旧密码"));
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      }else if (value.length<5 || value.length>20) {
        callback(new Error("密码长度要求在5到20之内"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码！"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        oldpass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "change" }],
        checkPass: [{ validator: validatePass2, trigger: "change" }],
        oldpass: [{ validator: checkPldPass, trigger: "change" }]
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
          console.log("submit!",this.ruleForm);
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
