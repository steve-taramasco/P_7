<template>

  <div class="content" v-if="posts">
    <div class="posts" v-for="post in posts" :key="post">

      <div class="user">
        <p v-if="post.user">@ {{ post.user.username }}</p>
        <p v-else>@ inconnu</p>
      </div>

      <div class="post">
        <div class="bulle">
          <router-link :to="{ name: 'PostDetails', params: { id: post.id }}">
            <p>{{ post.message }}</p>
          </router-link>
          <p>
            <span class="comments">{{ post.comments.length }}</span> commentaires 
            <span class="trash" @click="trashPost(post.id)">suppr.</span>
          </p>
        </div>
      </div>

      <div class="time">
        <p>{{ post.createdAt }}</p>
      </div>
      
    </div>
    <form>
        <input type="text" v-model="message" placeholder="message...">
        <button type="button" @click="sendPost(message)">Envoyer</button>
    </form> 
  </div>

  <div class="loading" v-else>
    <p>loading...</p>
     <form>
        <input type="text" v-model="message" placeholder="message...">
        <button type="button" @click="send">Envoyer</button>
    </form> 
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      message: null
    }
  },

  computed: {
    ...mapState(['user', 'posts'])
  },

  methods: {
    ...mapActions(['getPosts']),

    sendPost(message) {
    axios.post('http://localhost:3000/api/posts/',
    {
      data: {
        message: message,
        userId: this.user.id
      }
    },
    {
      headers: { "Authorization" : `Bearer ${ this.user.token }` }
    })
    .then(() => { 
      this.message = null,
      this.getPosts()
    })
    .catch(error => console.log(error));   
    },
    
    trashPost(id) {
    axios.delete('http://localhost:3000/api/posts/' + id,
    {
        headers: { "Authorization" : `Bearer ${ this.user.token }` }
    })
    .then(() => this.getPosts())
    .catch(error => console.log(error));
    }
  },
  
  mounted () {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 5em;
}

.posts {
  display: flex;
  margin: 3em 0;
  .user {
    flex: 1;
    margin: 5px;
    p {
        margin: 0;
      }
    .icon {
      width: 3em;
      height: 3em;
    }
  }
  .post {
    flex: 3;
    .bulle {
      background-color: whitesmoke;
      border-radius: 10px;
      margin: 5px;
      padding: .4em;
      p:nth-child(1) {
        font-weight: bold;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      &:hover {
        margin: 5px;
        box-shadow: 0px 0px 10px 1px darkgrey;
      }
    }
  }
  .time {
    flex: 1;
  }
}

form {
  padding: 1em;
  border-top: solid 2px lightgrey;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  width: -webkit-fill-available;
  input {
      margin-right: 2em;
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

</style>