import request from '@/util/request'
import auth from '@/util/auth'
import router from '@/router'

export default {

    login(username, password) {

        request.get('account/login', { username, password }, (res) => {
            var data = res.data;
            var token = data.token;
            var tokenHead = data.tokenHead;
            token = tokenHead + '  ' + token;
            auth.setToken(token);
            router.push('/');
        });
    },
    logout() {
        auth.removeToken();
        console.log('退出登陆');
    },
    sendRegistryCode(phoneNumber, success) {
        request.get('account/sendRegistryCode', { phoneNumber }, success);

    },
    registry(user, validatorCode) {
        user.validatorCode = validatorCode;
        request.put('account/registry', user, (res) => {
            var data = res.data;
            var token = data.token;
            var tokenHead = data.tokenHead;
            token = tokenHead + '  ' + token;
            auth.setToken(token);
            router.push('/');
        });
    }



}