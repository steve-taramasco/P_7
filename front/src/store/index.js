import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({

  state: {
    user: null,
    posts: null
  },

  getters: {},

  mutations: {
    STORE_USER(state, user) {
      state.user = user
    },

    STORE_POSTS(state, posts) {
      state.posts = posts
    }
  },

  actions: {
    storeUser(context, user) {
      context.commit('STORE_USER', user)
    },

    getPosts(context) {
      axios.get('http://localhost:3000/api/posts/',
      {
        headers: { "Authorization" : `Bearer ${ context.state.user.token }` }
      })
      .then(res => context.commit('STORE_POSTS', res.data.posts))
      .catch(error => console.error({ error }));
    }
  },

  modules: {}
})
