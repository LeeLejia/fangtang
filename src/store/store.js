

const state = {
  user: {},
  openAuthModal: false,
  hasVerify: false,
  settings: {},
}

const getters = {
  getUserRole(state) {
    return state.user.role || 'developer'
  },
}

const mutations = {
  setUser(state, user) {
    state.user = user
    state.hasVerify = true
  },
  setAuthModal(state, open) {
    state.openAuthModal = open
  },
  setSettings(state, options) {
    Object.keys(options).forEach((key) => {
      state.settings[key] = options[key]
    })
  },
}

const actions = {

}

export default {
  state, getters, mutations, actions,
}
