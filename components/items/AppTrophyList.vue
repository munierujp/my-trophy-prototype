<template>
  <v-layout
    justify-space-around
    wrap
  >
    <v-flex
      v-for="trophy in trophies"
      :key="trophy.id"
      class="app-trophy"
    >
      <app-trophy-list-item
        :to="`/trophy/${trophy.id}`"
        :title="trophy.title"
        :width="width"
      />
    </v-flex>
    <!-- dummy components for layout (align left) -->
    <v-flex
      v-for="i in trophies.length"
      :key="`dummy-${i}`"
      class="app-trophy app-trophy-dummy"
    >
      <div />
    </v-flex>
    <!-- /dummy components for layout (align left) -->
  </v-layout>
</template>

<script>
import AppTrophyListItem from '~/components/items/AppTrophyListItem'

export default {
  components: {
    AppTrophyListItem
  },
  props: {
    trophies: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      width: '480px'
    }
  }
}
</script>

<style lang="scss" scoped>
$trophy-card-width: 480px;

.app-trophy {
  flex-grow: 0;
}

.app-trophy-dummy {
  height: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: $trophy-card-width;
  }
}
</style>
