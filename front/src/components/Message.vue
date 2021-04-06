<template>

    <div>

        <b-list-group-item  tag="article" class="bg-light align-items-center">

            <div class="d-flex justify-content-end">
                <time class="">{{ message.date }}</time>
            </div>

            <div class="d-flex align-items-center">
                <div class="d-flex-column w-25">
                    <b-avatar :src="message.avatar"></b-avatar>
                    <p>{{ message.username }}</p>
                </div>

                <div class="d-flex-column w-75">
                    <router-link class="text-dark" :to="{ name: 'MessageDetails', params: { id: message.id }}">
                        <p v-if="message.content && !message.attachment">{{ message.content }}</p>
                        <p v-else-if="!message.content && message.attachment">
                            <img :src="message.attachment" :alt="message.attachment" width="100" />
                        </p>
                        <div v-else>
                            <img :src="message.attachment" :alt="message.attachment" width="100" />
                            <p>{{ message.content }}</p>
                        </div>
                    </router-link>
                </div>
            </div>
            
        </b-list-group-item>
        
        <div class="d-flex justify-content-end mb-3">
            <span class="small mr-1">commentaires {{ message.comments }}</span>
            <span class="small mr-1" @click="like(message.id, '1')">like {{ message.likes }}</span>
            <span class="small mr-1" @click="like(message.id, '-1')">dislike {{ message.dislikes }}</span>
            <span v-if="auth" class="small mr-1" @click="trash(message.id)">supprimer</span>
        </div>

    </div>

</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex';

export default {
    name: "Messages",
    props: ['message', 'userId', 'isAdmin'],
    computed: {
        ...mapState(['token']),

         auth () {
            if(this.message.userId == this.userId) {
                return true
            }
            return this.isAdmin
        }
    },

    methods: {

        ...mapActions(['getMessages']),

        like(id, value) {
            axios.post('http://localhost:3000/api/messages/' + id + '/like', { value: value },
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => this.getMessages())
            .catch(error => console.log(error));
        },

        trash(id) {
            axios.delete('http://localhost:3000/api/messages/' + id,
            {
                headers: { "Authorization" : `Bearer ${ this.token }` }
            })
            .then(() => this.getMessages())
            .catch(error => console.log(error));
        }
    }
}
</script>