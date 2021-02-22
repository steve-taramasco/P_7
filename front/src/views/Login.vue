<template>
  <div class="signin">
    <h2 class="title">Connection :</h2>

    <form >
      <input type="email" v-model="email" placeholder="email"/>
      <input type="password" v-model="password" placeholder="password"/>
      <div>
        <label for="remember">Rester connecté</label>
        <input type="checkbox" id="remember"/>
        <button type="button" @click="login">connection</button>
      </div>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {

  data () {
    return {
      email: null,
      password: null,
    }
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

<style lang="scss" scoped>

h2 {
  font-weight: normal;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    margin: .5em;
    padding: .3em 1em;
        width: 15em;
        border-radius: 4px;
        border: 1px solid darkgray;
        &#remember {
            width: auto;
            vertical-align: middle;
        }
        &:focus {
            outline: none;
            box-shadow: 0px 0px 5px darkgrey;
        }
  }
}
</style>