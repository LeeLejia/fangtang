export default {
  bind(el, binding, vnode) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
      return true
    }
    el.__vueClickOutside__ = documentHandler        // eslint-disable-line
    document.addEventListener('click', documentHandler)
  },
  update() {

  },
  unbind(el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)    // eslint-disable-line
    delete el.__vueClickOutside__                                // eslint-disable-line
  },
}

