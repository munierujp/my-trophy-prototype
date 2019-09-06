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
      <app-trophy-delete-dialog
        :id="id"
        v-model="showDeleteDialog"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import icons from '~/modules/icons'
import AppIconButton from '~/components/AppIconButton'
import AppTrophyDeleteDialog from '~/components/AppTrophyDeleteDialog'

export default {
  components: {
    AppIconButton,
    AppTrophyDeleteDialog
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
    }
  }
}
</script>
