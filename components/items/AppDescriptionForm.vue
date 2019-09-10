<template>
  <app-textarea
    v-model="description"
    :label="$t('BODY')"
    :max-length="maxLength"
    :autofocus="autofocus"
  />
</template>

<script>
import { trophy } from '~/modules/models'
import AppTextarea from '~/components/elements/AppTextarea'

export default {
  components: {
    AppTextarea
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
    maxLength: trophy.description.max
  }),
  computed: {
    description: {
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
