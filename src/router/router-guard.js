const whitelist = [
  '',
]
export default function routerHook(router) {
  router.beforeEach((to, from, next) => {
    console.log(`routerBeforeEvent:to=${JSON.stringify(to.path)},from=${JSON.stringify(from.path)}`)
    next(true)
  })
  router.afterEach((to, from) => {
    console.log(`routerAfterEvent:to=${to.path},from=${from.path}`)
  })
}
