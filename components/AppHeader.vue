<template>
  <v-app-bar
    class="app-header"
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="toggleDrawer" />
    <v-toolbar-title>
      {{ $t('APP_NAME') }}
    </v-toolbar-title>
    <v-spacer />
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <template v-if="isSignedIn">
          <app-list-item
            :title="user.name"
            :subtitle="user.email"
            @click="toMyPage"
          />
          <v-divider />
          <app-list-item
            :title="$t('LOG_OUT')"
            @click="signOut"
          />
        </template>
        <template v-else>
          <app-list-item
            :title="$t('LOG_IN')"
            @click="signIn"
          />
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import AppListItem from '~/components/AppListItem'

export default {
  components: {
    AppListItem
  },
  computed: {
    isSignedIn () {
      return this.$store.getters.isSignedIn
    },
    user () {
      return this.$store.state.user
    },
    drawer () {
      return this.$store.state.drawer
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('setDrawer', !this.drawer)
    },
    async signIn () {
      await this.$store.dispatch('signIn')
      this.$router.push('/home')
    },
    signOut () {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/')
      })
    },
    toMyPage () {
      this.$router.push(`/user/${this.user.id}`)
    }
  }
}
</script>
