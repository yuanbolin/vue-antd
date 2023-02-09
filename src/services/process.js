/**
 * 第一版与许光经理定下功能后的编写的旧代码用于组织管理。目前无用
 */
import {
  PROCESS,
  PROCESSADD,
  PROCESSUPDATE,
  PROCESSDELETE,
  PROCESSPUBLIC,
  PROCESSSAVE,
  PROCESSDIR,
  PROCESSCONTENT,
  PROCESSEDITNODE,
  PROCESSGETNODEINFO,
  PROCESSDELETENODE
} from "./api";
import { METHOD, request } from "@/utils/request";
import qs from "qs";
//获取列表分页数据
export async function getTrees(params) {
  return request(PROCESS, METHOD.GET, params);
}
//新增
export async function addTree(params) {
  return request(PROCESSADD, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//编辑
export async function editTree(params) {
  return request(PROCESSUPDATE, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//删除
export async function deleteTree(params) {
  return request(PROCESSDELETE, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//发布
export async function publish(params) {
  return request(PROCESSPUBLIC, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//获取流程目录树
export async function getAll(params) {
  return request(PROCESSDIR, METHOD.GET, params);
}
//获取流程图
export async function getContent(params) {
  return request(PROCESSCONTENT, METHOD.GET, params);
}
//保存流程图
export async function save(params) {
  return request(PROCESSSAVE, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//保存节点信息
export async function changeNode(params) {
  return request(PROCESSEDITNODE, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}
//保存节点信息
export async function getNodeInfo(params) {
  return request(PROCESSGETNODEINFO, METHOD.Get, params);
}
//删除节点信息
export async function deleteNodeInfo(params) {
  return request(PROCESSDELETENODE, METHOD.POST, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  });
}

export default {
  getTrees,
  addTree,
  editTree,
  deleteTree,
  publish,
  save,
  getAll,
  getContent,
  changeNode,
  getNodeInfo,
  deleteNodeInfo
};
