import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import Publish from 'Pages/Publish'
import Person from 'Pages/Person'
import TaskHall from 'Pages/TaskHall'
import Settings from 'Pages/Settings'
import Home from 'Pages/Home'
import About from 'Pages/About'
import Link from '@/components/functional/LinkTable'
import FileManage from '@/components/functional/FileManage'
import MsgManage from '@/components/functional/MsgManage'
import SysLog from '@/components/functional/SysLog'

const router = new Router({
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
            {
              path: '/person/file',
              component: FileManage,
            },
            {
              path: '/person/sysLog',
              component: SysLog,
            },
            {
              path: '/person/setting',
              component: Settings,
            },
            {
              path: '/person/msgs',
              component: MsgManage,
            },
          ],
        },
      ],
    },
  ],
})
Vue.use(Router)
export default router
