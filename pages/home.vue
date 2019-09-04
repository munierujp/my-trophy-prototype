<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-trophies :trophies="trophies" />
    </v-flex>
  </v-layout>
</template>

<script>
import sortByIdDesc from '~/modules/sortByIdDesc'
import AppTrophies from '~/components/AppTrophies'

export default {
  middleware: 'requireAuthenticated',
  components: {
    AppTrophies
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
