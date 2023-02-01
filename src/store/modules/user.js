import storage from "store";
import { SystemToken, UserToken, Login, Logout, vision } from "@/services/user";
import { getTimestamp } from "@/utils/util";
import notification from "ant-design-vue/lib/notification";
const {
  VUE_APP_SYSTEM_TOKEN,
  VUE_APP_USER_TOKEN,
  VUE_APP_USER_ROLES_KEY,
  VUE_APP_USER_ROUTES_KEY,
  VUE_APP_USER_ROLE_AUTHORITY,
  VUE_APP_USER_KEY
} = process.env;

export default {
  state: {
    token: "",
    name: "",
    welcome: "",
    avatar: "",
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },

  actions: {
    // 获取系统TOKEN
    getSystemToken() {
      storage.remove(VUE_APP_SYSTEM_TOKEN);
      storage.remove(VUE_APP_USER_TOKEN);
      storage.remove(VUE_APP_USER_ROLES_KEY);
      storage.remove(VUE_APP_USER_ROUTES_KEY);
      storage.remove(VUE_APP_USER_ROLE_AUTHORITY);
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
              console.log(
                "UserToken",
                response,
                response.code === "1000",
                response.data,
                response.data.token
              );
              if (
                response &&
                response.code === "1000" &&
                response.data &&
                response.data.token
              ) {
                storage.set(
                  VUE_APP_USER_TOKEN,
                  response.data.token,
                  15 * 60 * 60
                );
                storage.set(
                  VUE_APP_USER_ROLES_KEY,
                  response.data.role,
                  15 * 60 * 60
                );
                storage.set(
                  VUE_APP_USER_ROUTES_KEY,
                  response.data.authority,
                  15 * 60 * 60
                );
                storage.set(
                  VUE_APP_USER_KEY,
                  JSON.stringify({
                    name: response.data.name,
                    description: response.data.description
                  }),
                  15 * 60 * 60
                );
                // this.$store.commit('SET_INFO', { name: response.data.name })
                storage.remove(VUE_APP_SYSTEM_TOKEN);
                // commit('SET_NAME', { name: response.data.name })
                resolve(response);
              } else {
                notification.error({
                  message: "错误",
                  description: "人员信息未获取"
                });
                reject(new Error("人员授权无效"));
              }
            })
            .catch(error => {
              notification.error({
                message: "错误",
                description: error
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
                description: error
              });
              reject(error);
            });
        });
      }
    },
    // 登录
    // Login (context, payload) {
    //   return new Promise((resolve, reject) => {
    //     if (payload) {
    //       console.log(payload)
    //       login(payload).then(response => {
    //         if (response && response.data) {
    //           if (response.data.status) {
    //             storage.set(ACCESS_TOKEN, payload, 15 * 60 * 60)
    //             // storage.remove(SYSTEM_ACCESS_TOKEN)
    //             resolve('OK')
    //           } else {
    //             notification.error({
    //               message: '错误',
    //               description: 'TOKEN无效'
    //             })
    //             reject(new Error('TOKEN无效'))
    //           }
    //         } else {
    //           notification.error({
    //             message: '错误',
    //             description: 'TOKEN无效'
    //           })
    //           reject(new Error('TOKEN无效'))
    //         }
    //       }).catch(error => {
    //         notification.error({
    //           message: '错误',
    //           description: error
    //         })
    //         reject(error)
    //       })
    //     } else {
    //       notification.error({
    //         message: '错误',
    //         description: 'VUE_APP_SYSTEM_TOKEN无效'
    //       })
    //       reject(new Error('VUE_APP_SYSTEM_TOKEN无效'))
    //     }
    //   })
    // },

    // 获取用户信息
    // GetInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     userinfo().then(response => {
    //       let usercode = ''
    //       let name = ''
    //       let roleName = ''
    //       let role = {}
    //       let roleCount = 0
    //       let organizationName = ''
    //       let phone = ''
    //       let email = ''
    //       const permissions = []
    //       if (response && response.code === '1000' && response.data) {
    //         const result = response.data
    //         result.forEach((item, index) => {
    //           name = item.employee_name
    //           usercode = item.employee_code
    //           organizationName = item.organization_name
    //           role = { role_id: item.role_code, permissionList: STATIC_ROLES }
    //           phone = item.phone
    //           email = item.email
    //           permissions.push(item.role_code)
    //           if (roleCount === 0) {
    //             roleName = item.role_name
    //           } else {
    //             roleName = roleName + ' | ' + item.role_name
    //           }
    //           roleCount = roleCount + 1
    //         })
    //         role.permissionList = permissions.concat(STATIC_ROLES)
    //         commit('SET_ROLES', role)
    //         commit('SET_INFO', { name: name, organization_name: organizationName, role_name: roleName, role: role, id: usercode, phone: phone, email: email })
    //       } else {
    //         notification.error({
    //           message: '错误',
    //           description: '登录成功但是用户无角色！'
    //         })
    //         reject(new Error('登录成功但是用户无角色！'))
    //       }
    //       commit('SET_NAME', { name: name, welcome: welcome() })
    //       resolve({ name: name, organization_name: organizationName, role_name: roleName, role: role, id: usercode, phone: phone, email: email })
    //     }).catch(error => {
    //       notification.error({
    //         message: '错误',
    //         description: error
    //       })
    //       reject(error)
    //     })
    //   })
    // },

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
            storage.remove(VUE_APP_SYSTEM_TOKEN);
            storage.remove(VUE_APP_USER_TOKEN);
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
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
