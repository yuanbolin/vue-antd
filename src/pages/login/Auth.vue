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
import { listToTree, generator, loadRoutes } from "@/utils/routerUtil";
const { VUE_APP_SYSTEM_TOKEN } = process.env;
export default {
  name: "AuthResult",
  data() {
    return {
      description: "扫码成功，正在请求用户信息，请稍后...",
      title: "扫码成功"
    };
  },
  methods: {
    ...mapActions("login", ["Login", "UserToken"]),
    ...mapMutations("account", ["setUser", "setRoutesConfig"])
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
      this.UserToken(params)
        .then(res => {
          if (res.code === "1000") {
            //处理路由
            let treeNav = [];
            const list = generator(res.data.authority);
            //      经过字段格式化后的原始数组, 路由树形数组,  根级PID
            treeNav = listToTree(list, 0);
            this.setRoutesConfig(treeNav);
            loadRoutes(treeNav);
            this.setUser({
              name: res.data.name,
              description: res.data.description,
              info: res.data.role //不具备额外权限效应，只作为用户信息展示
            });
            setAuthorization(
              {
                token: res.data.token
              },
              15 * 60 * 60
            );
            this.$router.push({ path: "/dashboard" });
            this.$message.success("登录成功！", 3);
          }
        })
        .catch(() => {
          storage.remove(VUE_APP_SYSTEM_TOKEN);
          this.$router.replace({ path: "/login" });
        });
    } else {
      storage.remove(VUE_APP_SYSTEM_TOKEN);
      this.$router.replace({ path: "/login" });
    }
  }
};
</script>
<style scoped></style>
