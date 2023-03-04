import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPosts: null,
    searchPosts: null,
    search: false,
    posts: null
  },
  getters: {
    getPosts: state => state.posts
  },
  mutations: {
    postsMutations (state, payload) {
      state.allPosts = payload
      state.searchPosts = payload
      state.posts = []
      for (let i = 0, j = 10; i < j; i++) {
        state.posts.push(state.searchPosts[i])
      }
    },
    addPostsOnScroll (state, index) {
      if (index < state.searchPosts.length) {
        for (let i = index, j = index + 10; i < j; i++) {
          state.posts.push(state.searchPosts[i])
        }
      }
    },
    addPost (state, post) {
      state.posts.unshift(post)
    },
    deletePost (state, index) {
      state.posts.splice(index, 1)
    },
    editPostName (state, item) {
      state.posts[item.index].name = item.name
      console.log(state.posts[item.index].name)
    },
    searchPost (state, text) {
      state.search = true
      state.posts = []
      state.searchPosts = state.allPosts.filter(post => {
        const postName = post.name.toLowerCase()
        return postName.search(text.toLowerCase()) !== -1
      })
      if (state.searchPosts.length) {
        for (let i = 0, j = 10; i < j; i++) {
          state.posts.push(state.searchPosts[i])
        }
      }
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
