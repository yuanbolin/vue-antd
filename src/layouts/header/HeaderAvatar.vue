<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="avatar" />
      <span class="name">{{ user.name }}</span>
    </div>
    <a-menu :class="['avatar-menu']" slot="overlay">
      <!--      <a-menu-item key="user" @click="personalCenter">-->
      <!--        <a-icon type="user" />-->
      <!--        <span>个人中心</span>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-item key="setting">-->
      <!--        <a-icon type="setting" />-->
      <!--        <span>设置</span>-->
      <!--      </a-menu-item>-->
      <!--      <a-menu-divider />-->
      <a-menu-item key="exit" @click="logoutHandle">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>{{ $t("exit.btn") }}</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import avatar from "@/assets/img/avatar.png";
export default {
  name: "HeaderAvatar",
  i18n: require("./i18n"),
  data() {
    return {
      avatar
    };
  },
  computed: {
    ...mapGetters("account", ["user"])
  },
  methods: {
    ...mapActions("login", ["Logout"]),
    // 退出登录
    logoutHandle() {
      this.$confirm({
        title: this.$t("exit.modalTitle"),
        content: this.$t("exit.modalContent"),
        onOk: () => {
          this.Logout().then(() => {
            this.$router.push("/login");
          });
        },
        onCancel() {}
      });
    },
    // 前往个人中心
    personalCenter() {
      // this.$router.push("/personalCenter");
    }
  }
};
</script>

<style lang="less">
.header-avatar {
  display: inline-flex;
  .avatar,
  .name {
    align-self: center;
  }
  .avatar {
    margin-right: 8px;
  }
  .name {
    font-weight: 500;
  }
}
.avatar-menu {
  width: 150px;
}
</style>
