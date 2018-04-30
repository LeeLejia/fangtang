import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import LoginPage from 'Pages/Login'
import Register from 'Pages/Register'
import Publish from 'Pages/Publish'
import Person from '@/components/functional/Person'

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
          path: '/publish',
          component: Publish,
        }, {
          path: '/person',
          component: Person,
          children: [
            {
              path: '/pushTask',
              component: Publish,
            }, {
              path: '/',
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
    }, {
      path: '/publish',
      component: Publish,
    },
  ],
})
