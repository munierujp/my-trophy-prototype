<template>
  <v-card
    :width="width"
    max-width="100%"
  >
    <v-card-title primary-title>
      {{ trophy.title }}
    </v-card-title>
    <v-card-text v-if="trophy.description">
      {{ trophy.description }}
    </v-card-text>
    <v-card-actions v-if="writable">
      <v-spacer />
      <app-icon-button
        :icon="icons.edit"
        @click="openEditDialog"
      />
      <app-trophy-edit-dialog
        :id="id"
        v-model="showEditDialog"
        :title="trophy.title"
        :description="trophy.description"
        @update="updateTrophy"
      />
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
import AppTrophyEditDialog from '~/components/AppTrophyEditDialog'

export default {
  components: {
    AppIconButton,
    AppTrophyDeleteDialog,
    AppTrophyEditDialog
  },
  props: {
    writable: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data () {
    return {
      icons,
      trophy: {
        title: this.title,
        description: this.description
      },
      showEditDialog: false,
      showDeleteDialog: false
    }
  },
  methods: {
    openEditDialog () {
      this.showEditDialog = true
    },
    openDeleteDialog () {
      this.showDeleteDialog = true
    },
    updateTrophy (trophy) {
      this.trophy = trophy
    }
  }
}
</script>
