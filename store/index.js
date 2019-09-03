import Vuex from 'vuex'

export default function () {
  return new Vuex.Store({
    actions: {
      nuxtClientInit ({ commit }, context) {
        // Write initialization of client here
      }
    }
  })
}
