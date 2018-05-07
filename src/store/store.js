

const state = {
  user: {},
  openAuthModal: false,
}

const getters = {

}

const mutations = {
  setUser(state, user) {
    state.user = user
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
