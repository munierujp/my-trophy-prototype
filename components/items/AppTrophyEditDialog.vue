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
          <v-row justify="center">
            <v-col class="app-col">
              <app-date-form
                v-model="trophy.achievedOn"
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
    return {
      icons,
      trophy: {
        title: this.title,
        description: this.description,
        achievedOn: this.achievedOn
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
        title: this.trophy.title,
        description: this.trophy.description,
        achieved_on: this.trophy.achievedOn
      }
    }
  },
  methods: {
    onClickCloseButton () {
      this.close()
    },
    async onClickSaveButton () {
      await this.update()
      this.$emit('update', this.trophy)
    },
    close () {
      this.show = false
    },
    async update () {
      await this.api.updateTrophy(this.id, this.request)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-col {
  max-width: 600px;
}
</style>
