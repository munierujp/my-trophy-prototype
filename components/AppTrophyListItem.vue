<template>
  <v-card
    :to="to"
    :width="width"
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
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
