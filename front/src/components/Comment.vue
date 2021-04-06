<template>
    <div class="comment mb-3">

        <b-list-group-item  tag="article" class="bg-light align-items-center">
            <div class="d-flex justify-content-end">
                <time class="">{{ comment.date }}</time>
            </div>

            <div class="d-flex align-items-center">
                <div class="d-flex-column w-25">
                    <b-avatar :src="comment.avatar"></b-avatar>
                    <p>{{ comment.username }}</p>
                </div>
                <div class="d-flex-column w-75">
                    <p>{{ comment.content }}</p>
                </div>
            </div>
        </b-list-group-item>
                
        <span v-if="auth" class="small mr-1" @click="trash(comment.id)">supprimer</span>
        
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
  name: "Comment",
  props: ['comment', 'messageId', 'userId', 'isAdmin'],

  computed: {
    ...mapState(['token']),

    auth () {
      if(this.comment.userId == this.userId) {
          return true
      }
      return this.isAdmin
    }
  },
  methods: {
    ...mapActions(['getMessage']),

    trash(id) {
      axios.delete('http://localhost:3000/api/messages/'+ this.messageId +'/comment/'+ id,
      {
          headers: { "Authorization" : `Bearer ${ this.token }` }
      })
      .then(() => this.getMessage(this.messageId))
      .catch(error => console.log(error));
    }
  }
}
</script>