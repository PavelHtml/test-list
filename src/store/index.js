import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allPosts: null,
    posts: null
  },
  getters: {
    getPosts: state => state.posts
  },
  mutations: {
    postsMutations (state, payload) {
      state.allPosts = payload
      state.posts = payload
    },
    addPost (state, post) {
      state.posts.unshift(post)
    },
    deletePost (state, index) {
      state.posts.splice(index, 1)
    },
    editPostName (state, item) {
      state.posts[item.index].name = item.name
    },
    searchPost (state, text) {
      state.posts = state.allPosts.filter(post => {
        const postName = post.name.toLowerCase()
        return postName.search(text.toLowerCase()) !== -1
      })
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
