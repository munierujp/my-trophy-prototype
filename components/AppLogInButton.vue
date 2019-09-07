<template>
  <div>
    <app-button
      :label="$t('START')"
      color="secondary"
      dark
      @click="openDialog"
    />
    <app-log-in-dialog v-model="showDialog" />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'
import AppLogInDialog from '~/components/AppLogInDialog'

export default {
  components: {
    AppButton,
    AppLogInDialog
  },
  data: () => ({
    showDialog: false
  }),
  computed: {
    isSignedIn () {
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    openDialog () {
      if (this.isSignedIn) {
        this.$router.push('/home')
      } else {
        this.showDialog = true
      }
    }
  }
}
</script>
