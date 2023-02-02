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
import { mapActions, mapMutations } from "vuex";
import storage from "store";
import { setAuthorization } from "@/utils/request";
import { getTimestamp } from "@/utils/util";
import { listToTree, generator } from "@/utils/routerUtil";
const { VUE_APP_SYSTEM_TOKEN } = process.env;
export default {
  name: "AuthResult",
  data() {
    return {
      description: "登录成功，跳转中...",
      title: "登录成功"
    };
  },
  methods: {
    ...mapActions(["Login", "UserToken"]),
    ...mapMutations(["setUser", "setRoutesConfig"])
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
          //处理路由
          const treeNav = [];
          const list = generator(res.data.authority);
          //      经过字段格式化后的原始数组, 路由树形数组,  根级PID
          listToTree(list, treeNav, 0);
          this.setRoutesConfig(treeNav);
          this.setUser(
            JSON.stringify({
              name: res.data.name,
              description: res.data.description,
              info: res.data.role  //不具备额外权限效应，只作为用户信息展示
            })
          );
          setAuthorization({
            token: res.data.token,
            expireAt: new Date(new Date().getTime() + 30 * 60 * 1000)
          },15*60*60);
          console.log("进入首页");
          this.$router.push({ path: "/dashboard" });
          this.$message.success("登录成功！", 3);
        }
      });
    }
  }
};
</script>
<style scoped></style>
