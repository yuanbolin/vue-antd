import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

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
      name: "登录页",
      component: () => import("@/pages/login")
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
      name: "流程管理工具",
      component: TabsView,
      redirect: "/login",
      children: [
        {
          path: "dashboard",
          name: "首页",
          meta: {
            icon: "dashboard",
            page: {
              closable: false
            }
          },
          component: () => import("@/pages/dashboard/workplace")
        },
        {
          path: "form",
          name: "表单页",
          meta: {
            icon: "form",
            page: {
              cacheAble: false
            }
          },
          component: PageView,
          children: [
            {
              path: "basic",
              name: "基础表单",
              component: () => import("@/pages/form/basic")
            },
            {
              path: "step",
              name: "分步表单",
              component: () => import("@/pages/form/step")
            },
            {
              path: "advance",
              name: "高级表单",
              component: () => import("@/pages/form/advance")
            }
          ]
        },
        {
          path: "list",
          name: "列表页",
          meta: {
            icon: "table"
          },
          component: PageView,
          children: [
            {
              path: "query",
              name: "查询表格",
              meta: {
                authority: "queryForm"
              },
              component: () => import("@/pages/list/QueryList")
            },
            {
              path: "query/detail/:id",
              name: "查询详情",
              meta: {
                highlight: "/list/query",
                invisible: true
              },
              component: () => import("@/pages/Demo")
            },
            {
              path: "primary",
              name: "标准列表",
              meta: {
                authority: {
                  permission: "form"
                }
              },
              component: () => import("@/pages/list/StandardList")
            },
            {
              path: "search",
              name: "搜索列表",
              component: () => import("@/pages/list/search/SearchLayout"),
              children: [
                {
                  path: "article",
                  name: "文章",
                  component: () => import("@/pages/list/search/ArticleList")
                },
                {
                  path: "application",
                  name: "应用",
                  component: () => import("@/pages/list/search/ApplicationList")
                },
                {
                  path: "project",
                  name: "项目",
                  component: () => import("@/pages/list/search/ProjectList")
                }
              ]
            }
          ]
        },
        {
          path:'group',
          name: "权限管理组",
          meta: {
            icon: "table"
          },
          component: PageView,
          children: [
            {
              path: "card",
              name: "卡片列表",
              component: () => import("@/pages/权限管理组/CardList")
            }
          ]
        },
        {
          path:'Flow',
          name: "流程管理",
          meta: {
            icon: "table",
          },
          component: BlankView,
          children: [
            {
              path: "list",
              name: "流程目录",
              component: () => import("@/pages/流程管理/QueryList")
            },
            {
              path: "stepAdd",
              name: "新建流程",
              component: () => import("@/pages/流程管理/step")
            },
            {
              name: "流程图绘制",
              path: "antvx6/:id",
              meta: {
                invisible:true,
                icon: "file-excel",
                page: {
                  cacheAble: false
                }
              },
              component: () => import("@/pages/antvx6/index")
            },
          ]
        },
        {
          path:'User',
          name: "用户管理",
          redirect:'User/index',
          meta: {
            icon: "table",
          },
          component: BlankView,
          children: [
            {
              meta: {
                invisible: true,
              },
              path: "index",
              name: "列表",
              component: () => import("@/pages/用户管理/QueryList")
            },
            {
              meta: {
                invisible: true,
              },
              path: "edit/:id",
              name: "用户信息编辑",
              component: () => import("@/pages/用户管理/BasicForm")
            },
            {
              meta: {
                invisible: true,
              },
              path: "add",
              name: "新增用户",
              component: () => import("@/pages/用户管理/BasicForm")
            },
            {
              meta: {
                invisible: true,
              },
              path: "detail/:id",
              name: "查看用户信息",
              component: () => import("@/pages/用户管理/BasicDetail")
            }
          ]
        },
        {
          path:'Organization',
          name: "组织机构树管理",
          redirect:'Organization/index',
          meta: {
            icon: "table",
          },
          component: BlankView,
          children: [
            {
              meta: {
                invisible: true,
              },
              path: "index",
              name: "树形列表",
              component: () => import("@/pages/组织机构树管理/QueryList")
            }
          ]
        },
        {
          path: "details",
          name: "详情页",
          meta: {
            icon: "profile"
          },
          component: BlankView,
          children: [
            {
              path: "basic",
              name: "基础详情页",
              component: () => import("@/pages/detail/BasicDetail")
            },
            {
              path: "advance",
              name: "高级详情页",
              component: () => import("@/pages/detail/AdvancedDetail")
            }
          ]
        },
        {
          path: "components",
          name: "内置组件",
          meta: {
            icon: "appstore-o"
          },
          component: PageView,
          children: [
            {
              path: "taskCard",
              name: "任务卡片",
              component: () => import("@/pages/components/TaskCard")
            },
            {
              path: "palette",
              name: "颜色复选框",
              component: () => import("@/pages/components/Palette")
            },
            {
              path: "table",
              name: "高级表格",
              component: () => import("@/pages/components/table")
            }
          ]
        },
        {
          name: "验权表单",
          path: "auth/form",
          meta: {
            icon: "file-excel",
            authority: {
              permission: "form"
            }
          },
          component: () => import("@/pages/form/basic")
        },
        {
          name: "流程图展示",
          path: "antvShow",
          meta: {
            icon: "file-excel",
            page: {
              cacheAble: false
            }
          },
          component: () => import("@/pages/antvx6/antvShow")
        },
        {
          name: "带参菜单",
          path: "router/query",
          meta: {
            icon: "project",
            query: {
              name: "菜单默认参数"
            }
          },
          component: () => import("@/pages/Demo")
        },
        {
          name: "个人中心",
          path: "personalCenter",
          meta: {
            invisible:true
          },
          component: () => import("@/pages/个人中心/index")
        }
      ]
    }
  ]
};

export default options;
