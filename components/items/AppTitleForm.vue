<template>
  <app-text-form
    v-model="title"
    :label="$t('TITLE')"
    :max-length="maxLength"
    required
    :autofocus="autofocus"
  />
</template>

<script>
import { trophy } from '~/modules/models'
import AppTextForm from '~/components/elements/AppTextForm'

export default {
  components: {
    AppTextForm
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
  data: () => ({
    maxLength: trophy.title.max
  }),
  computed: {
    title: {
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
