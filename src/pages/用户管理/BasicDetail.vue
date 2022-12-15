<template>
  <page-layout>
    <a-card :bordered="false">
      <a-descriptions title="用户信息" bordered>
        <a-descriptions-item label="用户账号">
          Cloud Database
        </a-descriptions-item>
        <a-descriptions-item label="用户姓名">
          Prepaid
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">
          YES
        </a-descriptions-item>
        <a-descriptions-item label="所在地址">
          2018-04-24 18:00:00
        </a-descriptions-item>
        <a-descriptions-item label="所在部门" :span="2">
          2019-04-24 18:00:00
        </a-descriptions-item>
        <a-descriptions-item label="工作岗位" :span="3">
          <a-badge status="processing" text="Running" />
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          $80.00
        </a-descriptions-item>
        <a-descriptions-item label="用户状态">
          $20.00
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
      id: this.dataSource.length,
      username: "urara" + this.dataSource.length,
      name: "张三",
      phone: 13296314652,
      address: "山东省威海市",
      department: "财务部",
      job: "会计",
      email: "48612312@qq.com",
      status: 0
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
