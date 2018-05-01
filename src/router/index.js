import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import LoginPage from 'Pages/Login'
import Register from 'Pages/Register'
import Publish from 'Pages/Publish'
import Person from 'Pages/Person'
import TaskHall from 'Pages/TaskHall'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: MainLayout,
      children: [
        {
          path: '/taskHall',
          component: TaskHall,
        },
        {
          path: '/person',
          component: Person,
          children: [
            {
              path: '/person/pushTask',
              component: Publish,
            },
          ],
        },
      ],
    }, {
      path: '/login',
      component: LoginPage,
    }, {
      path: '/register',
      component: Register,
    },
  ],
})
