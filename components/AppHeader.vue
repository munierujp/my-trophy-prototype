<template>
  <v-app-bar
    class="app-header"
    app
    color="primary"
    dark
  >
    <v-btn
      icon
      to="/"
    >
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ $t('APP_NAME') }}
    </v-toolbar-title>
    <template v-if="isSignedIn">
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
        </v-list>
      </v-menu>
    </template>
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
    }
  },
  methods: {
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
