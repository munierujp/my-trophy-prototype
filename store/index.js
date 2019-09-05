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
      api: null,
      drawer: null
    }),
    getters: {
      isSignedIn: (state) => {
        return state.auth !== null
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
      },
      setDrawer (state, drawer) {
        state.drawer = drawer
      },
      removeDrawer (state) {
        state.drawer = null
      }
    },
    actions: {
      async nuxtClientInit ({ dispatch }, context) {
        await dispatch('initNotRequireApi')
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
      async initNotRequireApi ({ dispatch }) {
        await dispatch('fetchAuth')
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
      async signIn ({ dispatch }) {
        await dispatch('signInByGoogle')
        await dispatch('initApi')
        await dispatch('fetchUserOrCreate')
      },
      async signOut ({ state, commit }) {
        await signOut()
        commit('removeUser')
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
