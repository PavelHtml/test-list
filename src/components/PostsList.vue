<template>
  <v-container>
    <v-list three-line>
      <template v-for="(item, index) in posts">
        <v-row class="align-center mb-5 hover" :key="item.id">
          <v-col  sm="8" md="9">
            <div>{{item.id}}</div>
            <h3>
              <div
                v-if="post.index === index"
                ><v-text-field v-model="post.name"></v-text-field>
              </div>
              <div v-else>{{item.name}}</div>
            </h3>
          </v-col>
          <v-col sm="4" md="3">
            <div v-if="post.index !== index">
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
              <v-btn
                class="ma-2"
                color="blue"
                @click.prevent="editPost(index, item.name)"
                dark
              >
                Редактировать
                <v-icon
                  dark
                  right
                >
                  mdi-pen
                </v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                class="ma-2"
                color="red"
                @click.prevent="cencelEdit()"
                dark
              >
                Отмена
                <v-icon
                  dark
                  right
                >
                  mdi-cancel
                </v-icon>
              </v-btn>
              <v-btn
                class="ma-2"
                color="green"
                @click.prevent="savePost(post)"
                dark
              >
                Сохронить
                <v-icon
                  dark
                  right
                >
                  mdi-content-save-check-outline
                </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'PostsList',
  computed: {
    ...mapGetters({
      posts: 'getPosts'
    })
  },
  data () {
    return {
      post: {
        index: null,
        name: null
      },
      postsCount: 10
    }
  },
  methods: {
    ...mapMutations({
      deletePost: 'deletePost',
      editPostName: 'editPostName',
      addPostsOnScroll: 'addPostsOnScroll'
    }),
    ...mapActions({
      getTestData: 'getTestData'
    }),
    cencelEdit () {
      this.post.name = null
      this.post.index = null
    },
    savePost (post) {
      this.editPostName(post)
      this.cencelEdit()
    },
    editPost (index, name) {
      this.post.name = name
      this.post.index = index
    },
    handleScroll (event) {
      const windowHeight = document.body.scrollHeight - 100
      const scrollTop = Math.ceil(window.scrollY + window.innerHeight)
      if (windowHeight < scrollTop) {
        this.addPostsOnScroll(this.postsCount)
        this.postsCount += 10
      }
    }
  },
  mounted () {
    this.getTestData()
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
  .hover:hover {
    cursor: pointer;
    background: #eee;
  }
</style>
