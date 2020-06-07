import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// Progress 进度条样式
import store from '@/store'
import auth from '@/util/auth'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


const whiteList = ['/login','/registry'];
router.beforeEach((to, from, next) => {
    store.dispatch('loading');
    NProgress.start();
    if (!auth.getToken()) {
        //未登录
        if (whiteList.indexOf(to.path) == -1) {
            //非白名单 需要登陆 跳转登陆
            store.dispatch('loaded');
            NProgress.done();
            next('/login');
        } else {
            //白名单可以访问
            next();
        }
    } else {
        next();
    }
})

router.afterEach(() => {
    store.dispatch('loaded');
    NProgress.done();
});