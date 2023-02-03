<template>
  <page-layout :avatar="avatar">
    <div slot="headerContent">
      <div class="title">
        {{ welcome.timeFix[lang] }}，{{ currUser.name }}，{{
          welcome.message[lang]
        }}
      </div>
      <div>{{ currUser.description }}</div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/layouts/PageLayout";
import { mapState } from "vuex";
import avatar from "@/assets/img/avatar.png";
const timeList = [
  {
    CN: "早上好",
    HK: "早晨啊",
    US: "Good morning"
  },
  {
    CN: "上午好",
    HK: "上午好",
    US: "Good morning"
  },
  {
    CN: "中午好",
    HK: "中午好",
    US: "Good afternoon"
  },
  {
    CN: "下午好",
    HK: "下午好",
    US: "Good afternoon"
  },
  {
    CN: "晚上好",
    HK: "晚上好",
    US: "Good evening"
  }
];
const welcomeMessages = [
  {
    CN: "休息一会儿吧",
    HK: "休息一會兒吧",
    US: "you may need a break"
  },
  {
    CN: "准备吃什么呢",
    HK: "準備吃什麼呢",
    US: "what are you going to eat"
  },
  {
    CN: "新的一天，工作加油！",
    HK: "新的一天，工作加油！",
    US: "A new day, work come on!"
  },
  {
    CN: "我猜你可能累了",
    HK: "我猜你可能累了",
    US: "i guess you might be tired"
  }
];
export default {
  name: "WorkPlace",
  components: { PageLayout },
  i18n: require("./i18n"),
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
    ...mapState("account", { currUser: "user" }),
    ...mapState("setting", ["lang"])
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
      message: welcomeMessages[parseInt(Math.random() * 3)]
    };
  }
};
</script>

<style lang="less">
@import "index";
</style>
