import request from '@/util/request'

export default {
    list(pageInfo, callback) {
        request.get('/admin/api/goodsType/list', pageInfo, callback);
    },
    insert(goodsType, callback) {
        request.post('/admin/api/goodsType/insert', goodsType, callback);
    },
    modify(goodsType, callback) {
        request.put('/admin/api/goodsType/modify', goodsType, callback);
    },
    delete(id, callback) {
        request.delete('/admin/api/goodsType/delete', { id }, callback);
    }
}