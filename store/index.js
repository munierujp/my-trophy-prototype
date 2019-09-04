import Vuex from 'vuex'
import Val from '@js-commons/val'
import MyTrophyApi from '~/modules/MyTrophyApi'
import signInByGoogle from '~/modules/signInByGoogle'
import signOut from '~/modules/signOut'
import fetchAuth from '~/modules/fetchAuth'

const { API_ORIGIN } = process.env.config

export default function () {
  return new Vuex.Store({
    state: () => ({
      auth: null,
      user: null,
      api: null
    }),
    getters: {
      isSignedIn: (state) => {
        return state.auth
      }
    },
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
      },
      setApi (state, api) {
        state.api = api
      },
      removeApi (state) {
        state.api = null
      }
    },
    actions: {
      async nuxtClientInit ({ dispatch }, context) {
        await dispatch('fetchAuth')
        await dispatch('initApi')
        await dispatch('initRequireApi')
      },
      initApi ({ state, commit }) {
        const api = Val.of(state.auth)
          .map(auth => auth.token)
          .map(token => MyTrophyApi.of(this.$axios, API_ORIGIN, token))
          .orGet(() => MyTrophyApi.of(this.$axios, API_ORIGIN))
        commit('setApi', api)
      },
      async initRequireApi ({ getters, dispatch }) {
        if (getters.isSignedIn) {
          await dispatch('fetchUser')
        }
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
      async signOut ({ state, commit }) {
        await signOut()
        commit('removeAuth')
        state.api.clearToken()
      },
      async fetchUser ({ state, commit }) {
        const user = await state.api.fetchUserByEmail(state.auth.email)
        if (user) {
          commit('setUser', user)
        }
      },
      async createUser ({ state, commit }) {
        await state.api.createUser()
        const user = await state.api.fetchUserByEmail(state.auth.email)
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
