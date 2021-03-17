<template>

    <div class="content" v-if="message">

        <div class="messages">

            <div class="user">
                <p>@ {{ message.username }}</p>
            </div>

            <div class="message">
                <p>{{ message.content }}</p>
            </div>

            <div class="time">
                <p>{{ message.date }}</p>
            </div>

        </div>
        
        <div class="comments" v-for="comment in comments" :key= comment>

            <div class="user">
                <p>@ {{ comment.username }}</p>
            </div>

            <div class="comment">
                <p>{{ comment.content }}</p>
            </div>

            <div class="time">
                <p>{{ comment.date }}</p>
            </div>

        </div>

        <form>
            <input type="text" v-model="comment" placeholder="commentaire...">
            <button type="button" @click="send(id)">Envoyer</button>
        </form> 
    </div>

    <div v-else>
        <p>loading...</p>
        <form>
            <input type="text" v-model="comment" placeholder="commentaire...">
            <button type="button" @click="send(id)">Envoyer</button>
        </form> 
    </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex';

export default {
    data () {
        return {
            message: null,
            comments: [],
            comment: null
        }
    },
    
    props: {
        id: Number
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {

        getPost(id) {
            axios.get('http://localhost:3000/api/messages/' + id, {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(results => {
                console.log(results);
                this.message = results.data.message;
                this.comments = results.data.message.comments;
            })
            .catch(error => console.log(error))
        },

        send(id) {
            axios.post('http://localhost:3000/api/messages/' + id + '/comment',
            {
                content: this.comment,
            },
            {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(() => {
                this.comment = null;
                this.getPost(id);
            })
            .catch(error => console.log(error));  
        }
    },

    mounted () {
        this.getPost(this.id);
    },
}
</script>