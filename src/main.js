// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { MenuItem, Col, Row, Icon, BreadcrumbItem } from 'iview'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('MenuItem', MenuItem)
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Icon', Icon)
Vue.component('BreadcrumbItem', BreadcrumbItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
