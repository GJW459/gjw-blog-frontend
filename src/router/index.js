import Vue from 'vue'
import Router from 'vue-router'
import typeList from '../views/blog/type/typeList'
import blogList from '../views/blog/blog/blogList'
import aboutList from '../views/blog/about/aboutList'
import adminUpdate from "../views/user/admin/adminUpdate"
import userList from "../views/user/user/userList";
import commentList from "../views/comment/commentList";
import logList from "../views/sys/log/logList";
import musicList from "../views/sys/music/musicList";
import linkList from "../views/sys/link/linkList";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/blog',
    name: 'Article',
    meta: {title: '帖子管理', icon: "example"},
    children: [
      {
        path: 'type',
        name: 'Type',
        component: typeList,
        meta: {title: '分类管理', icon: 'table'}
      },
      {
        path: 'blog',
        name: 'Blog',
        component: blogList,
        meta: {title: '博客管理', icon: 'table'}
      },
      {
        path: 'about',
        name: 'About',
        component: aboutList,
        meta: {title: '关于我的', icon: 'table'}
      }
    ]

  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/admin',
    name: 'UserManager',
    meta: {title: '用户管理', icon: 'example'},
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: adminUpdate,
        meta: {title: '管理员', icon: 'table'}
      },
      {
        path: 'user',
        name: 'User',
        component: userList,
        meta: {title: '用户管理', icon: 'table'}
      }
    ]
  },

  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/comment',
    name: 'CommentManager',
    meta: {title: '评论管理', icon: 'example'},
    children: [
      {
        path: 'comment',
        name: 'Comment',
        component: commentList,
        meta: {title: '评论管理', icon: 'table'}
      }
    ]
  },

  {
    path: '/sys',
    component: Layout,
    redirect: '/sys/log',
    name: 'System',
    meta: {title: '系统管理', icon: 'example'},
    children: [
      {
        path: 'log',
        name: 'Log',
        component: logList,
        meta: {title: '系统日志', icon: 'table'}
      },
      {
        path: 'music',
        name: 'Music',
        component: musicList,
        meta: {title: '音乐欣赏', icon: 'table'}
      },
      {
        path: 'link',
        name: 'Link',
        component: linkList,
        meta: {title: '友情链接', icon: 'table'}
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
