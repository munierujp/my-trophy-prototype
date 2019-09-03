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
      <app-button
        :label="$t('START')"
        color="secondary"
        dark
        to="/login"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import AppButton from '~/components/AppButton'
import AppDescription from '~/components/AppDescription'
import AppTitle from '~/components/AppTitle'

export default {
  layout: 'noheader',
  components: {
    AppButton,
    AppDescription,
    AppTitle
  }
}
</script>
