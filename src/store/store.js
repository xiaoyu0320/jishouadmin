import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import app from './app/app'
import settings from './setting/setting'
import getters from './getters'
import permission from './permission/permission'
Vue.use(Vuex)

export default new Vuex.Store({
  // 防止以后可能会需要更多的判断加一个模块空间
  modules: {
    user,
    settings,
    app,
    permission
  },
  getters
})
