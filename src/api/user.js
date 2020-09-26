import request from '@/util/request'

export default {

    list(pageinfo, callback) {
        request.get('/api/user/list', pageinfo, callback);
    }
}