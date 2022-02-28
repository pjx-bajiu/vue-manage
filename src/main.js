import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import http from 'axios'
import '../api/mock'

import router from '../router'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$message = ElementUI.Message.confirm

// 导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
