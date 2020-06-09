import Vue from 'vue'
import App from './App.vue'

import '@/util/array.js'
import './plugins/element.js'
import '@/assets/css/common.css'
import router from './router'
import '@/permission'
import store from '@/store'


Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')