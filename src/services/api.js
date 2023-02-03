//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
module.exports = {
  //钉钉二维码登录
  SYSTEMTOKEN: `/public/token/system`,
  USERTOKEN: `/public/token/user`,
  LOGIN: `/public/login/login`,
  LOGINOUT: `/public/login/logout`,
  VISION: `/public/business_philosophy/vision`,
  GOODS: `/goods`,
  GOODS_COLUMNS: `/columns`,
  //组织机构管理
  ORGANIZATION: `/organization/org_tree`,
  ORGANIZATIONADD: `/organization/add`,
  ORGANIZATIONEDIT: `/organization/update`,
  ORGANIZATIONDELETE: `/organization/delete`
};
