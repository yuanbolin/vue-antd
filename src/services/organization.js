import {
  ORGANIZATION,
  ORGANIZATIONADD,
  ORGANIZATIONEDIT,
  ORGANIZATIONDELETE
} from "./api";
import { METHOD, request } from "@/utils/request";

//获取列表分页数据
export async function getTrees(params) {
  return request(ORGANIZATION, METHOD.GET, params);
}
//新增
export async function addTree(params) {
  return request(ORGANIZATIONADD, METHOD.POST, params);
}
//编辑
export async function editTree(params) {
  return request(ORGANIZATIONEDIT, METHOD.POST, params);
}
//删除
export async function deleteTree(params) {
  return request(ORGANIZATIONDELETE, METHOD.POST, params);
}

export default { getTrees, addTree, editTree, deleteTree };
