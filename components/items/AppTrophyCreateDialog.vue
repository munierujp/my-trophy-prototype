<template>
  <app-fullscreen-dialog v-model="show">
    <v-card>
      <v-toolbar
        color="primary"
        dark
      >
        <app-icon-button
          :icon="icons.close"
          @click="onClickCloseButton"
        />
        <v-toolbar-title>{{ $t('CREATE_NEW_TROPHY') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          :icon="icons.send"
          @click="onClickSendButton"
        />
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col class="app-col">
              <app-title-form
                v-model="currentValues.title"
                autofocus
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="app-col">
              <app-description-form v-model="currentValues.description" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="app-col">
              <app-achieved-date-form v-model="currentValues.achievedOn" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </app-fullscreen-dialog>
</template>

<script>
import { DateTime } from 'luxon'
import icons from '~/modules/icons'
import findNewestById from '~/modules/findNewestById'
import AppAchievedDateForm from '~/components/items/AppAchievedDateForm'
import AppDescriptionForm from '~/components/items/AppDescriptionForm'
import AppFullscreenDialog from '~/components/elements/AppFullscreenDialog'
import AppIconButton from '~/components/elements/AppIconButton'
import AppTitleForm from '~/components/items/AppTitleForm'

export default {
  components: {
    AppAchievedDateForm,
    AppDescriptionForm,
    AppFullscreenDialog,
    AppIconButton,
    AppTitleForm
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      icons,
      currentValues: createDefaultValues()
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    api () {
      return this.$store.state.api
    },
    auth () {
      return this.$store.state.auth
    },
    user () {
      return this.auth.user
    },
    request () {
      return {
        title: this.currentValues.title,
        description: this.currentValues.description,
        achieved_on: this.currentValues.achievedOn
      }
    }
  },
  methods: {
    onClickCloseButton () {
      this.close()
      this.resetCurrentValues()
    },
    async onClickSendButton () {
      const trophy = await this.create()
      this.close()
      this.resetCurrentValues()
      this.toTrophyPage(trophy.id)
    },
    close () {
      this.show = false
    },
    resetCurrentValues () {
      this.currentValues = createDefaultValues()
    },
    async create () {
      await this.api.createTrophy(this.request)
      const trophy = await this.api.fetchTrophiesByUserId(this.user.id).then(findNewestById)
      return trophy
    },
    toTrophyPage (id) {
      this.$router.push(`/trophy/${id}`)
    }
  }
}

function createDefaultValues () {
  return {
    title: '',
    description: '',
    achievedOn: DateTime.local().toISODate()
  }
}
</script>

<style lang="scss" scoped>
.app-col {
  max-width: 600px;
}
</style>
