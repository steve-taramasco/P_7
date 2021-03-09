<template>
  <div class="signup">
    <h2 class="title">Inscription :</h2>
      <form>
        <input type="email" v-model="email" placeholder="email"/>
        <input type="password" v-model="password" placeholder="password"/>
        <input type="text" v-model="username" placeholder="username"/>
        <button type="button" @click="signin">inscription</button>
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
     username: null
    }
  },
  methods: {

    ...mapActions(['storeUser']),

    signin() {
      axios.post('http://localhost:3000/api/users/signup', {
        email: this.email,
        password: this.password,
        username: this.username
      })
      .then((res) => this.storeUser(res.data.user))
      .catch(error => console.log(error));   
    }
  }
}

</script>

<style lang="scss" scoped>
.signup {
    margin-top: 8em;
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
      &:focus {
        outline: none;
        box-shadow: 0px 0px 5px darkgrey;
      }
    }
  }
}
</style>