// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import directives from '@/directives'
import {
  Submenu, Layout, Header, Sider, MenuItem,
  Icon, BreadcrumbItem, Message, Notice,
  Form, FormItem, Input, CheckboxGroup, Checkbox,
  Button, Row, Col, AutoComplete, Card, DatePicker,
  RadioGroup, Radio, Slider, Switch, Select, Breadcrumb, Menu,
} from 'iview'
import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.component('MenuItem', MenuItem)
Vue.component('Menu', Menu)
Vue.component('Col', Col)
Vue.component('Row', Row)
Vue.component('Icon', Icon)
Vue.component('Sider', Sider)
Vue.component('Header', Header)
Vue.component('Layout', Layout)
Vue.component('Submenu', Submenu)
Vue.component('FormItem', FormItem)
Vue.component('Form', Form)
Vue.component('Input', Input)
Vue.component('Card', Card)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Button', Button)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('DatePicker', DatePicker)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Slider', Slider)
Vue.component('i-switch', Switch)
Vue.component('Select', Select)
Vue.component('Breadcrumb', Breadcrumb)

Object.keys(directives).forEach((directive) => {
  Vue.directive(directive, directives[directive])
})

Vue.prototype.$Notice = Notice
Vue.prototype.$Message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
