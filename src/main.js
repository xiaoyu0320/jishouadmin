import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'
import '@/styles/siderbar.scss'
import './permission'
import './directive/index'
import setting from './setting'
import { golbal } from './mixins'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.mixin(golbal)

// 设置头部标题
document.title = setting.title
const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue
