import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '系统主页', icon: 'dashboard', affix: false }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/catalogue',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/catalogue/index'),
        name: 'CatalogueList',
        meta: { title: '分级目录管理', icon: 'education', noCache: false, roles: ['admin'] }
      },
      {
        path: 'info/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/catalogue/info'),
        name: 'CatalogueInfo',
        meta: { title: '目录信息', noCache: true, roles: ['admin'] }
      },
      {
        path: 'add/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/catalogue/add'),
        name: 'CatalogueAdd',
        meta: { title: '新增目录', noCache: false, roles: ['admin'] }
      },
      {
        path: 'edit/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/catalogue/edit'),
        name: 'CatalogueEdit',
        meta: { title: '编辑目录', noCache: false, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/butterfly',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/butterfly/index'),
        name: 'ButterFlyList',
        meta: { title: '流程图管理', icon: '流程图', noCache: false, roles: ['admin'] }
      },
      {
        path: 'draw/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/butterfly/draw/index'),
        name: 'ButterFlyEdit',
        meta: { title: '流程图编辑', noCache: false, roles: ['admin'] }
      },
      {
        path: 'draw',
        hidden: true,
        component: () => import('@/views/butterfly/draw/index'),
        name: 'ButterFlyAdd',
        meta: { title: '流程图绘制', noCache: false, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/butterfly-show',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/butterfly-show/index'),
        name: 'ButterFlyShow',
        meta: { title: '流程图查看', icon: 'el-icon-set-up', noCache: true, roles: ['editor'] }
      }
    ]
  },
  {
    path: '/user-manager',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/user-manger/index'),
        name: 'UserList',
        meta: { title: '用户管理', icon: 'user-manager', noCache: false, roles: ['admin'] }
      },
      {
        path: 'info/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/user-manger/info'),
        name: 'UserInfo',
        meta: { title: '用户信息', noCache: true, roles: ['admin'] }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/user-manger/add'),
        name: 'UserAdd',
        meta: { title: '新增用户', noCache: false, roles: ['admin'] }
      },
      {
        path: 'edit/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/user-manger/edit'),
        name: 'UserEdit',
        meta: { title: '编辑用户', noCache: false, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/role/index'),
        name: 'UserList',
        meta: { title: '角色管理', icon: '角色管理', noCache: false, roles: ['admin'] }
      },
      {
        path: 'info/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/role/info'),
        name: 'UserInfo',
        meta: { title: '角色信息', noCache: true, roles: ['admin'] }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/role/add'),
        name: 'UserAdd',
        meta: { title: '新增角色', noCache: false, roles: ['admin'] }
      },
      {
        path: 'edit/:id(\\d*)',
        hidden: true,
        component: () => import('@/views/role/edit'),
        name: 'UserEdit',
        meta: { title: '编辑角色', noCache: false, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        hidden: true,
        component: () => import('@/views/user/index'),
        name: 'My',
        meta: { title: '基本信息管理', noCache: false, roles: ['editor', 'admin'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
