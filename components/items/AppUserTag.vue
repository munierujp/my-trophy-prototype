<template>
  <app-tag
    :label="name"
    :icon="icons.user"
    color="secondary"
    :to="to"
  />
</template>

<script>
import icons from '~/modules/icons'
import AppTag from '~/components/elements/AppTag'

export default {
  components: {
    AppTag
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    link: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons
  }),
  computed: {
    to () {
      return this.link ? `/user/${this.id}` : ''
    }
  }
}
</script>
