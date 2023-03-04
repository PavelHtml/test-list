<template>
  <v-app>
     <v-main>
      <search-post/>
       <add-post/>
      <posts-list/>
    </v-main>
  </v-app>
</template>

<script>
import PostsList from './components/PostsList.vue'
import SearchPost from '@/components/SearchPost.vue'
import AddPost from '@/components/AddPost.vue'

export default {
  name: 'App',

  components: {
    AddPost,
    SearchPost,
    PostsList
  },

  data: () => ({
    //
  })
}
</script>
