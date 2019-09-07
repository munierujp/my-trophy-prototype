<template>
  <v-layout
    column
    align-center
  >
    <v-flex>
      <app-tag
        :label="trophy.user.name"
        :icon="icons.user"
        color="secondary"
        :to="`/user/${trophy.user.id}`"
      />
    </v-flex>
    <v-flex class="app-trophy">
      <app-trophy-card
        :id="trophy.id"
        :title="trophy.title"
        :description="trophy.description"
        :writable="writable"
        width="640px"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import icons from '~/modules/icons'
import AppTag from '~/components/elements/AppTag'
import AppTrophyCard from '~/components/AppTrophyCard'

export default {
  components: {
    AppTag,
    AppTrophyCard
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
    const user = await api.fetchUserById(trophy.user_id)
    trophy.user = user
    return {
      trophy
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
