<template>
  <div class="container">
    <el-form ref="ruleForm" :model="formInline" :rules="rules">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="formInline.oldPassword" type="password" placeholder="原密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formInline.newPassword" type="password" placeholder="新密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="formInline.checkPass" type="password" placeholder="确认密码" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit('ruleForm')"
        >修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      formInline: {
        oldPassword: '',
        newPassword: '',
        checkPass: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: this.validatePass2, trigger: 'blur' }
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
    },
    validatePass(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formInline.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    },
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formInline.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
  }
}
</script>

<style>
.container .tr_style {
  background: #eee;
}
</style>
