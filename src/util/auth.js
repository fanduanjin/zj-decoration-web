import Cookie from 'js-cookie'


export default{
    getToken(){
        return Cookie.get('token');
    },
    setToken(token){
        Cookie.set('token',token);
    },
    removeToken(){
        Cookie.remove('token');
    }
}