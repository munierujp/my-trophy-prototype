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
        <v-toolbar-title>{{ $t('EDIT') }}</v-toolbar-title>
        <v-spacer />
        <app-icon-button
          :icon="icons.save"
          @click="save"
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
    }
  },
  data () {
    return {
      icons,
      trophy: {
        title: this.title,
        description: this.description
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
    }
  },
  methods: {
    close () {
      this.show = false
    },
    async save () {
      await this.api.updateTrophy(this.id, this.trophy)
      this.$emit('update', this.trophy)
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
