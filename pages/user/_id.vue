<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-user-tag
        :id="user.id"
        :name="user.name"
      />
    </v-flex>
    <v-flex>
      <app-trophy-list :trophies="trophies" />
    </v-flex>
  </v-layout>
</template>

<script>
import icons from '~/modules/icons'
import sortByAchievedDateDesc from '~/modules/sortByAchievedDateDesc'
import AppTrophyList from '~/components/items/AppTrophyList'
import AppUserTag from '~/components/items/AppUserTag'

export default {
  components: {
    AppTrophyList,
    AppUserTag
  },
  data: () => ({
    icons
  }),
  async asyncData ({ store, params }) {
    const { api } = store.state
    const user = await api.fetchUserById(params.id)
    if (!user) {
      throw new Error('User not found')
    }
    const trophies = await api.fetchTrophiesByUserId(user.id).then(sortByAchievedDateDesc)
    return {
      user,
      trophies
    }
  }
}
</script>
