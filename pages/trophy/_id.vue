<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-user-tag
        :id="trophy.user.id"
        :name="trophy.user.name"
        link
      />
    </v-flex>
    <v-flex>
      <app-trophy-card
        :id="trophy.id"
        :title="trophy.title"
        :description="trophy.description"
        :achieved-on="trophy.achievedOn"
        :writable="writable"
        width="640px"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import icons from '~/modules/icons'
import AppTrophyCard from '~/components/items/AppTrophyCard'
import AppUserTag from '~/components/items/AppUserTag'

export default {
  components: {
    AppTrophyCard,
    AppUserTag
  },
  data: () => ({
    icons
  }),
  computed: {
    isSignedIn () {
      return this.$store.getters.isSignedIn
    },
    auth () {
      return this.$store.state.auth
    },
    writable () {
      return this.isSignedIn && this.trophy.user.id === this.auth.user.id
    }
  },
  async asyncData ({ store, params }) {
    const { api } = store.state
    const trophy = await api.fetchTrophyById(params.id)
    if (!trophy) {
      throw new Error('Trophy not found')
    }
    const user = await api.fetchUserById(trophy.userId)
    trophy.user = user
    return {
      trophy
    }
  }
}
</script>
