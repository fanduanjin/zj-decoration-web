import Vue from 'vue';
import Router from 'vue-router';
import adminRouter from '@/router/adminRouter'

Vue.use(Router);

export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index')
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404')
    },
    {
        path: '/registry',
        component: () =>
            import ('@/views/registry')
    },
    {
        path: '',
        component: () =>
            import ('@/admin/views/layout'),
        children: [{
            path: '',
            name: '',
            component: () =>
                import ('@/admin/views/home/index'),
            meta: { title: '首页', icon: 'home' }
        }]
    }
]



constantRouterMap.pushAll(adminRouter);

constantRouterMap.push({ path: '*', redirect: '/404', hidden: true });
console.log(constantRouterMap);

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});