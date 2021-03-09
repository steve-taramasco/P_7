<template>

  <div class="content" v-if="posts">

    <div class="posts" v-for="post in posts" :key="post">

      <div class="user">
        <img class="icon" src="../../assets/user.png" alt="icon">
        <p v-if="post.username">@ {{ post.username }}</p>
        <p v-else>@ inconnu</p>
      </div>

      <div class="post">
        <div class="bulle">

          <router-link :to="{ name: 'PostDetails', params: { id: post.id }}">
            <p>{{ post.message }}</p>
          </router-link>

          <p>
            <span class="comments">
              <img class="icon" src="../../assets/chat.png" alt="icon">
            </span> {{ post.comments }}

            <span class="like" @click="like(post.id, 1)">
              <img class="icon" src="../../assets/like.png" alt="icon">
            </span> {{ post.likes }}

            <span class="dislike" @click="like(post.id, -1)">
              <img class="icon" src="../../assets/dislike.png" alt="icon">
            </span> {{ post.dislikes }}

            <span class="trash" @click="trashPost(post.id)">
              <img class="icon" src="../../assets/remove.png" alt="icon">
            </span>
          </p>
        </div>
      </div>

      <div class="time">
        <p>{{ post.created }}</p>
      </div>
    </div>

    <form>
        <!-- <label for="file" class="label-file"></label> -->
        <input id="file" class="input-file" type="file" @change="onFileChange">
        <input type="text" v-model="message" placeholder="message...">

        <button type="button" @click="sendPost">Envoyer</button>
    </form> 

  </div>

  <div class="loading" v-else>
    <p>loading...</p>
    <form>
      <input type="text" v-model="message" placeholder="message...">
      <button type="button" @click="sendPost(message)">Envoyer</button>
    </form> 
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      message: null,
      file: null
    }
  },

  computed: {
    ...mapState(['user', 'posts'])
  },

  methods: {
    ...mapActions(['getPosts']),

    onFileChange(e) {
      let files = e.target.files;
      if (!files.length) return;
      this.file = files[0];
    },

    sendPost() {
    const input = document.getElementById('file');
    const formData = new FormData();

    formData.append('image', this.file);
    formData.append('message', this.message);

    axios.post('http://localhost:3000/api/posts/', formData,
    {
      headers: { "Authorization" : `Bearer ${ this.user.token }` }
    })

    .then(() => {
      this.message = null,
      this.file = null,
      input.value = '',
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
    },

    like(id, value) {
      axios.post('http://localhost:3000/api/posts/' + id + '/like',
      {
        value: value
      },
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

// .label-file {
//     cursor: pointer;
// }
// .label-file:hover {
//     color: #25a5c4;
// }

// .input-file {
//     display: none;
// }

.content {
  margin: 8em 0 5em 0;
  .posts {
    display: flex;
    margin: 1em 0;
    .user {
      flex: 1;
      margin: 5px;
      p {
          margin: 0;
        }
      .icon {
      width: 2em;
      }
    }
    .post {
      flex: 2;
      .bulle {
        background-color: whitesmoke;
        box-shadow: 0px 0px 5px 0px darkgray;
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
        .icon {
          width: 1em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5f5;
    padding: 1em;
    border-top: solid 2px lightgrey;
    position: fixed;
    bottom: 0;
    left: 0;
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
}

</style>