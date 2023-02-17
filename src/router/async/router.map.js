// 视图组件
const view = {
  tabs: () => import("@/layouts/tabs"),
  blank: () => import("@/layouts/BlankView"),
  page: () => import("@/layouts/PageView"),
  user: () => import("@/layouts/UserLayout")
};
/**
 *
 * @type {{exception: {component: (function(): Promise<*>), name: string, icon: string}, components: {component: (function(): Promise<*>), name: string, icon: string}, searchList: {path: string, component: (function(): Promise<*>), name: string}, primaryList: {path: string, component: (function(): Promise<*>), name: string}, project: {component: (function(): Promise<*>), name: string}, login: {path: string, component: (function(): Promise<*>), authority: string}, error: {component: (function(): Promise<*>), name: string}, queryList: {path: string, component: (function(): Promise<*>), name: string}, advanceDetails: {path: string, component: (function(): Promise<*>), name: string}, result: {component: (function(): Promise<*>), name: string, icon: string}, exp500: {path: string, component: (function(): Promise<*>), name: string}, exp403: {path: string, component: (function(): Promise<*>), authority: string, name: string}, exp404: {path: string, component: (function(): Promise<*>), name: string}, root: {redirect: string, path: string, component: (function(): Promise<*>), name: string}, details: {component: (function(): Promise<*>), name: string, icon: string}, palette: {component: (function(): Promise<*>), name: string}, dashboard: {component: (function(): Promise<*>), name: string}, basicForm: {path: string, component: (function(): Promise<*>), name: string}, advanceForm: {path: string, component: (function(): Promise<*>), name: string}, basicDetails: {path: string, component: (function(): Promise<*>), name: string}, analysis: {component: (function(): Promise<*>), name: string}, list: {component: (function(): Promise<*>), name: string, icon: string}, article: {component: (function(): Promise<*>), name: string}, stepForm: {path: string, component: (function(): Promise<*>), name: string}, cardList: {path: string, component: (function(): Promise<*>), name: string}, taskCard: {component: (function(): Promise<*>), name: string}, form: {component: (function(): Promise<*>), name: string, icon: string}, application: {component: (function(): Promise<*>), name: string}, success: {component: (function(): Promise<*>), name: string}, workplace: {component: (function(): Promise<*>), name: string}}}
 * registerName: {                               //路由组件注册名称，唯一标识
  path: 'path',                               //路由path，可缺省，默认取路由注册名称 registerName 的值
  name: '演示页',                             //路由名称
  redirect: '/login',                         //路由重定向
  component: () => import('@/pages/demo'),    //路由视图
  icon: 'permission',                         //路由的菜单icon，会注入到路由元数据meta中
  invisible: false,                           //是否隐藏菜单项，true 隐藏，false 不隐藏，会注入到路由元数据meta中。
  authority: 'admin',                               //路由权限配置，会注入到路由元数据meta中。可缺省，默认为 []
  page: {                                     //路由的页面数据，会注入到路由元数据meta中
    title: '演示页',                          //页面标题
    breadcrumb: ['首页', '演示页']            //页面面包屑
  }
}
 */
// 路由组件注册
const routerMap = {
  login: {
    authority: "*",
    path: "/login",
    name: "登录页",
    component: () => import("@/pages/login")
  },
  auth: {
    authority: "*",
    path: "/auth",
    name: "用户授权",
    component: () => import("@/pages/login/Auth")
  },
  home: {
    path: "/",
    name: "首页",
    redirect: "/login",
    component: view.tabs
  },
  dashboard: {
    name: "工作台",
    path: "/dashboard",
    icon: "dashboard",
    page: {
      closable: false
    },
    component: () => import("@/pages/dashboard/workplace")
  },
  flow: {
    name: "流程管理",
    path: "flow",
    icon: "project",
    component: () => import("@/pages/processManager/QueryList")
  },
  ANTVXSix: {
    path: "/antvx6/:id",
    name: "流程图绘制",
    invisible: true,
    component: () => import("@/pages/antvx6/index")
  },
  antvShow: {
    name: "流程图展示",
    path: "/antvShow",
    icon: "profile",
    component: () => import("@/pages/antvSixShow/index")
  },
  exp403: {
    authority: "*",
    name: "exp403",
    path: "403",
    component: () => import("@/pages/exception/403")
  },
  exp404: {
    name: "exp404",
    path: "404",
    component: () => import("@/pages/exception/404")
  },
  exp500: {
    name: "exp500",
    path: "500",
    component: () => import("@/pages/exception/500")
  }
};
export default routerMap;
