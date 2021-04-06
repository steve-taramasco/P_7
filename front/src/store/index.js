import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    user: {},
    file: null,
    messages: null,
    message: null,
    token: JSON.parse(sessionStorage.getItem('user_token')) || null,
    isAdmin: false,
    error: null
  },
  mutations: {

    UPDATE_EMAIL(state, email) {
      state.user.email = email
    },

    UPDATE_USERNAME(state, username) {
      state.user.username = username
    },

    UPDATE_BIO(state, bio) {
      state.user.bio = bio
    },

    UPDATE_AVATAR(state, file) {
    state.user.avatar = URL.createObjectURL(file);
    },

    STORE_USER(state, user) {
      state.user = user;
      user.token && sessionStorage.setItem("user_token", JSON.stringify(user.token));
      state.token = JSON.parse(sessionStorage.getItem('user_token'));
      state.isAdmin = user.isAdmin;
    },

    STORE_MESSAGES(state, messages) {
      state.messages = messages;
    },

    STORE_MESSAGE(state, message) {
      state.message = message;
    },

    STORE_ERROR(state, error) {
      state.error = error;
    },

    CLEAR_USER(state) {
      state.user = {};
    }

  },
  actions: {

    clearUser(context) {
      context.commit('CLEAR_USER')
    },

    getUser(context) {
      axios.get('http://localhost:3000/api/users/me',
      {
        headers: { "Authorization" : `Bearer ${ context.state.token }` }
      })
      .then((res) => context.commit('STORE_USER', res.data.user))
      .catch(error => console.log(error))  
    },

    getMessages(context) {
      axios.get('http://localhost:3000/api/messages',
      {
        headers: { "Authorization" : `Bearer ${ context.state.token }` }
      })
      .then((res) => context.commit('STORE_MESSAGES', res.data.messages))
      .catch(error => console.log(error))  
    },

    getMessage(context, payload) {
      axios.get('http://localhost:3000/api/messages/' + payload,
      {
        headers: { "Authorization" : `Bearer ${ context.state.token }` }
      })
      .then((res) => context.commit('STORE_MESSAGE', res.data.message))
      .catch(error => console.log(error))  
    }

  },
  modules: {}
})
