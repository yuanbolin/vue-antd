import {
  SYSTEMTOKEN,
  USERTOKEN,
  LOGIN,
  LOGINOUT,
  VISION
} from "@/services/api";
import { request, METHOD, removeAuthorization } from "@/utils/request";
import storage from "store";

export async function login(name, password) {
  return request(LOGIN, METHOD.GET, {
    name: name,
    password: password
  });
}

export function logout() {
  storage.remove(process.env.VUE_APP_USER_ROUTES_KEY);
  removeAuthorization();
}

export function SystemToken(parameter) {
  return request(SYSTEMTOKEN, METHOD.GET, null, {
    headers: { Timestamp: parameter }
  });
}

export function vision(parameter) {
  return request(VISION, METHOD.GET, null, {
    headers: {
      Timestamp: parameter.timeStamp,
      Authorization: parameter.userToken
    }
  });
}

export function UserToken(parameter) {
  return request(USERTOKEN, METHOD.POST, parameter.data, {
    headers: parameter.hearders
  });
}

/**
 * 登录服务
 * @returns {Promise<AxiosResponse<T>>}
 * @param parameter
 */
export function Login(parameter) {
  return request(LOGIN, METHOD.GET, null, {
    headers: {
      Timestamp: parameter.timeStamp,
      Authorization: parameter.systemToken
    }
  });
}

/**
 * 退出登录
 */
export function Logout() {
  return request(LOGINOUT, METHOD.GET);
}
