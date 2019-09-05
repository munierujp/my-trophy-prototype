<template>
  <v-chip
    :color="color"
    :href="href"
    :to="to"
    :target="target"
    :link="isLink"
  >
    <v-avatar left>
      <v-icon>{{ icon }}</v-icon>
    </v-avatar>
    {{ label }}
  </v-chip>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  },
  computed: {
    isLink () {
      return this.to !== '' || this.href !== ''
    }
  }
}
</script>
