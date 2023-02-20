import axios from "axios";
import storage from "store";
const { VUE_APP_USER_TOKEN } = process.env;
import { getTimestamp } from "./util";
axios.defaults.timeout = 240000;
axios.defaults.xsrfHeaderName = VUE_APP_USER_TOKEN;
axios.defaults.xsrfTokenName = VUE_APP_USER_TOKEN;

// http method
const METHOD = {
  GET: "get",
  POST: "post"
};

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config = {}) {
  //默认headers配置
  const defaultheaders = {
    Timestamp: getTimestamp(),
    Authorization: storage.get(VUE_APP_USER_TOKEN)
  };
  config.headers = Object.assign(defaultheaders, config.headers || {});
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {
        ...config,
        params
      });
    case METHOD.POST:
      return axios.post(url, params, config);
    default:
      return axios.get(url, {
        ...config,
        params
      });
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 */
function setAuthorization(auth) {
  storage.set(
    VUE_APP_USER_TOKEN,
    auth.token
  );
}

/**
 * 移出认证信息
 */
function removeAuthorization() {
  storage.clearAll();
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization() {
  if (storage.get(VUE_APP_USER_TOKEN)) {
    return true;
  }
  return false;
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const { request, response } = interceptors;
  // 加载请求拦截器
  request.forEach(item => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== "function") {
      onFulfilled = config => config;
    }
    if (!onRejected || typeof onRejected !== "function") {
      onRejected = error => Promise.reject(error);
    }
    axios.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    );
  });
  // 加载响应拦截器
  response.forEach(item => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== "function") {
      onFulfilled = response => response;
    }
    if (!onRejected || typeof onRejected !== "function") {
      onRejected = error => Promise.reject(error);
    }
    axios.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    );
  });
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {};
  if (!url || url === "" || typeof url !== "string") {
    return params;
  }
  const paramsStr = url.split("?")[1];
  if (!paramsStr) {
    return params;
  }
  const paramsArr = paramsStr.replace(/&|=/g, " ").split(" ");
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1];
    params[paramsArr[i * 2]] =
      value === "true" ? true : value === "false" ? false : value;
  }
  return params;
}

export {
  METHOD,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
  parseUrlParams
};
