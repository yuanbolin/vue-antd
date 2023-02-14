import {
  SYSTEMTOKEN,
  USERTOKEN,
  LOGIN,
  LOGINOUT
} from "@/services/api";
import { request, METHOD } from "@/utils/request";

export function SystemToken(parameter) {
  return request(SYSTEMTOKEN, METHOD.GET, null, {
    headers: { Timestamp: parameter }
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

export default {
  SystemToken,
  UserToken,
  Login,
  Logout
};
