<template>
  <v-btn
    class="app-dialog-button"
    text
    :color="color"
    @click="click"
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
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-dialog-button {
  text-transform: none;
}
</style>
