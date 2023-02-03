import storage from "store";
import { SystemToken, UserToken, Login, Logout, vision } from "@/services/user";
import { getTimestamp } from "@/utils/util";
import notification from "ant-design-vue/lib/notification";
const {
  VUE_APP_SYSTEM_TOKEN,
  VUE_APP_USER_TOKEN,
  VUE_APP_USER_ROUTES_KEY
} = process.env;

export default {
  namespaced: true,
  state: {
    token: "",
    name: ""
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    }
  },

  actions: {
    // 获取系统TOKEN
    getSystemToken() {
      storage.remove(VUE_APP_SYSTEM_TOKEN);
      storage.remove(VUE_APP_USER_TOKEN);
      storage.remove(VUE_APP_USER_ROUTES_KEY);
      return new Promise((resolve, reject) => {
        var params = getTimestamp();
        SystemToken(params)
          .then(res => {
            const response = res.data;
            if (response && response.data) {
              const result = response.data.token;
              storage.set(VUE_APP_SYSTEM_TOKEN, result, 48 * 60 * 60);
              // eslint-disable-next-line no-undef
              // this.$store.commit('SET_TOKEN', { token: result })
              resolve("OK");
            } else {
              notification.error({
                message: "错误",
                description: "获取二维码失败"
              });
              reject(new Error("无效系统授权"));
            }
          })
          .catch(error => {
            notification.error({
              message: "错误",
              description: error || "获取二维码失败"
            });
            reject(error);
          });
      });
    },
    // 获取用户TOKEN
    UserToken(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          UserToken(payload)
            .then(res => {
              const response = res.data;
              if (
                response &&
                response.code === "1000" &&
                response.data &&
                response.data.token
              ) {
                storage.remove(VUE_APP_SYSTEM_TOKEN);
                resolve(response);
              } else {
                notification.error({
                  message: "错误",
                  description: "人员信息未获取,请重新扫码"
                });
                reject(new Error("人员授权无效"));
              }
            })
            .catch(error => {
              notification.error({
                message: "错误",
                description: error || "人员信息未获取"
              });
              reject(error);
            });
        } else {
          notification.error({
            message: "错误",
            description: "系统授权无效"
          });
          reject(new Error("系统授权无效"));
        }
      });
    },

    // 二维码登录
    Login() {
      const systemToken = storage.get(VUE_APP_SYSTEM_TOKEN);
      const timeStamp = getTimestamp();
      const params = { systemToken: systemToken, timeStamp: timeStamp };
      if (params) {
        return new Promise((resolve, reject) => {
          Login(params)
            .then(res => {
              const response = res.data;
              if (response && response.data) {
                resolve(response.data);
              } else {
                notification.error({
                  message: "错误",
                  description: "钉钉二维码未获取"
                });
                reject(new Error("钉钉二维码未获取"));
              }
            })
            .catch(error => {
              notification.error({
                message: "错误",
                description: error || "钉钉二维码未获取"
              });
              reject(error);
            });
        });
      }
    },
    // 登出
    Logout({ commit }) {
      return new Promise(resolve => {
        Logout()
          .then(() => {
            resolve();
          })
          .catch(() => {
            resolve();
          })
          .finally(() => {
            commit("SET_TOKEN", "");
          });
      });
    },

    vision() {
      const userToken = storage.get(VUE_APP_USER_TOKEN);
      const timeStamp = getTimestamp();
      const params = { userToken: userToken, timeStamp: timeStamp };
      return new Promise(resolve => {
        vision(params).then(res => {
          const response = res.data;
          resolve(response);
        });
      });
    }
  }
};
