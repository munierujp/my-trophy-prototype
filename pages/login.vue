<template>
  <v-row
    align="center"
    justify="center"
  >
    <app-button
      :label="$t('LOG_IN_WITH_GOOGLE')"
      color="#4285f4"
      dark
      @click="signInByGoogle"
    />
  </v-row>
</template>

<script>
import AppButton from '~/components/AppButton'

export default {
  middleware: 'requireUnauthenticated',
  components: {
    AppButton
  },
  methods: {
    signInByGoogle () {
      this.$store.dispatch('signInByGoogle').then(() => {
        this.$router.push('/home')
      })
    }
  }
}
</script>
