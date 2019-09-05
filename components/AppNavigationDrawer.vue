<template>
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list>
      <app-list-item
        :title="$t('HOME')"
        icon="mdi-home"
        @click="toHome"
      />
      <app-list-item
        :title="$t('TWITTER')"
        icon="mdi-twitter"
        @click="openTwitter"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AppListItem from '~/components/AppListItem'

const { TWITTER_ID } = process.env.config

export default {
  components: {
    AppListItem
  },
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
    toHome () {
      this.$router.push(`/home`)
    },
    openTwitter () {
      window.open(`https://twitter.com/${TWITTER_ID}`, '_blank')
    }
  }
}
</script>
