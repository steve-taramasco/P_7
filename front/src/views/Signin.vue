<template>
    <form @submit.prevent="signin">
      <input type="email" v-model.trim="email" placeholder="email" required/>
      <input type="text" v-model.trim="password" placeholder="password" required/>
      <input type="text" v-model.trim="username" placeholder="username" required/>
      <button type="submit">s'inscrire</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signin',

  data () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },

   methods: {
     
    signin() {
      axios.post('http://localhost:3000/api/users/signup', {
        email: this.email,
        password: this.password,
        username: this.username
      })
      .then((res) => console.log(res.data.user))
      .catch(error => console.log(error));   
    }
  }
}
</script>

<style>

</style>