<template>
  <v-app id="app">
    <app-navigation-drawer />
    <app-header />
    <v-content>
      <v-container
        fluid
        grid-list-xl
      >
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from '~/components/sections/AppHeader'
import AppNavigationDrawer from '~/components/sections/AppNavigationDrawer'

export default {
  components: {
    AppHeader,
    AppNavigationDrawer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, "Noto Sans JP", sans-serif;
}
</style>
