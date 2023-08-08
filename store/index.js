export const state = () => ({
  counter: 0,
})

export const actions = {
  counterUp({ state, commit }){
    commit('setCounter', state,counter + 1)
  }
}

export const mutations = {
  setCounter(state, value) {
    state.counter = value
  }
}

export const getters = {
  myGetter(state) {
    return state.counter + 1000
  }
}