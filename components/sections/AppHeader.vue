<template>
  <v-app-bar
    class="app-header"
    app
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click.stop="onClickNavIcon" />
    <v-toolbar-title>
      {{ $t('APP_NAME') }}
    </v-toolbar-title>
    <template v-if="isSignedIn">
      <v-spacer />
      <app-icon-button
        :icon="icons.add"
        @click="onClickAddIcon"
      />
      <app-trophy-create-dialog v-model="showCreateDialog" />
      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>{{ icons.menu }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <app-list-item
            :title="user.name"
            :subtitle="user.email"
            @click="onClickUserMenu"
          />
          <v-divider />
          <app-list-item
            :title="$t('LOG_OUT')"
            @click="onClickLogOutMenu"
          />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script>
import icons from '~/modules/icons'
import AppIconButton from '~/components/elements/AppIconButton'
import AppListItem from '~/components/elements/AppListItem'
import AppTrophyCreateDialog from '~/components/items/AppTrophyCreateDialog'

export default {
  components: {
    AppIconButton,
    AppListItem,
    AppTrophyCreateDialog
  },
  data: () => ({
    icons,
    showCreateDialog: false
  }),
  computed: {
    isSignedIn () {
      return this.$store.getters.isSignedIn
    },
    auth () {
      return this.$store.state.auth
    },
    user () {
      return this.auth.user
    }
  },
  methods: {
    onClickNavIcon () {
      this.toggleDrawer()
    },
    onClickAddIcon () {
      this.openCreateDialog()
    },
    onClickUserMenu () {
      this.toMyPage()
    },
    onClickLogOutMenu () {
      this.signOut()
    },
    toggleDrawer () {
      this.$store.commit('toggleDrawer')
    },
    async signOut () {
      await this.$store.dispatch('signOut')
      this.$router.push('/')
    },
    toMyPage () {
      this.$router.push(`/user/${this.user.id}`)
    },
    openCreateDialog () {
      this.showCreateDialog = true
    }
  }
}
</script>
