<template>
    <div  tag="article" class="d-flex p-4">
        <div>
            <b-avatar class="mr-3" size="3rem" :src="comment.avatar"></b-avatar>
        </div>

        <div class="text-left">
            <div class="bg-light rounded border p-2">
                <span class="font-weight-bold">{{ comment.username }}</span>
                <p class="mb-0">{{ comment.content }}</p>
            </div>
            <div class="mt-1">
                <span class="small">{{ comment.date }}</span>
                <b-button type="button" class="border-0 btn-light btn-sm bg-transparent" v-if="auth" @click="trash(comment.id)" aria-label="supprimer">
                    <b-icon-trash></b-icon-trash>
                </b-button>
            </div>
        </div>
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