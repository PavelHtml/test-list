<template>
  <v-container>
    <v-list three-line>
      <template v-for="(item, index) in posts">
        <v-row class="align-center mb-5 hover" :key="item.id">
          <v-col  sm="8" md="9" @click.prevent="editPost(index)">
            <div class="id">{{item.id}}</div>
            <h3>
              <div
                v-show="updatePostIndex === index"
                ><v-text-field
                :ref="`name${index}`"
                :value="item.name"
                @input="updatePostName"></v-text-field>
              </div>
              <div v-show="updatePostIndex !== index">{{item.name}}</div>
            </h3>
          </v-col>
          <v-col sm="4" md="3" class="d-flex flex-row">
            <v-btn
              class="ma-2"
              color="red"
              @click.prevent="deletePost(index)"
              dark
            >
              Удалить
              <v-icon
                dark
                right
              >
                mdi-cancel
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import debounce from 'lodash.debounce'

export default {
  name: 'PostsList',
  computed: {
    ...mapGetters({
      posts: 'getPosts'
    })
  },
  data () {
    return {
      updatePostIndex: null
    }
  },
  methods: {
    ...mapMutations({
      deletePost: 'deletePost',
      editPostName: 'editPostName'
    }),
    ...mapActions({
      getTestData: 'getTestData'
    }),
    updatePostName: debounce(function (e) {
      const newPost = {
        index: this.updatePostIndex,
        name: e
      }
      this.editPostName(newPost)
    }, 1000),
    editPost (index) {
      const nameField = this.$refs[`name${index}`][0]
      this.updatePostIndex = index
      nameField.focus()
    }
  },
  mounted () {
    this.getTestData()
  }
}
</script>

<style scoped>
  .hover:hover {
    cursor: pointer;
    background: #eee;
  }
</style>
