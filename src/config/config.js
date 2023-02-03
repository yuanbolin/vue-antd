// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  theme: {
    color: "#e85311",
    mode: "dark"
  },
  multiPage: true,
  hideSetting: true,
  asyncRoutes: true, //异步加载路由，true:开启，false:不开启
  animate: {
    name: "lightSpeed",
    disabled: false, //禁用过渡动画
    direction: "left"
  }
};
