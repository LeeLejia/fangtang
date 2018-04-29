import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import LoginPage from 'Pages/Login'
import Register from 'Pages/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
    }, {
      path: '/login',
      component: LoginPage,
    }, {
      path: '/register',
      component: Register,
    },
  ],
})
