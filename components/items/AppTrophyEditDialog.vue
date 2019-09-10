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
        <v-toolbar-title>{{ $t('EDIT') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          :icon="icons.save"
          @click="onClickSaveButton"
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
import icons from '~/modules/icons'
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
      this.$emit('update:title', trophy.title)
      this.$emit('update:description', trophy.description)
      this.$emit('update:achievedOn', trophy.achievedOn)
      this.close()
      this.updateInitialValues(trophy)
      this.resetCurrentValues()
    },
    close () {
      this.show = false
    },
    updateInitialValues ({ title, description, achievedOn }) {
      this.initialValues = {
        title,
        description,
        achievedOn
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.app-col {
  max-width: 600px;
}
</style>
