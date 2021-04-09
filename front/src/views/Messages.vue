<template>
  <main>

    <h1 class="border-bottom bg-white h4 mb-4 p-2 sticky-top">Fil d’actualité</h1>

    <section class="message container" v-if="messages">

        <message
        v-for="list in lists"
        :key="list.id"
        :message="list"
        :userId="user.id"
        :isAdmin="isAdmin"
        ></message>

        <b-pagination class="justify-content-center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        ></b-pagination>
        
    </section>

    <div v-else>
      <loading></loading>
    </div>

    <section class="fixed-bottom pt-2 bg-white border-top">
      <messageForm ></messageForm>
    </section>
      
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loading from '../components/Loading.vue'
import Message from '../components/Message'
import MessageForm from '../components/MessageForm'

export default {
  name: "Messages",
  components: {
    Message,
    MessageForm,
    Loading
  },
  computed: {
    ...mapState(['messages', 'user', 'isAdmin']),

    lists () {
      return this.messages.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage)
    },

    rows() {
      return this.messages.length
    }
  },

  data() {
    return {
      perPage: 5,
      currentPage: 1
    }
  },
  
  methods: {
    ...mapActions(['getMessages', 'getUser'])
  },

  mounted() {
    this.getMessages();
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