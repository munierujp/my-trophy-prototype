<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-title />
    </v-flex>
    <v-flex>
      <app-description />
    </v-flex>
    <v-flex>
      <app-log-in-button />
    </v-flex>
  </v-layout>
</template>

<script>
import AppDescription from '~/components/AppDescription'
import AppLogInButton from '~/components/AppLogInButton'
import AppTitle from '~/components/AppTitle'

export default {
  layout: 'noheader',
  components: {
    AppDescription,
    AppLogInButton,
    AppTitle
  }
}
</script>
