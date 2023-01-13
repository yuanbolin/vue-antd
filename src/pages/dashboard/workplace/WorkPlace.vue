<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">
        {{ welcome.timeFix }}，{{ currUser.name }}，{{
          welcome.message
        }}
      </div>
      <div>{{ currUser.position }}</div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import { mapState } from "vuex";
import avatar from "@/assets/img/avatar.png";
const timeList = ["早上好", "上午好", "中午好", "下午好", "晚上好"];
export default {
  name: "WorkPlace",
  components: { PageLayout },
  data() {
    return {
      avatar,
      projects: [],
      loading: true,
      teams: [],
      welcome: {
        timeFix: "",
        message: ""
      }
    };
  },
  computed: {
    ...mapState("account", { currUser: "user" })
  },
  created() {
    const time = new Date();
    const hour = time.getHours();
    this.welcome = {
      timeFix:
        hour < 9
          ? timeList[0]
          : hour <= 11
          ? timeList[1]
          : hour <= 13
          ? timeList[2]
          : hour <= 20
          ? timeList[3]
          : timeList[4],
      message: "欢迎"
    };
  }
};
</script>

<style lang="less">
@import "index";
</style>
