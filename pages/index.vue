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
  </v-layout>
</template>

<script>
import AppDescription from '~/components/AppDescription'
import AppTitle from '~/components/AppTitle'

export default {
  layout: 'noheader',
  components: {
    AppDescription,
    AppTitle
  }
}
</script>
