<template>
  <v-card
    :to="path"
    width="320px"
    max-width="100%"
  >
    <v-card-title primary-title>
      {{ title }}
    </v-card-title>
    <v-card-text v-if="description">
      {{ description }}
    </v-card-text>
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
    }
  },
  computed: {
    path () {
      return `/trophy/${this.id}`
    }
  }
}
</script>
