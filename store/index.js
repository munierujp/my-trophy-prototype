import Vuex from 'vuex'
import signInByGoogle from '~/modules/signInByGoogle'
import signOut from '~/modules/signOut'
import fetchAuth from '~/modules/fetchAuth'

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
      async nuxtClientInit ({ dispatch }, context) {
        await dispatch('fetchAuth')
      },
      async fetchAuth ({ commit }) {
        const auth = await fetchAuth()
        if (auth) {
          commit('setAuth', auth)
        }
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
