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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import AppListItem from '~/components/AppListItem'

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
    }
  }
}
</script>
