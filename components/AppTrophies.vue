<template>
  <v-layout
    justify-space-around
    wrap
    class="app-trophies"
  >
    <v-flex
      v-for="trophy in trophies"
      :key="trophy.id"
      class="app-trophy"
    >
      <app-trophy-card
        :to="`/trophy/${trophy.id}`"
        :id="trophy.id"
        :title="trophy.title"
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
import AppTrophyCard from '~/components/AppTrophyCard'

export default {
  components: {
    AppTrophyCard
  },
  props: {
    trophies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
$trophy-card-width: 320px;

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
