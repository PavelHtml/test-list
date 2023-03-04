<template>
  <v-container>
    <v-row class="align-center mb-5">
      <v-col sm="8" md="9" v-if="openNewPost">
        <div class="id">
          <v-text-field
            v-model="post.id"
            placeholder="Введите id"></v-text-field>
        </div>
        <div><v-text-field
          v-model="post.name"
          placeholder="Введите имя"></v-text-field>
        </div>
      </v-col>
      <v-col sm="4" md="3" class="d-flex flex-row">
        <div v-if="openNewPost">
          <v-btn
            class="ma-2"
            color="green"
            @click.prevent="addNewPost(post)"
            dark
          >
            Добавить
            <v-icon
              dark
              right
            >
              mdi-plus
            </v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            color="red"
            @click.prevent="removePost()"
            dark
          >
            Отменить
            <v-icon
              dark
              right
            >
              mdi-cancel
            </v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            class="ma-2"
            color="green"
            @click.prevent="openPost()"
            dark
          >
            <v-icon
              dark
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'AddPost',
  data () {
    return {
      openNewPost: false,
      post: {
        id: null,
        name: null
      }
    }
  },
  methods: {
    ...mapMutations({
      addPost: 'addPost'
    }),
    openPost () {
      this.openNewPost = true
    },
    defaultPost () {
      this.post = {
        id: null,
        name: null
      }
    },
    addNewPost (post) {
      this.addPost(post)
      this.defaultPost()
    },
    removePost () {
      this.openNewPost = false
      this.defaultPost()
    }
  }
}
</script>
