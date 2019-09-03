import Vuex from 'vuex'
import signInByGoogle from '~/modules/signInByGoogle'
import signOut from '~/modules/signOut'

export default function () {
  return new Vuex.Store({
    state: () => ({
      auth: null
    }),
    mutations: {
      setAuth (state, auth) {
        state.auth = auth
      },
      removeAuth (state) {
        state.auth = null
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
      },
      async signOut ({ commit }) {
        await signOut()
        commit('removeAuth')
      }
    }
  })
}
