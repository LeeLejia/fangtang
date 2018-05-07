import { mapMutations } from 'vuex'

const whitelist = [
  '/home',
]
const setAuthModal = mapMutations(['setAuthModal']).setAuthModal
export default function routerHook(router) {
  router.beforeEach((to, from, next) => {
    console.log(`routerBeforeEvent:to=${JSON.stringify(to.path)},from=${JSON.stringify(from.path)}`)
    if (whitelist.indexOf(to.path) === -1) {
      setAuthModal(true)
      next(false)
      return
    }
    next(true)
  })
  router.afterEach((to, from) => {
    console.log(`routerAfterEvent:to=${to.path},from=${from.path}`)
  })
}
