
const whitelist = [
  '/home',
]
export default function routerHook(router, store) {
  // router.beforeEach((to, from, next) => {
  //   next(true)
  // })
  // router.afterEach((to, from) => {
  //   console.log(`routerBeforeEvent:to=${JSON.stringify(to.path)},from=${JSON.stringify(from.path)}`)
  //   if (whitelist.indexOf(to.path) === -1 && !store.state.hasVerify) {
  //     store.commit('setAuthModal', true)
  //   }
  // })
}
