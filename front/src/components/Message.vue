<template>

    <b-list-group-item tag="article" class="bg-light rounded border mb-5">

        <div class="d-flex mb-3">                
            <b-avatar class="mr-2" size="3rem" :src="message.avatar"></b-avatar>

            <div class="text-left">
                <span class="m-0 font-weight-bold">{{ message.username }}</span><br>
                <time class="small">{{ message.date }}</time>
            </div>
        </div>

        <div class="d-flex-column text-sm-left">
            <p v-if="message.content && !message.attachment">{{ message.content }}</p>
            <p v-else-if="!message.content && message.attachment">
                <img :src="message.attachment" :alt="message.attachment" width="100" />
            </p>
            <div v-else>
                <img :src="message.attachment" :alt="message.attachment" width="100" />
                <p>{{ message.content }}</p>
            </div>
        </div>
        
        <div class="d-flex align-items-center justify-content-between border-top pt-1">
            <div>
                <b-icon-hand-thumbs-up tabindex="0" class="like small mr-1" @click="like(message.id, '1')" aria-label="j'aime"></b-icon-hand-thumbs-up>
                <span>{{ message.likes }}</span>
                
                <b-icon-hand-thumbs-down tabindex="0" class="like small mr-1 ml-3" @click="like(message.id, '-1')" aria-label="j'aime pas"></b-icon-hand-thumbs-down>
                <span>{{ message.dislikes }}</span>

                <b-icon-chat-square class="small mr-1 ml-3"></b-icon-chat-square>
                <span>{{ message.comments }}</span>
            </div>

            <div>
                <router-link class="text-dark" :to="{ name: 'MessageDetails', params: { id: message.id }}" aria-label="repondre">
                    <b-icon-reply font-scale="1.2"></b-icon-reply>
                </router-link>

                <b-icon-trash tabindex="0" class="ml-3" v-if="auth" @click="trash(message.id)" aria-label="supprimer"></b-icon-trash>
            </div>
        </div>
        
    </b-list-group-item>

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

<style lang="scss" scoped>
.like {
    cursor: pointer;
}
</style>