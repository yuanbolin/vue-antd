<template>
  <div class="container demo-block">
    <el-descriptions class="margin-top" title="角色信息" :column="3" border>
      <template slot="extra">
        <!--        <el-button type="primary" size="small">操作</el-button>-->
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-menu" />
          角色名称
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
          授权用户数
        </template>
        <el-tag size="small">{{ formInline.level }}人</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-line-square" />
          备注
        </template>
        {{ formInline.remark }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-chat-line-square" />
          可见目录
        </template>
        {{ formInline.menu }}
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
        name: '角色名称',
        createDate: '2022-11-10 11:18:23',
        remark: '一个角色的备注',
        menu: '战略与经营管理，产品研发管理，产品营销管理。',
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
