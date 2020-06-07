import request from '@/util/request'

export default{

    list(pageinfo,callback){
        request.get('user/list',pageinfo,callback);
    }
} 