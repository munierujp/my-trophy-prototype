<template>
  <v-app dark>
    <h1>{{ message }}</h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    message () {
      switch (this.error.statusCode) {
        case 404:
          return this.$t('ERROR_MESSAGE_404')
        default:
          return this.$t('ERROR_MESSAGE_UNKNOWN')
      }
    }
  }
}
</script>
