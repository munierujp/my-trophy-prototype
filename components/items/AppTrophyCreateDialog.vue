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
          @click="close"
        />
        <v-toolbar-title>{{ $t('CREATE_NEW_TROPHY') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          :icon="icons.send"
          @click="send"
        />
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col class="app-col">
              <app-text-form
                v-model="trophy.title"
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
                v-model="trophy.description"
                :label="$t('BODY')"
                :max-length="descriptionMaxLength"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import icons from '~/modules/icons'
import findNewestById from '~/modules/findNewestById'
import { trophy } from '~/modules/models'
import AppIconButton from '~/components/elements/AppIconButton'
import AppTextForm from '~/components/elements/AppTextForm'
import AppTextarea from '~/components/elements/AppTextarea'

export default {
  components: {
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
      trophy: {
        title: '',
        description: ''
      },
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
    }
  },
  methods: {
    close () {
      this.show = false
    },
    async send () {
      await this.api.createTrophy(this.trophy)
      const trophy = await this.api.fetchTrophiesByUserId(this.user.id).then(findNewestById)
      this.$emit('create', trophy)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-col {
  max-width: 600px;
}
</style>
