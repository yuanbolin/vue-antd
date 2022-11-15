<template>
  <div class="container demo-block">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="目录名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="目录是否可见" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="true" border>可见</el-radio>
          <el-radio label="false" border>不可见</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="目录描述" prop="desc">
        <el-input v-model="ruleForm.remack" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CatalogueEdit',
  data() {
    return {
      ruleForm: {
        name: '',
        remack: '',
        resource: 'false'
      },
      rules: {
        name: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        resource: [
          { required: true, message: '请选择目录是否可见', trigger: 'change' }
        ],
        remack: [
          { required: true, message: '请填写活动描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.ruleForm = {
      name: '目录名称',
      remack: '目录备注',
      resource: 'true'
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
    }
  }
}
</script>
<style scoped>
.container {
  padding: 20px;
}
</style>
