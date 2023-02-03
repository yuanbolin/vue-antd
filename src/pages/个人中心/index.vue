<template>
  <page-layout title="个人中心">
    <a-card :bordered="false">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="修改密码">
          <forget-password></forget-password>
        </a-tab-pane>
        <a-tab-pane key="2" tab="个人信息">
          <user-info></user-info>
        </a-tab-pane>
        <a-tab-pane key="3" tab="所在团队">
          <team></team>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import UserInfo from "./UserInfo";
import ForgetPassword from "./ForgetPassword";
import Team from "./Team";
export default {
  name: "PersonalCenter",
  components: { PageLayout, ForgetPassword, UserInfo, Team },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped></style>
