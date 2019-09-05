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
        :to="`/edit/${id}`">
        <v-icon>mdi-square-edit-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="deleteTrophy"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
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
  methods: {
    deleteTrophy () {
      // TODO: write code
    }
  }
}
</script>
