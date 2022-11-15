<template>
  <div class="container demo-block">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="true" border>启用</el-radio>
          <el-radio label="false" border>停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="ruleForm.phone" type="textarea" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="ruleForm.address" type="textarea" />
      </el-form-item>
      <el-form-item label="系统角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="系统角色">
          <el-option label="会计" value="shanghai" />
          <el-option label="销售员" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'UserAdd',
  data() {
    return {
      ruleForm: {
        name: '',
        status: 'true',
        phone: '',
        address: '',
        role: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请填写联系方式', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写所在地址', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择授权的系统角色', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.container {
  padding: 20px;
}
</style>
