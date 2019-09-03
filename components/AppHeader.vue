<template>
  <v-app-bar
    class="app-header"
    app
    color="primary"
    dark
  >
    <v-toolbar-title>
      {{ $t('APP_NAME') }}
    </v-toolbar-title>
    <template v-if="auth">
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
          <v-list-item @click="signOut">
            <v-list-item-title>{{ $t('LOG_OUT') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
