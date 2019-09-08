<template>
  <v-card
    :to="to"
    :width="width"
    max-width="100%"
  >
    <v-card-title primary-title>
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
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
