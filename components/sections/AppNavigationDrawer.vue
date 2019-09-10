<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <app-list-item
        :title="$t('HOME')"
        :icon="icons.home"
        @click="onClickHomeButton"
      />
      <app-list-item
        :title="$t('TWITTER')"
        :icon="icons.twitter"
        @click="onClickTwitterButton"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import icons from '~/modules/icons'
import AppListItem from '~/components/elements/AppListItem'

const { TWITTER_ID } = process.env.config

export default {
  components: {
    AppListItem
  },
  data: () => ({
    icons
  }),
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (drawer) {
        this.$store.commit('setDrawer', drawer)
      }
    }
  },
  methods: {
    onClickHomeButton () {
      this.toHome()
    },
    onClickTwitterButton () {
      this.openTwitter()
    },
    toHome () {
      this.$router.push(`/home`)
    },
    openTwitter () {
      window.open(`https://twitter.com/${TWITTER_ID}`, '_blank')
    }
  }
}
</script>
