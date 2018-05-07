// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import directives from '@/directives'
import vstore from '@/store/store'
import Vuex from 'vuex'
import {
  Submenu, Layout, Header, Sider, MenuItem, Modal,
  Icon, BreadcrumbItem, Message, Notice, Carousel, CarouselItem,
  Form, FormItem, Input, CheckboxGroup, Checkbox, Spin, Tabs, TabPane,
  Button, Row, Col, AutoComplete, Card, DatePicker, Scroll,
  RadioGroup, Radio, Slider, Switch, Select, Breadcrumb, Menu,
  Tag,
} from 'iview'
import 'iview/dist/styles/iview.css'
import Vue from 'vue'
import router from './router'
import App from './App'

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
Vue.component('Carousel', Carousel)
Vue.component('Tag', Tag)
Vue.component('Modal', Modal)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('CarouselItem', CarouselItem)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Button', Button)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('BreadcrumbItem', BreadcrumbItem)
Vue.component('DatePicker', DatePicker)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Slider', Slider)
Vue.component('Scroll', Scroll)
Vue.component('Spin', Spin)
Vue.component('i-switch', Switch)
Vue.component('Select', Select)
Vue.component('Breadcrumb', Breadcrumb)

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
