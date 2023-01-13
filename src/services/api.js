//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL + "/mock/39/api/public";
module.exports = {
  LOGIN: `${BASE_URL}/login`,
  GOODS: `${BASE_URL}/goods`,
  GOODS_COLUMNS: `${BASE_URL}/columns`,
  //组织机构管理
  ORGANIZATION: `${BASE_URL}/organization/org_tree`,
  ORGANIZATIONADD: `${BASE_URL}/organization/add`,
  ORGANIZATIONEDIT: `${BASE_URL}/organization/update`,
  ORGANIZATIONDELETE: `${BASE_URL}/organization/delete`,
};
