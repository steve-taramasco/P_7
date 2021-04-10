<template>
     <b-form class="container d-flex flex-wrap justify-content-center">

        <label class="sr-only" for="message">message</label>

        <b-form-input
        id="message"
        type="text"
        v-model.trim="comment"
        placeholder="Aa"
        class="col-12 col-sm-9 mr-sm-2 mb-2"
        ></b-form-input>

        <b-button class="h-100 col-sm-2" variant="primary" @click="send">Envoyer</b-button>

    </b-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
    name: "CommentForm",
    props: ['messageId'],
    data () {
        return {
            comment: null,
        }
    },

    computed: {
        ...mapState(['token'])
    },

    methods: {
        ...mapActions(['getMessage']),

        send() {
            axios.post('http://localhost:3000/api/messages/' + this.messageId + '/comment',
            {
                content: this.comment
            },
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => { this.comment = null, this.getMessage(this.messageId)})
            .catch(error => console.log(error));   
        }
    }
}
</script>