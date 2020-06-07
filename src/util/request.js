import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import auth from '@/util/auth'


const service = axios.create({
    baseURL: '/api/',
    timeout: 15000,
});

service.reqCount = 0;
const loading = () => {
    service.reqCount += 1;
    store.dispatch('loading');
}
const loaded = () => {
    service.reqCount -= 1;
    if (service.reqCount == 0) {
        store.dispatch('loaded');
    }
}

service.interceptors.request.use(config => {
    loading();
    var token=auth.getToken();
    if(token){
        config.headers['Authorization']=token;
    }
    return config
}, error => {
    loaded();
    return Promise.reject(error);
});


//response 拦截
service.interceptors.response.use(response => {
    var res = response.data instanceof Object ? response.data : { data: response.data };
    res.flag = false;
    var msg;
    loaded();
    if (res.code != 200) {
        msg = '!:request status error:' + res.code + '  ' +JSON.stringify(res.msg);
    } else if (res.code == 200) {
        res.flag = true;
    }
    res.msg = msg;
    return res;
}, error => {
    loaded();
    return Promise.reject(error);
});

const handleRes = (res, callback, errorCallback) => {
    //处理自定义异常
    try {
        if (res instanceof Error) {
            var error={};
            error.msg=res.message;
            error.flag=false;
            res=error;            
        } 
        
        if (res.flag) {
            if (callback && callback instanceof Function)
                callback(res);
        } else {
            Message({
                message: res.msg,
                type: 'error',
                duration: 3 * 1000
            });
            if (errorCallback && errorCallback instanceof Function) {
                errorCallback(res);
            }
        }
    } catch (error) {
        console.log('!:requestHandlerExeception: ' + error);
    }
}

export default {
    put(url, params, callback, errorCallback) {
        service.put(url,params).then(res => {
            handleRes(res, callback, errorCallback);
        }).catch(error => {
            handleRes(error, callback, errorCallback);
        });
    },
    delete(url, params, callback, errorCallback) {
        service.request({ url, params, method: 'delete' }).then(res => {
            handleRes(res, callback, errorCallback);
        }).catch(error => {
            handleRes(error, callback, errorCallback);
        });
    },
    post(url, params, callback, errorCallback) {
        service.post(url,params).then(res => {
            handleRes(res, callback, errorCallback);
        }).catch(error => {
            handleRes(error, callback, errorCallback);
        });
    },
    get(url, params, callback, errorCallback) {
        service.request({ url, params, method: 'get' }).then(res => {
            handleRes(res, callback, errorCallback);
        }).catch(error => {
            handleRes(error, callback, errorCallback);
        });
    }
};