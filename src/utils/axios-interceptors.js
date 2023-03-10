import storage from "store";
import store from "../store";
import { removeAuthorization } from "@/utils/request";
import { messages } from "./i18n";
//不需要token拦截的接口配置
const tokenIgnore = {
  paths: ["/token", "/login"], //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.paths.includes(route.path);
  }
};

// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const { message } = options;
    if (response?.status === 401) {
      message.error(messages[store.state.setting.lang]["401"]);
    }
    return response;
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (response?.status === 401) {
      message.error(messages[store.state.setting.lang]["401"]);
    }
    return Promise.reject(error);
  }
};

const resp403 = {
  onFulfilled(response, options) {
    const { message } = options;
    if (response?.status === 403) {
      message.error(messages[store.state.setting.lang]["403"]);
    }
    return response;
  },
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (response?.status === 403) {
      message.error(messages[store.state.setting.lang]["403"]);
    }
    return Promise.reject(error);
  }
};

const respError = {
  onFulfilled(response, options) {
    const { router } = options;
    if (
      response?.status === 200 &&
      response.data?.msg === "authorization is invalid"
    ) {
      removeAuthorization();
      router.replace({ path: "/login" });
    }
    return response;
  },
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (!response) {
      message.error(messages[store.state.setting.lang]["timeOut"]);
    }
    if (response.status.toString().indexOf("50") != -1) {
      message.error(messages[store.state.setting.lang]["timeOut"]);
    }
    if (response.status.toString().indexOf("40") != -1) {
      message.error(messages[store.state.setting.lang]["timeOut"]);
    }
    return Promise.reject(error);
  }
};

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { message } = options;
    const { url, xsrfCookieName } = config;
    if (
      tokenIgnore.includes(url) === -1 &&
      xsrfCookieName &&
      !storage.get(xsrfCookieName)
    ) {
      message.warning(messages[store.state.setting.lang]["tokenAuth"]);
    }
    return config;
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    message.error(error.message);
    return Promise.reject(error);
  }
};

export default {
  request: [reqCommon], // 请求拦截
  response: [resp401, resp403, respError] // 响应拦截
};
