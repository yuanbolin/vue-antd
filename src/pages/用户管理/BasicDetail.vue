<template>
  <page-layout>
    <a-card :bordered="false">
      <a-descriptions title="用户信息" bordered>
        <a-descriptions-item label="用户账号">
          {{form.username}}
        </a-descriptions-item>
        <a-descriptions-item label="用户姓名">
          {{form.name}}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          {{form.phone}}
        </a-descriptions-item>
        <a-descriptions-item label="所在地址" :span="2">
          {{form.address}}
        </a-descriptions-item>
        <a-descriptions-item label="所在部门" :span="2">
          {{form.department}}
        </a-descriptions-item>
        <a-descriptions-item label="工作岗位">
          {{form.job}}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {{form.email}}
        </a-descriptions-item>
        <a-descriptions-item label="用户状态">
          <template v-if="form.status===1">
            <a-badge color="green" status="processing" text="正常" />
          </template>
          <template v-else-if="form.status===0">
            <a-badge color="red" status="processing" text="停用" />
          </template>
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "../../layouts/PageLayout";

export default {
  name: "UserDetail",
  components: { PageLayout },
  data() {
    return {
      form: {}
    };
  },
  created() {
    this.form = {
      id: 0,
      username: "urara123",
      name: "张三",
      phone: 13296314652,
      address: "山东省威海市",
      department: "财务部",
      job: "会计",
      email: "48612312@qq.com",
      status: 1
    };
  }
};
</script>

<style lang="less" scoped>
.title {
  color: @title-color;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
