<template>
  <v-btn
    class="app-text-button"
    text
    :color="color"
    @click="onClick"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-text-button {
  text-transform: none;
}
</style>
