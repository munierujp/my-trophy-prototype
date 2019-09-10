<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
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
              <app-text-form
                v-model="currentValues.title"
                :label="$t('TITLE')"
                :max-length="titleMaxLength"
                required
                autofocus
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="app-col">
              <app-textarea
                v-model="currentValues.description"
                :label="$t('BODY')"
                :max-length="descriptionMaxLength"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="app-col">
              <app-date-form
                v-model="currentValues.achievedOn"
                :label="$t('ACHIEVED_DATE')"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { DateTime } from 'luxon'
import icons from '~/modules/icons'
import findNewestById from '~/modules/findNewestById'
import { trophy } from '~/modules/models'
import AppDateForm from '~/components/elements/AppDateForm'
import AppIconButton from '~/components/elements/AppIconButton'
import AppTextForm from '~/components/elements/AppTextForm'
import AppTextarea from '~/components/elements/AppTextarea'

export default {
  components: {
    AppDateForm,
    AppIconButton,
    AppTextForm,
    AppTextarea
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
      currentValues: createDefaultValues(),
      titleMaxLength: trophy.title.max,
      descriptionMaxLength: trophy.description.max
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
