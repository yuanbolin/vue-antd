import TabsView from "@/layouts/tabs/TabsView";
// import PageView from "@/layouts/PageView";

/**
 * 路由配置
 * name	菜单名称
 * path	点击菜单时的跳转链接
 * meta.icon	菜单图标，图标使用 ant-design-vue 图标库，对应 Icon 组件 的 type 属性
 * meta.invisible	是否不将此路由项渲染为菜单项，默认false；如设置为 true，则生成菜单时将忽略此路由
 * meta.page.closable 页面是否可关闭，默认为true
 * meta.page.cacheAble 页面是否可缓存，默认为true
 *
 */
const options = {
  routes: [
    {
      path: "/login",
      name: "登录",
      component: () => import("@/pages/login")
    },
    {
      path: "/auth",
      name: "用户授权",
      component: () =>
        import(/* webpackChunkName: "result" */ "@/pages/login/Auth"),
      meta: {
        invisible: true
      }
    },
    {
      path: "*",
      name: "404",
      component: () => import("@/pages/exception/404")
    },
    {
      path: "/403",
      name: "403",
      component: () => import("@/pages/exception/403")
    },
    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/login",
      children: [
        {
          path: "dashboard",
          name: "工作台",
          meta: {
            icon: "dashboard",
            page: {
              closable: false
            }
          },
          component: () => import("@/pages/dashboard/workplace")
        },
        // {
        //   path: "group",
        //   name: "权限管理组",
        //   redirect: "group/index",
        //   meta: {
        //     icon: "schedule"
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: "index",
        //       meta: {
        //         invisible: true
        //       },
        //       name: "管理组列表",
        //       component: () => import("@/pages/权限管理组/CardList")
        //     },
        //     {
        //       path: "edit/:id",
        //       meta: {
        //         invisible: true
        //       },
        //       name: "编辑管理组",
        //       component: () => import("@/pages/权限管理组/BasicForm")
        //     },
        //     {
        //       path: "add",
        //       meta: {
        //         invisible: true
        //       },
        //       name: "新增管理组",
        //       component: () => import("@/pages/权限管理组/BasicForm")
        //     },
        //     {
        //       path: "detail/:id",
        //       meta: {
        //         invisible: true
        //       },
        //       name: "管理组详情",
        //       component: () => import("@/pages/权限管理组/BasicDetail")
        //     },
        //   ]
        // },
        {
          path: "/flow",
          name: "流程管理",
          meta: {
            icon: "project"
          },
          component: () => import("@/pages/流程管理/QueryList")
        },
        {
          name: "流程图绘制",
          path: "/antvx6/:id",
          meta: {
            invisible: true,
            page: {
              cacheAble: false
            }
          },
          component: () => import("@/pages/antvx6/index")
        },
        // {
        //   path: "User",
        //   name: "用户管理",
        //   redirect: "User/index",
        //   meta: {
        //     icon: "team"
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       meta: {
        //         invisible: true
        //       },
        //       path: "index",
        //       name: "列表",
        //       component: () => import("@/pages/用户管理/QueryList")
        //     },
        //     {
        //       meta: {
        //         invisible: true
        //       },
        //       path: "edit/:id",
        //       name: "用户信息编辑",
        //       component: () => import("@/pages/用户管理/BasicForm")
        //     },
        //     {
        //       meta: {
        //         invisible: true
        //       },
        //       path: "add",
        //       name: "新增用户",
        //       component: () => import("@/pages/用户管理/BasicForm")
        //     },
        //     {
        //       meta: {
        //         invisible: true
        //       },
        //       path: "detail/:id",
        //       name: "查看用户信息",
        //       component: () => import("@/pages/用户管理/BasicDetail")
        //     }
        //   ]
        // },
        // {
        //   path: "Organization",
        //   name: "组织机构树管理",
        //   redirect: "Organization/index",
        //   meta: {
        //     icon: "table"
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       meta: {
        //         invisible: true
        //       },
        //       path: "index",
        //       name: "树形列表",
        //       component: () => import("@/pages/组织机构树管理/QueryList")
        //     }
        //   ]
        // },
        // {
        //   name: "个人中心",
        //   path: "personalCenter",
        //   meta: {
        //     invisible: true
        //   },
        //   component: () => import("@/pages/个人中心/index")
        // },
        {
          name: "流程图展示",
          path: "antvShow",
          meta: {
            icon: "profile",
            page: {
              cacheAble: false
            }
          },
          component: () => import("@/pages/流程展示/antvShow")
        }
      ]
    }
  ]
};

export default options;
