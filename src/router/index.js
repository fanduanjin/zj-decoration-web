import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout'

Vue.use(Router);

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index') },
  { path: '/404', component: () => import('@/views/404') },
  { path: '/registry', component: () => import('@/views/registry') },
  {
    path: '',
    component: () => import('@/views/layout'),
    children: [{
      path: '',
      name: '',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }
    ]
  },
  {
    path: '/admin', name: 'admin.index', component: Layout,meta:{title:'首页'},
    children: [
      {
        path: '', meta: { title: '首页' }, component: () => import('@/views')
      }
    ]
  },
  {
    path: '/admin/user', meta: { title: '用户管理' }, component: Layout,
    children: [
      { path: '', meta: { title: '用户列表' }, component:()=> import('@/views/user') }]
  },
  { path: '*', redirect: '/404', hidden: true }
]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
