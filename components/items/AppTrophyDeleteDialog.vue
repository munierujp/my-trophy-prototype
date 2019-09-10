<template>
  <v-dialog
    v-model="show"
    width="320px"
  >
    <v-card>
      <v-card-title>
        {{ $t('DELETE_DIALOG_TITLE') }}
      </v-card-title>
      <v-card-text>
        {{ $t('DELETE_DIALOG_MESSAGE') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <app-text-button
          :label="$t('CANCEL')"
          @click="onClickCancelButton"
        />
        <app-text-button
          :label="$t('DELETE')"
          color="red"
          @click="onClickDeleteButton"
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
    },
    id: {
      type: Number,
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
    },
    api () {
      return this.$store.state.api
    }
  },
  methods: {
    onClickCancelButton () {
      this.close()
    },
    async onClickDeleteButton () {
      await this.deleteTrophy()
      this.close()
      this.$router.push('/home')
    },
    close () {
      this.show = false
    },
    async deleteTrophy () {
      await this.api.deleteTrophy(this.id)
    }
  }
}
</script>
