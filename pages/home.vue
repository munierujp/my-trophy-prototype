<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-trophy-list :trophies="trophies" />
    </v-flex>
  </v-layout>
</template>

<script>
import sortByIdDesc from '~/modules/sortByIdDesc'
import AppTrophyList from '~/components/AppTrophyList'

export default {
  middleware: 'requireAuthenticated',
  components: {
    AppTrophyList
  },
  async asyncData ({ store, params }) {
    const { api, user } = store.state
    const trophies = await api.fetchTrophiesByUserId(user.id).then(sortByIdDesc)
    return {
      trophies
    }
  }
}
</script>
