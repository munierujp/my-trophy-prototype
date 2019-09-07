<template>
  <v-btn
    icon
    @click="click"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
