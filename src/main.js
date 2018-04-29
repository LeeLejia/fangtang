// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { Submenu, Layout, Header, Sider, MenuItem, Col, Row, Icon, BreadcrumbItem, Message, Notice } from 'iview'
import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('MenuItem', MenuItem)
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Icon', Icon)
Vue.component('Sider', Sider)
Vue.component('Header', Header)
Vue.component('Layout', Layout)
Vue.component('Submenu', Submenu)
Vue.component('BreadcrumbItem', BreadcrumbItem)

Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
