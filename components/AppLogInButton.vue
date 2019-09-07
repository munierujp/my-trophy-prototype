<template>
  <div>
    <app-button
      :label="$t('START')"
      color="secondary"
      dark
      @click="open"
    />
    <v-dialog
      v-model="showDialog"
      width="320px"
    >
      <v-card>
        <v-card-title>
          {{ $t('LOG_IN_DIALOG_TITLE') }}
        </v-card-title>
        <v-card-text>
          {{ $t('LOG_IN_DIALOG_MESSAGE') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <app-dialog-button
            :label="$t('LOG_IN')"
            @click="signIn"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppButton from '~/components/AppButton'
import AppDialogButton from '~/components/AppDialogButton'

export default {
  components: {
    AppButton,
    AppDialogButton
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
    open () {
      if (this.isSignedIn) {
        this.$router.push('/home')
      } else {
        this.showDialog = true
      }
    },
    close () {
      this.showDialog = false
    },
    async signIn () {
      await this.$store.dispatch('signIn')
      this.close()
      this.$router.push('/home')
    }
  }
}
</script>
