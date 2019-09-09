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
        <app-text-button
          :label="$t('LOG_IN')"
          @click="onClickLogInButton"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AppTextButton from '~/components/elements/AppTextButton'

export default {
  components: {
    AppTextButton
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
    async onClickLogInButton () {
      await this.$store.dispatch('signIn')
      this.show = false
      this.$router.push('/home')
    }
  }
}
</script>
