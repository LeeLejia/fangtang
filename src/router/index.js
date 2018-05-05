import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import LoginPage from 'Pages/Login'
import Publish from 'Pages/Publish'
import Person from 'Pages/Person'
import TaskHall from 'Pages/TaskHall'
import Home from 'Pages/Home'
import About from 'Pages/About'
import Link from '@/components/functional/LinkTable'

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
          path: '/',
          redirect: '/home',
        }, {
          path: '/home',
          component: Home,
        },
        {
          path: '/taskHall',
          component: TaskHall,
        },
        {
          path: '/about',
          component: About,
        },
        {
          path: '/person',
          component: Person,
          children: [
            {
              path: '/person/pushTask',
              component: Publish,
            },
            {
              path: '/person/link',
              component: Link,
            },
          ],
        },
      ],
    }, {
      path: '/login',
      component: LoginPage,
    },
  ],
})
