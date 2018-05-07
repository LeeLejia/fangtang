

const state = {
  user: {},
  openAuthModal: false,
  hasVerify: false,
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
}

const actions = {

}

export default {
  state, getters, mutations, actions,
}
