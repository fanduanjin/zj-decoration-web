import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import {Loading} from 'element-ui'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loading:null
    },
    actions:{
        loading(context){
            context.state.loading=Loading.service({fullscreen:true});
        },
        loaded(context){
            context.state.loading.close();
        }
    },
    modules:{
        user
    }
});