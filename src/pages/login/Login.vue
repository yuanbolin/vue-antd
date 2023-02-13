<template>
  <user-layout>
    <div class="main">
      <div class="login_container">
        <div class="qrcode">
          <div class="title-name">流程图管理工具</div>
          <div class="edition-no">V 1.0.1</div>
          <div id="system" class="system">{{ systemName }}</div>
          <div id="login"></div>
          <div class="privacy-clause">
            <div class="title">阅读并接受</div>
            <a href="https://www.honglee.net" class="title-blue"
              >《使用条款》
            </a>
            <div class="title">和</div>
            <a href="https://www.honglee.net" class="title-blue">
              《隐私政策》</a
            >
          </div>
        </div>
      </div>
    </div>
  </user-layout>
</template>
<script>
import { mapActions } from "vuex";
import notification from "ant-design-vue/lib/notification";
import UserLayout from "@/layouts/UserLayout";
export default {
  components: {
    UserLayout
  },
  data() {
    return {
      systemName: ""
    };
  },
  mounted() {
    this.getSystemToken().then(res => {
      if (res && res === "OK") {
        this.getQrcode();
      }
    });
  },
  methods: {
    ...mapActions("login", ["getSystemToken", "Login"]),
    getQrcode() {
      this.Login().then(res => {
        if (res) {
          let systemName = "";
          let systemColor = "#0089ff";
          let systemObject = null;
          switch (res.system_type) {
            case 1:
              systemName = "请使用钉钉扫码";
              systemColor = "#0089ff";
              systemObject = document.getElementById("system");
              systemObject.style.setProperty("color", systemColor);
              this.systemName = systemName;
              window.DTFrameLogin(
                {
                  id: "login",
                  width: 300,
                  height: 300
                },
                {
                  redirect_uri: encodeURIComponent(
                      res.redirect_uri
                  ),
                  client_id: res.client_id,
                  scope: res.scope,
                  response_type: res.response_type,
                  state: res.state,
                  prompt: res.prompt
                },
                loginResult => {
                  const { redirectUrl, authCode } = loginResult;
                  // 这里可以直接进行重定向
                  console.log(redirectUrl);
                  window.location.href = redirectUrl;
                  // 也可以在不跳转页面的情况下，使用code进行授权
                  console.log(authCode);
                },
                errorMsg => {
                  notification.error({
                    message: "登录失败",
                    description: errorMsg
                  });
                }
              );
              break;
            case 2:
              systemName = "请使用企业微信扫码";
              systemColor = "#0082ef";
              // TODO 企业微信登录
              break;
            case 3:
              systemName = "请使用微信扫码";
              systemColor = "green";
              // TODO 微信登录
              break;
            case 4:
              systemName = "请使用飞书扫码";
              systemColor = "green";
              // TODO 飞书登录
              break;
          }
        }
      });
    }
  }
};
</script>
<style>
.main {
  display: flex;
  justify-items: center;
  align-content: center;
}
.login_container {
  display: flex;
  flex-direction: row;
  justify-items: center;
  text-align: center;
  align-content: center;
  width: 400px;
}
.qrcode {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 400px;
  height: 500px;
  box-shadow: 0 3px 3px #888888;
  background: white;
  text-align: center;
}
.system {
  font-size: 22px;
  padding-top: 30px;
  font-weight: bold;
}
.title-name {
  font-size: 28px;
  padding-top: 30px;
  font-weight: bold;
}
.edition-no {
  color: #888888;
  margin-left: 80%;
}
.privacy-clause {
  display: flex;
  text-align: center;
  justify-content: center;
  font-weight: bold;
  color: black;
}
.title {
  color: #888888;
}
.title-blue {
  color: black;
}
</style>
