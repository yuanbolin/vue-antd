//跨域代理前缀
const API_PROXY_PREFIX = "/api";

const api = {
  //钉钉二维码登录
  SYSTEMTOKEN: `/public/token/system`,
  USERTOKEN: `/public/token/user`,
  LOGIN: `/public/login/login`,
  LOGINOUT: `/public/login/logout`,
  VISION: `/public/business_philosophy/vision`
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
