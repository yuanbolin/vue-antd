<template>
  <div class="container demo-block">
    <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
      <template slot="extra">
        <!--        <el-button type="primary" size="small">操作</el-button>-->
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-menu" />
          用户名称
        </template>
        {{ formInline.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time" />
          创建日期
        </template>
        {{ formInline.createDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-discount" />
          用户状态
        </template>
        <el-tag size="small">{{ formInline.level }}级</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <svg-icon icon-class="kejian" />
          系统角色
        </template>
        {{ formInline.level }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-line-square" />
          联系方式
        </template>
        {{ formInline.remark }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-line-square" />
          地址
        </template>
        {{ formInline.remark }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      formInline: {
        name: '目录名称',
        createDate: '2022-11-10 11:18:23',
        changeDate: '2022-11-10 11:18:23',
        remark: '一个目录的描述',
        level: 1
      }
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.container {
  padding: 20px;
}
</style>
