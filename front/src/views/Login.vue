<template>
  <div v-if="user">
    <p>Content de vous revoir {{ user.username }}</p>
  </div>

  <div v-else>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="email" required/>
      <input type="text" v-model="password" placeholder="password" required/>
      <button type="submit">s'identifier</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Login',

  data () {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    ...mapState(['user', 'messages']),
  },

  methods: {
    ...mapActions(['storeUser']),

    login() {
      axios.post('http://localhost:3000/api/users/login', {
        email: this.email,
        password: this.password
      })
      .then((res) => { this.storeUser(res.data.user)})
      .catch(error => console.log(error));   
    }
  }
}
</script>

<style>

</style>