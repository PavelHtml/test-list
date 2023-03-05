import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPosts: null,
    searchPosts: null,
    posts: null,
    postStep: 10
  },
  getters: {
    getPosts: state => state.posts
  },
  mutations: {
    postsMutations (state, payload) {
      state.allPosts = payload
      state.searchPosts = state.allPosts
      state.posts = []
      this.commit('addPostsOnScroll', 0)
    },
    addPostsOnScroll (state, index) {
      if (index < state.searchPosts.length) {
        const max = state.searchPosts.length
        for (let i = index, j = max < state.postStep ? max : state.postStep; i < j; i++) {
          state.posts.push(state.searchPosts[i])
        }
      }
    },
    addPost (state, post) {
      state.allPosts.unshift(post)
      state.searchPosts = state.allPosts
      state.posts = []
      this.commit('addPostsOnScroll', 0)
    },
    deletePost (state, index) {
      state.posts.splice(index, 1)
    },
    editPostName (state, item) {
      state.posts[item.index].name = item.name
    },
    searchPost (state, text) {
      state.posts = []
      state.searchPosts = state.allPosts.filter(post => {
        const postName = post.name.toLowerCase()
        return postName.search(text.toLowerCase()) !== -1
      })
      this.commit('addPostsOnScroll', 0)
    }
  },
  actions: {
    getTestData: async ({ commit }) => {
      const response = await fetch('/test.json')
      const dataJson = await response.json()
      commit('postsMutations', dataJson.posts)
    }
  },
  modules: {
    // я могу использовать моду но не стал так как приложение очень маленькое
  }
})
