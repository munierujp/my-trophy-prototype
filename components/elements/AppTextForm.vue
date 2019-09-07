<template>
  <v-text-field
    v-model="computedValue"
    :label="label"
    :maxlength="maxLength"
    :counter="maxLength"
    :required="required"
    :autofocus="autofocus"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
