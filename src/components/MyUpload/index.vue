<template>
  <div class="component-upload-image">
    <el-tooltip class="item" effect="dark" content="支持.txt,.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar文件，且不超过100mb" placement="right">
      <el-upload
        :action="uploadImgUrl"
        accept=".txt,.doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
        list-type="picture-card"
        :on-success="handleUploadSuccess"
        :before-upload="handleBeforeUpload"
        :on-error="handleUploadError"
        name="file"
        :show-file-list="true"
        drag
        :headers="headers"
        style="display: inline-block; vertical-align: top"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-tooltip>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      uploadImgUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传的图片服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  watch: {},
  methods: {
    removeImage() {
      this.$emit('input', '')
    },
    handleUploadSuccess(res) {
      this.$emit('input', res.url)
      this.loading.close()
    },
    handleBeforeUpload() {
      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    handleUploadError() {
      this.$message({
        type: 'error',
        message: '上传失败'
      })
      this.loading.close()
    }
  }
}
</script>

<style>
.component-upload-image .el-upload-dragger{
  width: 146px;
  height: 146px;
}
.component-upload-image .el-upload--picture-card{
  line-height: 20px;
}
.component-upload-image .el-upload-dragger .el-upload__text{
  font-size: 12px;
  padding: 0 10px;
}
.component-upload-image .el-upload-dragger .el-icon-upload{
margin: 15px 0;
}
</style>
