import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from 'Pages/MainLayout'
import Publish from 'Pages/Publish'
import Person from 'Pages/Person'
import TaskHall from 'Pages/TaskHall'
import Condition from 'Pages/Condition'
import Settings from 'Pages/Settings'
import MyTask from 'Pages/MyTask'
import Home from 'Pages/Home'
import Apps from 'Pages/Apps'
import NotFound from 'Pages/404'
import OrderList from 'Pages/OrderList'
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
          path: '/apps',
          component: Apps,
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
              path: '/person/myTask',
              component: MyTask,
            },
            {
              path: '/person/orderList',
              component: OrderList,
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
            }, {
              path: '/',
              component: Condition,
            },
          ],
        },
        {
          path: '*',
          component: NotFound,
        },
      ],
    },
  ],
})
Vue.use(Router)
export default router
