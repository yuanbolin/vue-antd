import Vue from 'vue'
import App from './App.vue'
import {initRouter} from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import bootstrap from '@/bootstrap'
import MyIconComponent from '@/icons'
import 'moment/locale/zh-cn'
import { FormModel } from 'ant-design-vue';
Vue.use(FormModel);
const router = initRouter()
Vue.component('my-icon', MyIconComponent)
Vue.use(Antd)
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Plugins)

bootstrap({router, store, message: Vue.prototype.$message})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
