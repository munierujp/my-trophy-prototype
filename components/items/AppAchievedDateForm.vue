<template>
  <app-date-form
    v-model="achievedDate"
    :label="$t('ACHIEVED_DATE')"
    required
    :autofocus="autofocus"
  />
</template>

<script>
import AppDateForm from '~/components/elements/AppDateForm'

export default {
  components: {
    AppDateForm
  },
  props: {
    value: {
      type: String,
      required: true
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    achievedDate: {
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
