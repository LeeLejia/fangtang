// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import directives from '@/directives'
import vstore from '@/store/store'
import Vuex from 'vuex'
import { Message, Notice, Row, Col, Icon, Modal } from 'iview'
import '@/../node_modules/iview/dist/styles/iview.css'
import Vue from 'vue'
import router from './router'
import App from './App'

Vue.config.productionTip = false
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Icon', Icon)
Vue.component('Modal', Modal)

// 导入指令
Object.keys(directives).forEach((directive) => {
  Vue.directive(directive, directives[directive])
})

// 添加状态管理
Vue.use(Vuex)
const store = new Vuex.Store({
  ...vstore,
})

Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
