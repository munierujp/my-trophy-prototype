<template>
  <v-card
    :width="width"
    max-width="100%"
  >
    <v-card-title primary-title>
      {{ title }}
    </v-card-title>
    <v-card-text v-if="description">
      {{ description }}
    </v-card-text>
    <v-card-actions v-if="writable">
      <v-spacer />
      <v-btn
        icon
        :to="`/edit/${id}`"
      >
        <v-icon>{{ icons.edit }}</v-icon>
      </v-btn>
      <app-icon-button
        :icon="icons.delete"
        @click="openDeleteDialog"
      />
      <v-dialog
        v-model="showDeleteDialog"
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
            <app-dialog-button
              :label="$t('CANCEL')"
              @click="closeDeleteDialog"
            />
            <app-dialog-button
              :label="$t('DELETE')"
              color="red"
              @click="deleteTrophy"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import icons from '~/modules/icons'
import AppDialogButton from '~/components/AppDialogButton'
import AppIconButton from '~/components/AppIconButton'

export default {
  components: {
    AppDialogButton,
    AppIconButton
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      required: true
    },
    writable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons,
    showDeleteDialog: false
  }),
  computed: {
    api () {
      return this.$store.state.api
    }
  },
  methods: {
    openDeleteDialog () {
      this.showDeleteDialog = true
    },
    closeDeleteDialog () {
      this.showDeleteDialog = false
    },
    async deleteTrophy () {
      await this.api.deleteTrophy(this.id)
      this.closeDeleteDialog()
      this.$router.push('/home')
    }
  }
}
</script>
