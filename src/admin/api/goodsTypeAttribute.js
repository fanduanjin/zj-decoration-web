import request from '@/util/request'

export default{
    insert(data,callback){
        request.put('/admin/api/goodsType/attribute',data,callback);
    },
    list(pageInfo,callback){
        request.get('/admin/api/goodsType/attribute',pageInfo,callback);
    },
    delete(data,callback){
        request.delete('/admin/api/goodsType/attribute',{id:data},callback);
    },
    modify(data,callback){
        request.post('/admin/api/goodsType/attribute',data,callback);
    }

}