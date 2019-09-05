<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-tag
        :label="user.name"
        icon="mdi-account-circle"
        color="secondary"
      />
    </v-flex>
    <v-flex>
      <app-trophy-list :trophies="trophies" />
    </v-flex>
  </v-layout>
</template>

<script>
import sortByIdDesc from '~/modules/sortByIdDesc'
import AppTag from '~/components/AppTag'
import AppTrophyList from '~/components/AppTrophyList'

export default {
  components: {
    AppTag,
    AppTrophyList
  },
  async asyncData ({ store, params }) {
    const { api } = store.state
    const user = await api.fetchUserById(params.id)
    if (!user) {
      throw new Error('User not found')
    }
    const trophies = await api.fetchTrophiesByUserId(user.id).then(sortByIdDesc)
    return {
      user,
      trophies
    }
  }
}
</script>
