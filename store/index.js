import Vuex from 'vuex'
import MyTrophyApi from '~/modules/MyTrophyApi'
import signInByGoogle from '~/modules/signInByGoogle'
import signOut from '~/modules/signOut'
import fetchAuth from '~/modules/fetchAuth'

const { API_ORIGIN } = process.env.config

export default function () {
  return new Vuex.Store({
    state: () => ({
      auth: null,
      user: null
    }),
    mutations: {
      setAuth (state, auth) {
        state.auth = auth
      },
      removeAuth (state) {
        state.auth = null
      },
      setUser (state, user) {
        state.user = user
      },
      removeUser (state) {
        state.user = null
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
      },
      async fetchUser ({ state, commit }) {
        const { token, email } = state.auth
        const api = MyTrophyApi.of(this.$axios, API_ORIGIN, token)
        const user = await api.fetchUserByEmail(email)
        if (user) {
          commit('setUser', user)
        }
      },
      async createUser ({ state, commit }) {
        const { token, email } = state.auth
        const api = MyTrophyApi.of(this.$axios, API_ORIGIN, token)
        await api.createUser()
        const user = await api.fetchUserByEmail(email)
        if (user) {
          commit('setUser', user)
        } else {
          throw new Error('Failed to create user')
        }
      },
      async fetchUserOrCreate ({ state, dispatch }) {
        await dispatch('fetchUser')
        if (!state.user) {
          await dispatch('createUser')
        }
      }
    }
  })
}
