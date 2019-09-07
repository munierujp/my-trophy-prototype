<template>
  <v-dialog
    v-model="show"
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
</template>

<script>
import AppDialogButton from '~/components/elements/AppDialogButton'

export default {
  components: {
    AppDialogButton
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    close () {
      this.show = false
    },
    async signIn () {
      await this.$store.dispatch('signIn')
      this.close()
      this.$router.push('/home')
    }
  }
}
</script>
