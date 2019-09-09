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
    <v-card-actions>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="grey--text">
            {{ trophy.achievedOn }}
          </v-list-item-title>
        </v-list-item-content>
        <v-row
          v-if="writable"
          align="center"
          justify="end"
        >
          <app-icon-button
            :icon="icons.edit"
            @click="onClickEditButton"
          />
          <app-trophy-edit-dialog
            :id="id"
            v-model="showEditDialog"
            :title="trophy.title"
            :description="trophy.description"
            :achieved-on="trophy.achievedOn"
            @update="onUpdateTrophy"
          />
          <app-icon-button
            :icon="icons.delete"
            @click="onClickDeleteButton"
          />
          <app-trophy-delete-dialog
            :id="id"
            v-model="showDeleteDialog"
          />
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import icons from '~/modules/icons'
import AppIconButton from '~/components/elements/AppIconButton'
import AppTrophyDeleteDialog from '~/components/items/AppTrophyDeleteDialog'
import AppTrophyEditDialog from '~/components/items/AppTrophyEditDialog'

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
    achievedOn: {
      type: String,
      required: true
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
        description: this.description,
        achievedOn: this.achievedOn
      },
      showEditDialog: false,
      showDeleteDialog: false
    }
  },
  methods: {
    onClickEditButton () {
      this.showEditDialog = true
    },
    closeEditDialog () {
      this.showEditDialog = false
    },
    onClickDeleteButton () {
      this.showDeleteDialog = true
    },
    onUpdateTrophy (trophy) {
      this.trophy = trophy
      this.closeEditDialog()
    }
  }
}
</script>
