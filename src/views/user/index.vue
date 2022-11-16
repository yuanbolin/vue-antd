<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 400px">
      <el-tab-pane label="修改个人信息">
        <div class="container">
          <el-form ref="ruleForm" :model="formInline" :rules="rules">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formInline.name" placeholder="姓名" />
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input v-model.number="formInline.phone" placeholder="联系方式" />
            </el-form-item>
            <el-form-item label="所在地址" prop="address">
              <el-input v-model="formInline.address" placeholder="所在地址" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onSubmit('ruleForm')"
              >保存信息</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <change-password />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ChangePassword from './changePassword'
export default {
  name: 'My',
  components: { ChangePassword },
  data() {
    return {
      formInline: {
        name: '',
        phone: '',
        address: ''
      },
      rules: {
        name: [
          { type: 'string', required: true, whitespace: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入11位的手机号', trigger: 'blur' },
          { type: 'number', message: '必须为数字值' }
        ],
        address: [
          { type: 'string', whitespace: true, min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
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
