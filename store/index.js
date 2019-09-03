import Vuex from 'vuex'
import signInByGoogle from '~/modules/signInByGoogle'

export default function () {
  return new Vuex.Store({
    state: () => ({
      auth: null
    }),
    mutations: {
      setAuth (state, auth) {
        state.auth = auth
      }
    },
    actions: {
      nuxtClientInit ({ commit }, context) {
        // Write initialization of client here
      },
      async signInByGoogle ({ commit }) {
        const auth = await signInByGoogle()
        if (auth) {
          commit('setAuth', auth)
        }
      }
    }
  })
}
