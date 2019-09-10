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
import sortByAchievedDateDesc from '~/modules/sortByAchievedDateDesc'
import AppTrophyList from '~/components/items/AppTrophyList'

export default {
  middleware: 'requireAuthenticated',
  components: {
    AppTrophyList
  },
  async asyncData ({ store }) {
    const { api, auth } = store.state
    const trophies = await api.fetchTrophiesByUserId(auth.user.id).then(sortByAchievedDateDesc)
    return {
      trophies
    }
  }
}
</script>
