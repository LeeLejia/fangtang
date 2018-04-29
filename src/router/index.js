import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '../pages/MainLayout'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
    }, {
      path: '*',
      component: MainLayout,
    },
  ],
})
