<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 200px">
      <el-tab-pane label="修改密码">
        <el-form ref="ruleForm" :model="formInline" :rules="rules">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="formInline.oldPassword"
              placeholder="原密码"
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="formInline.newPassword"
              placeholder="新密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">修改密码</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'UserManager',
  data() {
    return {
      formInline: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.container .tr_style {
  background: #eee;
}
</style>
