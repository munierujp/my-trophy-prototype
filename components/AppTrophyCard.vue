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
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="openDeleteDialog"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
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
import AppDialogButton from '~/components/AppDialogButton'

export default {
  components: {
    AppDialogButton
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
