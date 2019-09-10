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
        @click="onClickStartButton"
      />
      <app-log-in-dialog v-model="showLogInDialog" />
    </v-flex>
  </v-layout>
</template>

<script>
import AppButton from '~/components/elements/AppButton'
import AppDescription from '~/components/items/AppDescription'
import AppLogInDialog from '~/components/items/AppLogInDialog'
import AppTitle from '~/components/items/AppTitle'

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
    onClickStartButton () {
      if (this.isSignedIn) {
        this.toHomePage()
      } else {
        this.showLogInDialog = true
      }
    },
    toHomePage () {
      this.$router.push('/home')
    }
  }
}
</script>
