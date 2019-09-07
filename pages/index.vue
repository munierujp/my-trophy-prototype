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
        @click="openLogInDialog"
      />
      <app-log-in-dialog v-model="showLogInDialog" />
    </v-flex>
  </v-layout>
</template>

<script>
import AppButton from '~/components/AppButton'
import AppDescription from '~/components/AppDescription'
import AppLogInDialog from '~/components/AppLogInDialog'
import AppTitle from '~/components/AppTitle'

export default {
  layout: 'noheader',
  components: {
    AppButton,
    AppDescription,
    AppLogInDialog,
    AppTitle
  },
  data: () => ({
    showLogInDialog: false
  }),
  computed: {
    isSignedIn () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    openLogInDialog () {
      if (this.isSignedIn) {
        this.$router.push('/home')
      } else {
        this.showLogInDialog = true
      }
    }
  }
}
</script>
