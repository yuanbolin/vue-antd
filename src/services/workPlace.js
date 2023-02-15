/**
 * 第一版与许光经理定下功能后的编写的旧代码用于组织管理。目前无用
 */
import { PROCESSCOUNT, PROCESSUNPUBLISHED } from "./api";
import { METHOD, request } from "@/utils/request";
//获取流程数量统计
export async function getCount(params) {
  return request(PROCESSCOUNT, METHOD.GET, params);
}
//获取未发布的流程列表
export async function getList(params) {
  return request(PROCESSUNPUBLISHED, METHOD.GET, params);
}

export default {
  getCount,
  getList
};
