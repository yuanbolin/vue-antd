//跨域代理前缀 本系统后台有ip白名单安全访问限制，用不到代理请求。
// const API_PROXY_PREFIX = "/dev";
//base url
const BASE_URL = process.env.VUE_APP_API_BASE_URL

const api = {
  //钉钉二维码登录
  SYSTEMTOKEN: `/token/system`,
  USERTOKEN: `/token/user`,
  LOGIN: `/login/login`,
  LOGINOUT: `/login/logout`,
  //工作台
  PROCESSCOUNT:"/process/count_process",
  PROCESSUNPUBLISHED:"/process/get_unpublished_process",
  //流程管理
  PROCESS: "/process/get_tree",
  PROCESSADD: "/process/add",
  PROCESSUPDATE: "/process/update",
  PROCESSDELETE: "/process/delete",
  PROCESSPUBLIC: "/process/publish",
  PROCESSSAVE: "/process/save_process",
  PROCESSDIR: "/process/get_dir_list",
  PROCESSCONTENT: "/process/get_process_content",
  PROCESSEDITNODE: "/process/edit_process_node",
  PROCESSGETNODEINFO: "/process/get_process_node",
  PROCESSDELETENODE: "/process/delete_process_node"
  //组织机构管理
  // ORGANIZATION: `/organization/org_tree`,
  // ORGANIZATIONADD: `/organization/add`,
  // ORGANIZATIONEDIT: `/organization/update`,
  // ORGANIZATIONDELETE: `/organization/delete`
};

for (const apiKey in api) {
  api[apiKey] = BASE_URL + api[apiKey];
}

module.exports = api;
