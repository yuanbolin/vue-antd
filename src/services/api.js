//跨域代理前缀
const API_PROXY_PREFIX = "/api/public/";

const api = {
  //钉钉二维码登录
  SYSTEMTOKEN: `token/system`,
  USERTOKEN: `token/user`,
  LOGIN: `login/login`,
  LOGINOUT: `login/logout`,
  //流程管理
  PROCESS: "process/get_tree",
  PROCESSADD: "process/add",
  PROCESSUPDATE: "process/update",
  PROCESSDELETE: "process/delete",
  PROCESSPUBLIC: "process/publish",
  PROCESSSAVE: "process/save_process",
  PROCESSDIR: "process/get_dir_list",
  PROCESSCONTENT: "process/get_process_content",
  PROCESSEDITNODE: "process/edit_process_node",
  PROCESSGETNODEINFO: "process/get_process_node",
  PROCESSDELETENODE: "process/delete_process_node"
  //组织机构管理
  // ORGANIZATION: `/organization/org_tree`,
  // ORGANIZATIONADD: `/organization/add`,
  // ORGANIZATIONEDIT: `/organization/update`,
  // ORGANIZATIONDELETE: `/organization/delete`
};

for (const apiKey in api) {
  api[apiKey] = API_PROXY_PREFIX + api[apiKey];
}

module.exports = api;
