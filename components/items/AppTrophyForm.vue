<template>
  <v-container>
    <v-row justify="center">
      <v-col class="app-col">
        <app-title-form
          v-model="computedValue.title"
          autofocus
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="app-col">
        <app-description-form v-model="computedValue.description" />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="app-col">
        <app-achieved-date-form v-model="computedValue.achievedOn" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AppAchievedDateForm from '~/components/items/AppAchievedDateForm'
import AppDescriptionForm from '~/components/items/AppDescriptionForm'
import AppTitleForm from '~/components/items/AppTitleForm'

export default {
  components: {
    AppAchievedDateForm,
    AppDescriptionForm,
    AppTitleForm
  },
  props: {
    value: {
      type: Object,
      validator: value => ['title', 'description', 'achievedOn'].every(key => value.hasOwnProperty(key)),
      required: true
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-col {
  max-width: 600px;
}
</style>
