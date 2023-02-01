<template>
  <a-result
    :isSuccess="true"
    :content="false"
    :title="title"
    :sub-title="description"
  >
  </a-result>
</template>

<script>
import { mapActions } from "vuex";
import storage from "store";

import { getTimestamp } from "@/utils/util";
const { VUE_APP_SYSTEM_TOKEN, VUE_APP_USER_TOKEN, VUE_APP_USER_ROUTES_KEY } = process.env;
export default {
  name: "AuthResult",
  data() {
    return {
      description: "登录成功，跳转中...",
      title: "登录成功"
    };
  },
  methods: {
    ...mapActions(["Login", "UserToken"])
  },
  created() {
    const authCode = this.$route.query.authCode;
    const state = this.$route.query.state;
    const systemToken = storage.get(VUE_APP_SYSTEM_TOKEN);
    const timeStamp = getTimestamp();
    if (authCode && state && systemToken && timeStamp) {
      const params = {
        hearders: { Authorization: systemToken, Timestamp: timeStamp },
        data: { code: authCode, state: state }
      };
      this.$store.dispatch("UserToken", params).then(res => {
        if (res.code === "1000") {
          storage.set(VUE_APP_USER_ROUTES_KEY, res.data.authority, 15 * 60 * 60);
          storage.set(VUE_APP_USER_TOKEN, res.data.token, 15 * 60 * 60);
          console.log("进入首页");
          this.$router.push({ path: "/" });
        }
      });
    }
  }
};
</script>
<style scoped></style>
