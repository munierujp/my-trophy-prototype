<template>
  <v-app id="app">
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
import AppHeader from '~/components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, "Noto Sans JP", sans-serif;
}
</style>
