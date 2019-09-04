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
  components: {
    AppTrophies
  },
  async asyncData ({ store, params }) {
    const { api } = store.state
    const user = await api.fetchUserById(params.id)
    if (!user) {
      throw new Error('User not found')
    }
    const trophies = await api.fetchTrophiesByUserId(user.id).then(sortByIdDesc)
    return {
      trophies
    }
  }
}
</script>
