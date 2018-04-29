```javascript
import {
  Submenu, Layout, Header, Sider, MenuItem, Col,
  Row, Icon, BreadcrumbItem, Message, Notice,
  Form, FormItem, Input, CheckboxGroup, Checkbox,
} from 'iview'
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
Vue.component('FormItem', FormItem)
Vue.component('Form', Form)
Vue.component('Input', Input)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Checkbox', Checkbox)
Vue.component('BreadcrumbItem', BreadcrumbItem)



const iviewComponents = [
  'Submenu', 'Layout', 'Header', 'Sider', 'MenuItem', 'Col',
  'Row', 'Icon', 'BreadcrumbItem', 'Message', 'Notice',
  'Form', 'FormItem', 'Input', 'CheckboxGroup', 'Checkbox',
]
iviewComponents.forEach((component) => {
  // eslint-disable-next-line
  import(`iview/${component}`).then((Obj) => {
    Vue.component(component, Obj)
  })
})
const iviewRegisterComponents = [
  'Message', 'Notice',
]
iviewRegisterComponents.forEach((component) => {
    // eslint-disable-next-line
    import(`iview/${component}`).then((Obj) => {
      Vue.prototype[`$${component}`] = Obj
    })
})

```