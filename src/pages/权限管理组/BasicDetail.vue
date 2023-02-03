<template>
  <page-layout>
    <a-card :bordered="false">
      <a-descriptions :title="form.name" bordered>
        <a-descriptions-item label="管理组成员" :span="2">
          {{ form.chengyuan }}
        </a-descriptions-item>
        <a-descriptions-item label="权限分配">
          {{ form.quanxian }}
        </a-descriptions-item>
        <a-descriptions-item label="管理范围" :span="3">
          {{ form.guanlifanwei }}
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
      name: "xxx管理组",
      chengyuan: "张三，李四",
      guanlifanwei: "财务中心，信息部，嘉兴汽配零部件有限公司",
      quanxian: "查看"
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
