<template>
  <main role="main" class="container">

    <section role="region" class="message" v-if="message">
      <message-details
      :message="message"
      ></message-details>

      <comment
      v-for="comment of comments"
      :key="comment.id"
      :comment="comment"
      :messageId="message.id"
      :userId="user.id"
      :isAdmin="isAdmin"
      ></comment>

      <b-pagination class="justify-content-center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      ></b-pagination>

    </section>

    <div v-else>
      <loading></loading>
    </div>

    <section role="region" class="form fixed-bottom p-2 bg-white border-top">
      <comment-form
      :messageId="id"
      ></comment-form>
    </section>

  </main>
</template>

<script>
import MessageDetails from '../components/MessageDetails'
import Comment from '../components/Comment'
import CommentForm from '../components/CommentForm'
import Loading from '../components/Loading'
import { mapActions, mapState } from 'vuex'

export default {
  name: "Message",
  props: ['id'],

  components: {
    MessageDetails,
    Comment,
    CommentForm,
    Loading
  },

  computed: {
    ...mapState(['message', 'user', 'isAdmin']),

    comments () {
      return this.message.comments.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    },

    rows() {
      return this.message.comments.length
    }
  },

  data() {
    return {
      perPage: 4,
      currentPage: 1
    }
  },

  methods: {
    ...mapActions(['getMessage', 'getUser'])
  },

  mounted() {
    this.getMessage(this.id);
    this.getUser();
  }
}
</script>

<style lang="scss" scoped>

.message {
  margin-bottom: 7rem;
  & a:hover {
    text-decoration: none;
  }
}

</style>