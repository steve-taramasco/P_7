import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  
  state: {
    user: null,
    messages: null
  },
  mutations: {
    STORE_USER(state, user) {
      state.user = user
    },

    STORE_POSTS(state, messages) {
      state.messages = messages
    }
  },
  actions: {

    storeUser(context, user) {
      context.commit('STORE_USER', user)
    },

    getPosts(context) {
      axios.get('http://localhost:3000/api/messages/',
      {
        headers: { "Authorization" : `Bearer ${ context.state.user.token }` }
      })
      .then(res => {
        console.log(res),
        context.commit('STORE_POSTS', res.data.messages)
      })
      .catch(error => console.error({ error }));
    }

  },
  modules: {
  }
})
