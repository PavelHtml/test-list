<template>
  <v-container>
    <v-text-field
      value=""
      append-icon="mdi-magnify"
      label="Поиск"
      single-line
      hide-details
      @input="debounceSearch"
    ></v-text-field>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  name: 'SearchPost',
  methods: {
    ...mapMutations({
      searchPostForName: 'searchPost'
    }),
    debounceSearch: debounce(function (e) {
      this.searchPostForName(e)
    }, 1000)
  }
}
</script>
