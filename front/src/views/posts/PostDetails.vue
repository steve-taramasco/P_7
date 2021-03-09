<template>

    <div class="content" v-if="post">

        <div class="posts">
            <div class="user">
                <img class="icon" src="../../assets/user.png" alt="icon">
                <p v-if="post.username">@ {{ post.username }}</p>
                <p v-else>@ inconnu</p>
            </div>

            <div class="post">
                <p>{{ post.message }}</p>
            </div>

            <div class="time">
                <p>{{ post.created }}</p>
            </div>
        </div>
        
        <div class="comments" v-for="comment in comments" :key= comment>
            <div class="user">
                <img class="icon" src="../../assets/user.png" alt="icon">
                <p>@ {{ comment.username }}</p>
            </div>

            <div class="comment">
                <p>{{ comment.message }}</p>
            </div>

            <div class="time">
                <p>{{ comment.created }}</p>
            </div>
        </div>

        <form>
            <input type="text" v-model="message" placeholder="commentaire...">
            <button type="button" @click="send(id)">Envoyer</button>
        </form> 
    </div>

    <div v-else>
        <p>loading...</p>
        <form>
            <input type="text" v-model="message" placeholder="commentaire...">
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
            post: null,
            comments: [],
            message: null
        }
    },
     mounted () {
        this.getPost(this.id);
    },
    props: ['id'],

    computed: {
        ...mapState(['user'])
    },

    methods: {

        getPost(id) {
            axios.get('http://localhost:3000/api/posts/' + id, {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(results => {
                this.post = results.data.post;
                this.comments = results.data.post.comments;
            })
            .catch(error => console.log(error))
        },

        send(id) {
            axios.post('http://localhost:3000/api/posts/'+ id +'/comment',
            {
                comment: this.message,
            },
            {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(() => {
                this.message = null;
                this.getPost(id);
            })
            .catch(error => console.log(error));  
        }
    }
}

</script>

<style lang="scss" scoped>

.content {
    margin: 8em 0 5em 0;
    .posts {
        display: flex;
        margin: 1em 0;
        padding: 1em;
        .user {
            flex: 1;
            p {
                margin: 0;
            }
        }
        .post {
            flex: 2;
            background-color: lightgrey;
            border-radius: 10px;
            cursor: pointer;
            p:nth-child(1) {
                font-weight: bold;
            }
        }
    }
    .comments {
        display: flex;
        padding: 1em;
        .user {
            flex: 1;
            p {
                margin: 0;
            }
        }
        .comment {
            flex: 2;
            background-color: whitesmoke;
            border-radius: 10px;
            cursor: pointer;
            p:nth-child(1) {
                font-weight: bold;
            }
        }
        
    }

    form {
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
    .time {
        flex: 1;
    }
    .icon {
        width: 2em;
    }
}

</style>

