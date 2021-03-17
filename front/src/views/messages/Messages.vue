<template>
    <div class="content" v-if="messages">

        <div class="messages" v-for="elt in messages" :key="elt">

            <div class="user">
                <p>@ {{ elt.username }}</p>
            </div>

            <div class="message">
                <router-link :to="{ name: 'Message', params: { id: elt.id }}">
                    <p v-if="!elt.attachment">{{ elt.content }}</p>
                    <p v-else-if="!elt.content">
                        <img :src="elt.attachment" :alt="elt.attachment" width="100" />
                    </p>
                    <p v-else>{{ elt.content }}
                        <img :src="elt.attachment" :alt="elt.attachment" width="100" />
                    </p>

                </router-link>
            </div>

            <div class="time">
                <p>{{ elt.date }}</p>
            </div>

        </div>
                <!-- <p>
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
                </p> -->
                <!-- </div>
            </div>-->

             <form>
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
    name: 'Messages',
    data () {
        return {
            message: null,
            file: null
        }
    },
    computed: {
        ...mapState(['user', 'messages'])
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
            formData.append('content', this.message);

            axios.post('http://localhost:3000/api/messages/new', formData,
            {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(() => { this.message = null, this.file = null, input.value = '', this.getPosts() })
            .catch(error => console.log(error));   
        },
    
        trashPost(id) {
            axios.delete('http://localhost:3000/api/messages/' + id,
            {
                headers: { "Authorization" : `Bearer ${ this.user.token }` }
            })
            .then(() => this.getPosts())
            .catch(error => console.log(error));
        },

        like(id, value) {
            axios.post('http://localhost:3000/api/messages/' + id + '/like',
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
    .messages {
        display: flex;
        justify-content: center;
    }

</style>