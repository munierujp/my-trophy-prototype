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
        <v-toolbar-title>{{ $t('EDIT') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          :icon="icons.save"
          @click="onClickSaveButton"
        />
      </v-toolbar>
      <v-card-text>
        <app-trophy-form v-model="currentValues" />
      </v-card-text>
    </v-card>
  </app-fullscreen-dialog>
</template>

<script>
import icons from '~/modules/icons'
import AppFullscreenDialog from '~/components/elements/AppFullscreenDialog'
import AppIconButton from '~/components/elements/AppIconButton'
import AppTrophyForm from '~/components/items/AppTrophyForm'

export default {
  components: {
    AppFullscreenDialog,
    AppIconButton,
    AppTrophyForm
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    achievedOn: {
      type: String,
      required: true
    }
  },
  data () {
    const { title, description, achievedOn } = this
    return {
      icons,
      initialValues: {
        title,
        description,
        achievedOn
      },
      currentValues: {
        title,
        description,
        achievedOn
      }
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
    async onClickSaveButton () {
      const trophy = await this.update()
      this.emitUpdateEvents(trophy)
      this.close()
      this.updateInitialValues(trophy)
      this.resetCurrentValues()
    },
    close () {
      this.show = false
    },
    resetCurrentValues () {
      this.currentValues.title = this.initialValues.title
      this.currentValues.description = this.initialValues.description
      this.currentValues.achievedOn = this.initialValues.achievedOn
    },
    async update () {
      await this.api.updateTrophy(this.id, this.request)
      const trophy = await this.api.fetchTrophyById(this.id)
      return trophy
    },
    emitUpdateEvents ({ title, description, achievedOn }) {
      this.$emit('update:title', title)
      this.$emit('update:description', description)
      this.$emit('update:achievedOn', achievedOn)
    },
    updateInitialValues ({ title, description, achievedOn }) {
      this.initialValues = {
        title,
        description,
        achievedOn
      }
    }
  }
}
</script>
